export const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const AUTH_ENDPOINTS = {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    CURRENT_USER: "/api/v1/users/me",
    REFRESH_TOKEN: "/api/v1/auth/refresh",
}