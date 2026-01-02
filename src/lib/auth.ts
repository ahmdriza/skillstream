// Auth utilities
export const AUTH_TOKEN_KEY = 'skillstream_token';
export const AUTH_USER_KEY = 'skillstream_user';

export function getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function removeStoredToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
    return !!getStoredToken();
}
