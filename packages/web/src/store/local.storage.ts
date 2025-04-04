const DEFAULT_TOKEN_KEY = 'token';

export const saveToken = async (token: string): Promise<void> => {
    await Promise.resolve(); 
    localStorage.setItem(DEFAULT_TOKEN_KEY, token);
};

export const removeToken = (): void => {
    localStorage.removeItem(DEFAULT_TOKEN_KEY);
};

export const getToken = (): string | null => {
    return localStorage.getItem(DEFAULT_TOKEN_KEY);
};