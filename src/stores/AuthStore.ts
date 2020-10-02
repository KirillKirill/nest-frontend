/* eslint-disable no-unused-vars */
import { observable, action, runInAction, decorate } from 'mobx';
import { persist, create } from 'mobx-persist';
import { history } from 'components/AppRouter/AppRouter';
import { RegistrationData } from 'types';
import authService from 'services/authService';
import profileStore from './ProfileStore';

class AuthStore {
  isLoading = false;
  isFailure = false;
  token = '';
  error = null;

  async register(regData: RegistrationData) {
    this.isLoading = true;
    const response = await authService.register(regData);
    if (response.ok) {
      await this.login(regData.email, regData.password);
    } else {
      const err = await response.json();
      runInAction(() => {
        this.isLoading = false;
        this.isFailure = true;
        this.error = err.validationErrors;
      });
    }
  }

  async login(email: string, pass: string) {
    this.isLoading = true;
    const response = await authService.login(email, pass);

    if (response.ok) {
      const data = await response.json();
      runInAction(() => {
        this.isFailure = false;
        this.isLoading = false;
        this.error = null;
        this.setToken(data.token);
        profileStore.getProfile(this.token);
        history.push('/');
      });
    } else {
      const err = await response.json();
      runInAction(() => {
        this.isFailure = true;
        this.isLoading = false;
        this.error = err.message;
        this.setToken('');
      });
    }
  }

  async logout() {
    await authService.logout();
    runInAction(() => {
      this.isFailure = false;
      this.isLoading = false;
      this.error = null;
      this.setToken('');
      history.push('/');
    });
  }

  setToken(token: string) {
    this.token = token;
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
});

const hydrate = create({});
const authStore = new AuthStore();
const authHydrated = hydrate('auth', authStore);

export default authStore;
