import authStore from 'stores/AuthStore';
import userStore from './UserStore';
import profileStore from './ProfileStore';

const globalStore = {
  authStore,
  userStore,
  profileStore,
};

export default globalStore;
