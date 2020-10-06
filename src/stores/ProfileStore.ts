/* eslint-disable no-unused-vars */
import { observable, action, decorate } from 'mobx';
import { persist, create } from 'mobx-persist';
import jwtDecode from 'jwt-decode';
import { history } from 'components/AppRouter/history';
import { Decoded, User, Error } from 'types';
import authStore from 'stores/AuthStore';
import userServices from 'services/userService';

type UpdatedData = {
  [key: string]: string;
};

class ProfileStore {
  isLoading = false;
  isFailure = false;
  profile: User | null = null;
  error: Error[] | null = null;

  async getProfile(jwtToken: string) {
    const data = jwtDecode<Decoded>(jwtToken);
    const { userId } = data;

    this.isLoading = true;
    const resp = await userServices.getUserById(userId);
    if (resp.ok) {
      const userData = await resp.json();

      this.isLoading = false;
      this.isFailure = false;
      this.error = null;
      this.setProfile(userData);
    } else {
      const err = await resp.json();

      this.isFailure = true;
      this.isLoading = false;
      this.error = err;
      this.setProfile(null);
    }
  }

  async updateProfile(id: number, updatedData: UpdatedData) {
    this.isLoading = true;
    const resp = await userServices.updateUser(id, updatedData);

    if (resp.ok) {
      const data = await resp.json();

      this.isFailure = false;
      this.isLoading = false;
      this.error = null;
      this.setProfile(data);
    } else {
      const err = await resp.json();

      this.isFailure = true;
      this.isLoading = false;
      this.error = err.validationErrors;
    }
  }

  async deleteProfile(id: number) {
    this.isLoading = true;
    const resp = await userServices.deleteUser(id);
    if (resp.ok) {
      this.isLoading = false;
      this.isFailure = false;
      this.error = null;
      this.setProfile(null);
      authStore.setToken('');
      history.push('/');
    } else {
      const err = await resp.json();
      this.isFailure = true;
      this.isLoading = false;
      this.error = err.message;
    }
  }

  setProfile(data: User | null) {
    this.profile = data;
  }
}

// @ts-ignore
decorate(ProfileStore, {
  isLoading: observable,
  isFailure: observable,
  profile: [persist('object'), observable],
  error: observable,
  getProfile: action,
  updateProfile: action,
  deleteProfile: action,
});

const hydrate = create({});
const profileStore = new ProfileStore();
const profileHydrated = hydrate('profile', profileStore);

export default profileStore;
