import React from 'react';
import { Heart } from "lucide-react"
const PageLoader = ({ message = "Yuklanmoqda...", showLogo = true, className = "" }) => {
  return (
    <div className={`fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center ${className}`}>
      <div className="text-center">
        {showLogo && (
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-12 w-12 text-rose-500 animate-pulse" fill="currentColor" />
            </div>
            <h1 className="text-2xl font-serif text-gray-800">
              <span className="font-semibold text-rose-600">Elegance</span>
              <span className="ml-1 font-light italic">Venues</span>
            </h1>
          </div>
        )}

        {/* Animated loader */}
        <div className="mb-6">
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-3 h-3 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>

        {/* Loading message */}
        <p className="text-gray-600 text-lg animate-pulse">{message}</p>

        {/* Progress bar */}
        <div className="mt-6 w-64 mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLoader