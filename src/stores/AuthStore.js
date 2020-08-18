/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import { observable, action, runInAction, decorate } from "mobx"
import { persist, create } from "mobx-persist"
import authService from "../services/authService"
import profileStore from "./ProfileStore"

class AuthStore {
  isLoading = false
  isFailure = false
  token = null
  error = null

  async register(regData) {
    this.isLoading = true
    const response = await authService.register(regData)
    if (response.ok) {
      await this.login(regData.email, regData.password)
    } else {
      const err = await response.json()
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.error = err.validationErrors
      })
    }
  }

  async login(email, pass) {
    this.isLoading = true
    const response = await authService.login(email, pass)

    if (response.ok) {
      const data = await response.json()
      runInAction(() => {
        this.isFailure = false
        this.isLoading = false
        this.error = null
        this.setToken(data.token)
        profileStore.getProfile(this.token)
      })
    } else {
      const err = await response.json()
      runInAction(() => {
        this.isFailure = true
        this.isLoading = false
        this.error = err.message
        this.setToken(null)
      })
    }
  }

  async logout() {
    await authService.logout()
    runInAction(() => {
      this.isFailure = false
      this.isLoading = false
      this.error = null
      this.setToken(null)
    })
  }

  setToken(token) {
    this.token = token
  }
}

decorate(AuthStore, {
  isLoading: observable,
  isFailure: observable,
  token: [persist, observable],
  error: observable,
  register: action,
  login: action,
  logout: action,
  setToken: action,
})

const hydrate = create({})
const authStore = new AuthStore()
const authHydrated = hydrate("auth", authStore)

export default authStore
