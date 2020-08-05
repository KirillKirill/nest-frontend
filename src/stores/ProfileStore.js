import { observable, action, runInAction, decorate } from "mobx"
import { persist, create } from "mobx-persist"
import userServices from "../services/userService"
import jwtDecode from "jwt-decode"

class ProfileStore {
  isLoading = false
  isFailure = false
  profile = null
  error = null

  async getProfile() {
    const token = JSON.parse(localStorage.getItem("auth")).token
    const data = jwtDecode(token)
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

  async updateProfile(id, username, email) {
    this.isLoading = true
    const resp = await userServices.updateUser(id, username, email)

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
        this.error = err.message
        this.setProfile(null)
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
