import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/auth";

const api = axios.create({
  baseURL: "https://mock.arianalabs.io/",
  timeout: 15000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { token } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Basic ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const { clearAuth } = useAuthStore.getState();
      clearAuth();
      globalThis.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
