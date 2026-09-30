const TOKEN_KEY = 'refugio_token';

export const getToken = (): string | null =>
  typeof localStorage === 'undefined' ? null : localStorage.getItem(TOKEN_KEY);

export const saveToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = (): void => localStorage.removeItem(TOKEN_KEY);
export const isAuthenticated = (): boolean => Boolean(getToken());
