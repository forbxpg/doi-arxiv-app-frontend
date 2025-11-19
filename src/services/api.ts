import axios, {HttpStatusCode} from "axios"
/**
 * Config file for the frontend application.
 */

import {API_BASE_URL} from "../config";


const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
        }
        return Promise.reject(error);
    }
);

export default api;