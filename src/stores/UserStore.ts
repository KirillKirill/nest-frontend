import { observable, action, runInAction, decorate } from 'mobx';
import userServices from 'services/userService';

type UpdatedData = {
  [key: string]: string;
};

type User = {
  id: number;
  email: string;
  password: string;
  username: string;
  role: string;
};

class UserStore {
  isLoading = false;
  isFailure = false;
  users: User[] = [];
  error = null;

  async getUsers() {
    this.isLoading = true;
    const response = await userServices.getUsers();
    if (response.ok) {
      const data = await response.json();
      runInAction(() => {
        this.users = data;
        this.isLoading = false;
        this.isFailure = false;
        this.error = null;
      });
    } else {
      const err = await response.json();
      runInAction(() => {
        this.users = [];
        this.isLoading = false;
        this.isFailure = true;
        this.error = err.message;
      });
    }
  }

  async deleteUser(id: number) {
    const deletingUserIndex = this.users.findIndex(
      (user: { id: number }) => user.id === id,
    );

    this.isLoading = true;
    const response = await userServices.deleteUser(id);
    if (response.ok) {
      this.users.splice(deletingUserIndex, 1);
    } else {
      const err = await response.json();
      runInAction(() => {
        this.isLoading = false;
        this.isFailure = true;
        this.error = err.message;
      });
    }
  }

  async updateUser(id: number, updatedData: UpdatedData) {
    const updatingUserIndex = this.users.findIndex(
      (user: { id: number }) => user.id === id,
    );
    this.isLoading = true;
    const resp = await userServices.updateUser(id, updatedData);

    if (resp.ok) {
      const data: User = await resp.json();
      runInAction(() => {
        this.isFailure = false;
        this.isLoading = false;
        this.error = null;
        this.users.splice(updatingUserIndex, 1, data);
      });
    } else {
      const err = await resp.json();
      runInAction(() => {
        this.isFailure = true;
        this.isLoading = false;
        this.error = err.validationErrors;
      });
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
});

const userStore = new UserStore();
export default userStore;
