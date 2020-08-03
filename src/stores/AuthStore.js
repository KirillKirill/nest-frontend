import { observable, action, runInAction, decorate } from "mobx"
import { persist, create } from "mobx-persist"
import authService from "../services/authService"

class AuthStore {
  isLoading = false
  isFailure = false
  user = null
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
        this.user = null
        this.token = null
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
        this.user = data
        this.error = null
        this.setAuthToken(data.token)
      })
    } else {
      const err = await response.json()
      runInAction(() => {
        this.isFailure = true
        this.isLoading = false
        this.user = null
        this.setAuthToken(null)
        this.error = err.message
      })
    }
  }

  async logout() {
    await authService.logout()
    runInAction(() => {
      this.isFailure = false
      this.isLoading = false
      this.setAuthToken(null)
      this.user = null
      this.error = null
    })
  }

  setAuthToken(token) {
    this.token = token
  }
}

decorate(AuthStore, {
  isLoading: observable,
  isFailure: observable,
  user: observable,
  token: [persist, observable],
  error: observable,
  register: action,
  login: action,
  logout: action,
  setAuthToken: action,
})

const hydrate = create({})
const authStore = new AuthStore()
const authHydrated = hydrate("auth", authStore)

export default authStore
