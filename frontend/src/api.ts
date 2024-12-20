import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN } from "./constants";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string, // Typecasting environment variable to string
    headers: {
        "Content-Type": "application/json", // Default header for all requests
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
