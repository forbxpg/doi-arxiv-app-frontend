import { isAxiosError } from "axios";
import api from "./api";
import { AUTH_ENDPOINTS } from "../config";

type ApiErrorResponse = {
    detail?: string;
};

const extractErrorMessage = (error: unknown, fallback: string): string => {
    if (isAxiosError<ApiErrorResponse>(error)) {
        return error.response?.data?.detail || fallback;
    }
    if (error instanceof Error) {
        return error.message || fallback;
    }
    return fallback;
};


export interface UserResponse {
    id: number;
    email: string;
    role: string;
    can_login: boolean;
}

export interface UserDetailedResponse {
    id: number;
    email: string;
    role: string;
    can_login: boolean;
    is_active: boolean;
    registered_at: string;
    locked_until: string | null;
    failed_login_attempts: number;

}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface TokenResponse {
    access: string;
    refresh: string;
    token_type: string;
    exp: string;
    issued_at: string;
    token_id: string;
    user: UserResponse;
}




class AuthService {
    /**
     * Auth service class.
     * @description This class is used to authenticate/authorize the user.
     * @author John Doe
     * @version 1.0.0
     * @since 1.0.0
     */
    async login(
        email: string,
        password: string
    ): Promise<TokenResponse> {
        try {
            const response = await api.post(
                AUTH_ENDPOINTS.LOGIN,
                {
                    email,
                    password,
                }
            );
            const tokenData: TokenResponse = response.data

            localStorage.setItem(
                "token", tokenData.access
            );
            if (tokenData.refresh) {
                localStorage.setItem(
                    "refreshToken", tokenData.refresh
                )
            }
            return tokenData;
        } catch (error: unknown) {
            throw new Error(
                extractErrorMessage(
                    error,
                    "Произошла ошибка при попытке входа"
                )
            );
        }
    }

    async register(
        email: string,
        password: string,
        password_confirm: string
    ): Promise<UserResponse> {
        try {
            const response = await api.post(
                AUTH_ENDPOINTS.REGISTER, {
                email,
                password,
                password_confirm,
            }
            );
            return response.data;
        } catch (error: unknown) {
            throw new Error(
                extractErrorMessage(
                    error,
                    "Произошла ошибка при попытке регистрации"
                )
            );
        }
    }

    async getCurrentUser(): Promise<UserDetailedResponse> {
        try {
            const response = await api.get(AUTH_ENDPOINTS.CURRENT_USER);
            return response.data;
        } catch (error: unknown) {
            throw new Error(
                extractErrorMessage(
                    error,
                    "Произошла ошибка при получении данных"
                )
            )
        }
    }

    async refreshToken(): Promise<TokenResponse> {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                throw new Error("Не найдены данные для авторизации");
            }

            const response = await api.post(
                AUTH_ENDPOINTS.REFRESH_TOKEN,
                {
                    refresh_token: refreshToken,
                }
            );
            const tokenData: TokenResponse = response.data;

            localStorage.setItem("token", tokenData.access)
            if (tokenData.refresh) {
                localStorage.setItem("refreshToken", tokenData.refresh)
            }
            return tokenData;
        } catch (error: unknown) {
            throw new Error(
                extractErrorMessage(
                    error,
                    "Произошла ошибка при обновлении авторизационных данных"
                )
            )
        }
    }

    async logout(): Promise<void> {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("csrfToken");
        } catch (error: unknown) {
            console.log(error)
            throw new Error("Произошла ошибка при выходе из системы");
        }
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem("token");
    }

    getToken(): string | null {
        return localStorage.getItem(
            "token"
        );
    }

}

export const authService = new AuthService();