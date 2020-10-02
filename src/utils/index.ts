export const getToken = () => JSON.parse(localStorage.getItem('auth')!);

export const getAccount = () => JSON.parse(localStorage.getItem('profile')!);
