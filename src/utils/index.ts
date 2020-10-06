export const getToken = () => JSON.parse(localStorage.getItem('auth')!)?.token;

export const getAccount = () => JSON.parse(localStorage.getItem('profile')!);
