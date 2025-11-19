import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

import {
  authService,
  TokenResponse,
  UserResponse,
} from "../services/authService";

interface AuthContextType {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    password_confirm: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Произошла непредвиденная ошибка: AuthContext");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const isCheckingAuthRef = useRef(false);
  const isAuthenticated = !!user && authService.isAuthenticated();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      isCheckingAuthRef.current = true;
      if (!authService.isAuthenticated()) {
        setUser(null);
        setIsLoading(false);
        setIsInitialized(true);
        return;
      }

      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error("Произошла ошибка при проверке авторизации:", error);
      setUser(null);
      await authService.logout();
    } finally {
      isCheckingAuthRef.current = false;
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const tokenData: TokenResponse = await authService.login(
        email.trim().toLowerCase(),
        password.trim()
      );
      setUser(tokenData.user);
    } catch (error) {
      console.error("Произошла ошибка при входе в систему:", error);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    password_confirm: string
  ) => {
    try {
      const userData: UserResponse = await authService.register(
        email.trim().toLowerCase(),
        password.trim(),
        password_confirm.trim()
      );
      setUser(userData);
    } catch (error) {
      console.error("Произошла ошибка при регистрации:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Произошла ошибка при выходе из системы:", error);
      throw error;
    }
  };
  const value = {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    login,
    register,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
