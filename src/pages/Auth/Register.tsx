import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Eye, EyeOff, Lock, Mail, Moon, Sun, UserPlus } from "lucide-react";
import { LoadingSpinner } from "../../components/UI/LoadingSpinner";

const Register: React.FC = () => {
  usePageTitle("Регистрация");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { theme, toggleTheme } = useTheme();
  const { register, isAuthenticated, isInitialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isInitialized, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      setIsLoading(false);
      return;
    }
    try {
      await register(
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      navigate("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при регистрации"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (!isInitialized) {
    return (
      <LoadingSpinner
        icon={UserPlus}
        title="Регистрация..."
        variant="blue"
        size="lg"
        fullScreen={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] w-full space-y-8">
          <div className="text-center">
            <div className="group relative mx-auto w-20 h-20 flex items-center justify-center rounded-3xl bg-gradient-to-br from-green-500 to-teal-600 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:rotate-3">
              <UserPlus className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
              <div
                className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
            <h2 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Создать аккаунт
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 font-medium">
              Регистрация на платформе валидации научных статей
            </p>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-white via-green-50/30 to-emerald-50/20 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 shadow-2xl rounded-3xl border border-green-100/50 dark:border-gray-600 hover:shadow-3xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-400/10 to-cyan-400/10 rounded-tr-full"></div>

            <form className="relative p-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                      </svg>
                    </div>
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                  >
                    Email адрес
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-300" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full pl-12 pr-4 py-4 border border-gray-200/50 dark:border-gray-600 rounded-2xl bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                      placeholder="Введите ваш email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                  >
                    Пароль
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-300" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="w-full pl-12 pr-12 py-4 border border-gray-200/50 dark:border-gray-600 rounded-2xl bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                      placeholder="Введите пароль"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                  >
                    Подтвердите пароль
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-300" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="w-full pl-12 pr-12 py-4 border border-gray-200/50 dark:border-gray-600 rounded-2xl bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                      placeholder="Подтвердите пароль"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center items-center space-x-2 py-4 px-6 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 active:from-green-800 active:to-teal-800 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl hover:shadow-green-500/30 active:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Регистрация...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      <span>Зарегистрироваться</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Уже есть аккаунт?{" "}
                  <Link
                    to="/auth/login"
                    className="font-semibold text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-300 hover:underline"
                  >
                    Войти
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <div className="text-center">
            <button
              onClick={toggleTheme}
              className="group relative w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
              title="Переключить тему"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {theme === "light" ? (
                  <Sun className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" />
                ) : (
                  <Moon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" />
                )}
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div
                className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ transitionDelay: "0.1s" }}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
