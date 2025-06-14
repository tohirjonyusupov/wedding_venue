import { Heart } from "lucide-react"
import React from "react"

const CustomLoader = ({ size = "md", variant = "spinner", text = "", color = "rose", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  }

  const colorClasses = {
    rose: "text-rose-500",
    blue: "text-blue-500",
    gray: "text-gray-500",
  }

  if (variant === "spinner") {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}>
          <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        {text && <p className={`mt-2 text-sm ${colorClasses[color]} animate-pulse`}>{text}</p>}
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className="flex space-x-1">
          <div
            className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
        {text && <p className={`mt-2 text-sm ${colorClasses[color]} animate-pulse`}>{text}</p>}
      </div>
    )
  }

  if (variant === "heart") {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <Heart className={`${sizeClasses[size]} ${colorClasses[color]} animate-pulse`} fill="currentColor" />
        {text && <p className={`mt-2 text-sm ${colorClasses[color]} animate-pulse`}>{text}</p>}
      </div>
    )
  }

  if (variant === "button") {
    return (
      <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}>
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    )
  }

  return null
}

export default CustomLoader
