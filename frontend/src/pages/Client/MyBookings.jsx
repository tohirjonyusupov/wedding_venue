"use client"

import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const user = JSON.parse(localStorage.getItem("user")) || null
  const navigate = useNavigate()

  // Sample booking data
  const [bookings, setBookings] = useState([]) 

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/client/my-bookings/${user.id}`) // Replace with your API endpoint
        setBookings(response.data.data)
      } catch (error) {
        console.error("Error fetching bookings:", error)
      }
    }
    fetchBookings()
  }, [])
  

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  
  const filteredBookings = bookings.filter(booking => {
    const status = booking.status.toLowerCase();
  
    if (activeTab === "upcoming") return status === "confirmed" || status === "pending";
    if (activeTab === "past") return status === "completed";
    if (activeTab === "cancelled") return status === "cancelled";
    return true;
  });
  
  const handleCancel = async (bookingId) => {
    console.log(bookingId);
    
    try {
      const response = await axios.patch(`http://localhost:4000/client/my-bookings/${bookingId}/cancel`)
      console.log(response);
      if (response.data.success) {
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId))
        alert("Booking cancelled successfully")
      }
    } catch (error) {
      console.error("Error cancelling booking:", error)
    }
  }
  

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        {/* User info and tabs */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="sm:flex sm:items-center">
                  <div className="mt-4 sm:mt-0 sm:ml-4">
                    <h2 className="text-xl font-medium text-gray-900">{user.firstname} {user.lastname}</h2>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <svg
                        className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      @{user.username}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <svg
                        className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {user.phone_number}
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Link to="/profile" className="text-sm font-medium text-rose-600 hover:text-rose-700">
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-center text-sm font-medium ${
                    activeTab === "upcoming"
                      ? "border-rose-500 text-rose-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Upcoming Bookings
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-center text-sm font-medium ${
                    activeTab === "past"
                      ? "border-rose-500 text-rose-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Past Bookings
                </button>
                <button
                  onClick={() => setActiveTab("cancelled")}
                  className={`flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-center text-sm font-medium ${
                    activeTab === "cancelled"
                      ? "border-rose-500 text-rose-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Cancelled
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings list */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
          {filteredBookings.length === 0 ? (
            <div className="mt-6 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming bookings."
                  : activeTab === "past"
                    ? "You don't have any past bookings."
                    : "You don't have any cancelled bookings."}
              </p>
              <div className="mt-6">
                <button className="inline-flex items-center rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2" onClick={() => navigate("/venues")}>
                  Book a Venue
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md"
                >
                  <div className="sm:flex">
                    <div className="h-48 w-full sm:h-auto sm:w-48 flex-shrink-0">
                      <img
                        className="h-full w-full object-cover"
                        src={booking.image_url || `https://placehold.co/600x400?text=${booking.venue_name}`}
                        alt={booking.venue_name}
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-medium text-gray-900">{booking.venue_name}</h3>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                              booking.status,
                            )}`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                          <div className="flex items-center text-sm text-gray-500">
                            <svg
                              className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {formatDate(booking.reservation_date)}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg
                              className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            {booking.guest_count} guests
                          </div>
                          <div className="flex items-center text-sm font-medium text-gray-900">
                            <svg
                              className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {booking.capacity * booking.price_seat} so'm
                          </div>
                        </div>

                        
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">Booking ID:</span> {booking.id}
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          {booking.status !== "cancelled" && booking.status !== "completed" && (                        
                              <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2" onClick={() => handleCancel(booking.id)}>
                                Cancel
                              </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
