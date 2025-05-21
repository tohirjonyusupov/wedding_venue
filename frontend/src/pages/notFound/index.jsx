"use client"

import { Link } from "react-router-dom"
import React, { useState, useEffect } from "react"

const NotFound = () => {
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = "/"
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100 rounded-full opacity-50"></div>

        <div className="relative z-10 p-8 md:p-12">
          <div className="text-center">
            <div className="inline-block p-3 bg-pink-50 rounded-full mb-6">
              <svg
                className="w-16 h-16 text-pink-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Sahifa topilmadi</h1>

            <div className="flex items-center justify-center mb-6">
              <div className="h-0.5 w-12 bg-pink-200"></div>
              <div className="mx-4 text-2xl text-pink-400 font-light">404</div>
              <div className="h-0.5 w-12 bg-pink-200"></div>
            </div>

            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Afsuski, siz qidirayotgan sahifa mavjud emas. To'yxona saytimizda boshqa go'zal sahifalarni ko'rishingiz
              mumkin.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                to="/"
                className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto text-center"
              >
                Bosh sahifaga qaytish
              </Link>
              <Link
                to="/venues"
                className="px-6 py-3 bg-white border border-pink-300 text-pink-500 hover:bg-pink-50 rounded-full transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto text-center"
              >
                To'yxonalarni ko'rish
              </Link>
            </div>

            <div className="text-center text-gray-500">
              <p>{countdown} soniyadan so'ng bosh sahifaga yo'naltirilasiz</p>
            </div>
          </div>

          {/* Decorative wedding elements */}
          <div className="mt-12 flex justify-center space-x-8 opacity-30">
            <svg
              className="w-8 h-8 text-pink-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="w-8 h-8 text-pink-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="w-8 h-8 text-pink-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
