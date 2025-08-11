import axios, { type AxiosInstance } from "axios";
import { useAuth } from "../context/AuthContext";

export function useDefaultAPI(): AxiosInstance {
  const { accessToken } = useAuth();

  const api = axios.create({
    baseURL: "https://api.spotify.com/v1/",
  });

  api.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (err) => {
      Promise.reject(err);
    }
  );

  return api;
}
