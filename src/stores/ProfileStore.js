import { observable, action, runInAction, decorate } from "mobx"
import { persist, create } from "mobx-persist"
import userServices from "../services/userService"
import jwtDecode from "jwt-decode"
import authStore from "./AuthStore"

class ProfileStore {
  isLoading = false
  isFailure = false
  profile = null
  error = null

  async getProfile(jwtToken) {
    const data = jwtDecode(jwtToken)
    const { userId } = data

    this.isLoading = true
    const resp = await userServices.getUserById(userId)
    if (resp.ok) {
      const userData = await resp.json()
      runInAction(() => {
        this.isLoading = false
        this.isFailure = false
        this.error = null
        this.setProfile(userData)
      })
    } else {
      const err = await resp.json()
      runInAction(() => {
        this.isFailure = true
        this.isLoading = false
        this.error = err
        this.setProfile(null)
      })
    }
  }

  async updateProfile(id, updatedData) {
    this.isLoading = true
    const resp = await userServices.updateUser(id, updatedData)

    if (resp.ok) {
      const data = await resp.json()
      runInAction(() => {
        this.isFailure = false
        this.isLoading = false
        this.error = null
        this.setProfile(data)
      })
    } else {
      const err = await resp.json()
      runInAction(() => {
        this.isFailure = true
        this.isLoading = false
        this.error = err.validationErrors
      })
    }
  }

  async deleteProfile(id) {
    this.isLoading = true
    const resp = await userServices.deleteUser(id)
    if (resp.ok) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = false
        this.error = null
        this.setProfile(null)
        authStore.setToken(null)
      })
    } else {
      const err = await resp.json()
      runInAction(() => {
        this.isFailure = true
        this.isLoading = false
        this.error = err.message
      })
    }
  }

  setProfile(data) {
    this.profile = data
  }
}

decorate(ProfileStore, {
  isLoading: observable,
  isFailure: observable,
  profile: [persist("object"), observable],
  error: observable,
  getProfile: action,
  updateProfile: action,
  deleteProfile: action,
})

const hydrate = create({})
const profileStore = new ProfileStore()
const profileHydrated = hydrate("profile", profileStore)

export default profileStore
