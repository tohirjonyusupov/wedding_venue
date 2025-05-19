"use client"

import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function RegisterVenueOwner() {
  const [newOwner, setNewOwner] = useState({
    // Personal Information
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    phone_number: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewOwner((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }))
    }
  }

  

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)


    axios.post("http://localhost:4000/admin/create-owner", newOwner)
      .then((response) => {
        console.log("Owner registered successfully:", response.data)
      })
      .catch((error) => {
        console.error("Error registering owner:", error)
        if (error.response && error.response.data) {
          setErrors(error.response.data.errors || {})
        } else {
          setErrors({ general: "An error occurred. Please try again." })
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 bg-rose-50">
              <h1 className="text-2xl font-serif font-medium text-gray-900">Register Venue Owner</h1>
              <p className="mt-1 text-sm text-gray-600">
                Join our platform to showcase your wedding venues to thousands of couples
              </p>
            </div>

            <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
              <div className="space-y-8 divide-y divide-gray-200">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Owner Information</h3>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                        First name <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          value={newOwner.firstname}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md shadow-sm sm:text-sm ${
                            errors.firstname
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                          }`}
                        />
                        {errors.firstname && <p className="mt-2 text-sm text-red-600">{errors.firstname}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                        Last name <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="lastname"
                          id="lastname"
                          value={newOwner.lastname}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md shadow-sm sm:text-sm ${
                            errors.lastname
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                          }`}
                        />
                        {errors.lastname && <p className="mt-2 text-sm text-red-600">{errors.lastname}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="username"
                          name="username"
                          id="username"
                          autoComplete="username"
                          value={newOwner.username}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md shadow-sm sm:text-sm ${
                            errors.username
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                          }`}
                        />
                        {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
                      </div>
                    </div>

                    

                    <div className="sm:col-span-3">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          autoComplete="new-password"
                          value={newOwner.password}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md shadow-sm sm:text-sm ${
                            errors.password
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                          }`}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                        Phone number <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          name="phone_number"
                          id="phone_number"
                          autoComplete="tel"
                          value={newOwner.phone_number}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md shadow-sm sm:text-sm ${
                            errors.phone_number
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                          }`}
                        />
                        {errors.phone_number && <p className="mt-2 text-sm text-red-600">{errors.phone_number}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`ml-3 inline-flex justify-center rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
