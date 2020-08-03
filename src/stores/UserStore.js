import { observable, action, runInAction, decorate } from "mobx"
import userServices from "../services/userService"

class UserStore {
  isLoading = false
  isFailure = false
  users = null
  error = null

  async getUsers() {
    this.isLoading = true
    const response = await userServices.getUsers()
    if (response.ok) {
      const data = await response.json()
      runInAction(() => {
        this.users = data
        this.isLoading = false
        this.isFailure = false
        this.error = null
      })
    } else {
      const err = await response.json()
      runInAction(() => {
        this.users = null
        this.isLoading = false
        this.isFailure = true
        this.error = err.message
      })
    }
  }

  async deleteUser(id) {
    this.isLoading = true
    const response = await userServices.deleteUser(id)
    if (response.ok) {
      await this.getUsers()
    } else {
      const err = await response.json()
      runInAction(() => {
        this.users = null
        this.isLoading = false
        this.isFailure = true
        this.error = err.message
      })
    }
  }
}

decorate(UserStore, {
  isFailure: observable,
  isLoading: observable,
  error: observable,
  users: observable,
  getUsers: action,
  deleteUser: action,
})

const userStore = new UserStore()
export default userStore
