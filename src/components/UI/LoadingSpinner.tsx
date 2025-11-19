import React from "react";
import { LucideIcon } from "lucide-react";

interface LoadingSpinnerProps {
  icon?: LucideIcon;
  title?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "blue" | "green" | "purple" | "red" | "orange";
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  icon: Icon,
  title = "Загрузка...",
  subtitle = "Пожалуйста, подождите",
  size = "md",
  variant = "default",
  fullScreen = true,
}) => {
  const sizes = {
    sm: {
      container: "w-16 h-16",
      icon: "w-6 h-6",
      circles: ["w-16 h-16", "w-12 h-12", "w-8 h-8"],
      title: "text-lg",
      subtitle: "text-sm",
      progress: "w-48",
    },
    md: {
      container: "w-20 h-20",
      icon: "w-10 h-10",
      circles: ["w-20 h-20", "w-16 h-16", "w-12 h-12"],
      title: "text-2xl",
      subtitle: "text-base",
      progress: "w-64",
    },
    lg: {
      container: "w-24 h-24",
      icon: "w-12 h-12",
      circles: ["w-24 h-24", "w-20 h-20", "w-16 h-16"],
      title: "text-3xl",
      subtitle: "text-lg",
      progress: "w-80",
    },
  };

  const variants = {
    default: {
      container: "from-blue-500 to-purple-600",
      circles: [
        "border-blue-200 dark:border-blue-800",
        "border-purple-200 dark:border-purple-800",
        "border-pink-200 dark:border-pink-800",
      ],
      progress: "from-blue-500 via-purple-500 to-pink-500",
      bg: "from-blue-50 via-indigo-50 to-purple-50",
    },
    blue: {
      container: "from-blue-500 to-blue-600",
      circles: [
        "border-blue-200 dark:border-blue-800",
        "border-blue-300 dark:border-blue-700",
        "border-blue-400 dark:border-blue-600",
      ],
      progress: "from-blue-400 via-blue-500 to-blue-600",
      bg: "from-blue-50 via-blue-100 to-indigo-50",
    },
    green: {
      container: "from-green-500 to-teal-600",
      circles: [
        "border-green-200 dark:border-green-800",
        "border-teal-200 dark:border-teal-800",
        "border-emerald-200 dark:border-emerald-800",
      ],
      progress: "from-green-400 via-teal-500 to-emerald-500",
      bg: "from-green-50 via-emerald-50 to-teal-50",
    },
    purple: {
      container: "from-purple-500 to-indigo-600",
      circles: [
        "border-purple-200 dark:border-purple-800",
        "border-indigo-200 dark:border-indigo-800",
        "border-violet-200 dark:border-violet-800",
      ],
      progress: "from-purple-400 via-indigo-500 to-violet-500",
      bg: "from-purple-50 via-indigo-50 to-violet-50",
    },
    red: {
      container: "from-red-500 to-pink-600",
      circles: [
        "border-red-200 dark:border-red-800",
        "border-pink-200 dark:border-pink-800",
        "border-rose-200 dark:border-rose-800",
      ],
      progress: "from-red-400 via-pink-500 to-rose-500",
      bg: "from-red-50 via-pink-50 to-rose-50",
    },
    orange: {
      container: "from-orange-500 to-yellow-600",
      circles: [
        "border-orange-200 dark:border-orange-800",
        "border-yellow-200 dark:border-yellow-800",
        "border-amber-200 dark:border-amber-800",
      ],
      progress: "from-orange-400 via-yellow-500 to-amber-500",
      bg: "from-orange-50 via-yellow-50 to-amber-50",
    },
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  const containerClasses = fullScreen
    ? `min-h-screen flex items-center justify-center bg-gradient-to-br ${currentVariant.bg} dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="relative mb-8">
          <div
            className={`${currentSize.container} mx-auto bg-gradient-to-br ${currentVariant.container} rounded-3xl flex items-center justify-center shadow-2xl animate-pulse`}
          >
            {Icon && (
              <Icon
                className={`${currentSize.icon} text-white animate-bounce`}
              />
            )}
          </div>
          <div
            className={`absolute inset-0 ${currentSize.circles[0]} mx-auto border-4 ${currentVariant.circles[0]} rounded-3xl animate-spin`}
          ></div>
          <div
            className={`absolute inset-2 ${currentSize.circles[1]} mx-auto border-4 ${currentVariant.circles[1]} rounded-2xl animate-spin`}
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
          <div
            className={`absolute inset-4 ${currentSize.circles[2]} mx-auto border-4 ${currentVariant.circles[2]} rounded-xl animate-spin`}
            style={{ animationDuration: "2s" }}
          ></div>
        </div>

        <h3
          className={`${currentSize.title} font-bold text-gray-800 dark:text-white mb-4 animate-pulse`}
        >
          {title}
        </h3>
        <p
          className={`${currentSize.subtitle} text-gray-600 dark:text-gray-400 mb-8 font-medium`}
        >
          {subtitle}
        </p>

        <div className={`${currentSize.progress} mx-auto`}>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className={`bg-gradient-to-r ${currentVariant.progress} h-full rounded-full animate-pulse`}
              style={{ width: "70%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
