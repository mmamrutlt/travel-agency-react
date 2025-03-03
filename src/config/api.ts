import axios, { type AxiosError } from 'axios';

import { getAuthStoreState, setAuthStoreToken } from '@/stores';
import { env } from './env';

const baseApiConfiguration = {
  baseURL: env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
};

const privateApi = axios.create(baseApiConfiguration);

privateApi.interceptors.request.use(
  (config) => {
    const { token } = getAuthStoreState();

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  },
);

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error?.response?.status === 401) {
      return setAuthStoreToken(null);
    }

    return Promise.reject(error);
  },
);

const publicApi = axios.create(baseApiConfiguration);

export { privateApi, publicApi };
