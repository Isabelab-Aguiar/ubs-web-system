import axios, { type AxiosInstance } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

const getTokenFromCookie = (): string | undefined =>
  typeof document === 'undefined'
    ? undefined
    : document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];

const setTokenCookie = (token: string) => {
  document.cookie = `accessToken=${token}; path=/; max-age=900; SameSite=Strict`;
};

const clearTokenCookie = () => {
  document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

api.interceptors.request.use((config) => {
  const token = getTokenFromCookie();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      const { data } = await axios.post<{ accessToken: string }>(
        `${BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true },
      );
      setTokenCookie(data.accessToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(original);
    } catch {
      clearTokenCookie();
      window.location.href = '/login';
      return Promise.reject(error);
    }
  },
);
