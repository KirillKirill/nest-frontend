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
        this.users = data.filter(user => user.role !== "admin")
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
        this.isLoading = false
        this.isFailure = true
        this.error = err.message
      })
    }
  }

  async updateUser(id, updatedData) {
    this.isLoading = true
    const resp = await userServices.updateUser(id, updatedData)

    if (resp.ok) {
      const data = await resp.json()
      runInAction(() => {
        this.isFailure = false
        this.isLoading = false
        this.error = null
        this.users = [...this.users, data]
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
}

decorate(UserStore, {
  isFailure: observable,
  isLoading: observable,
  error: observable,
  users: observable,
  getUsers: action,
  deleteUser: action,
  updateUser: action,
})

const userStore = new UserStore()
export default userStore
