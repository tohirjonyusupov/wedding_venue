"use client"

import axios from "axios"
import { User } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserInfo from "../../components/client/UserInfo"
import UserTabs from "../../components/client/UserTabs"
import NotFound from "../../components/client/NotFound"
import BookingList from "../../components/client/BookingList"

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const user = JSON.parse(localStorage.getItem("user")) || null
  

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

  
  const filteredBookings = bookings.filter(booking => {
    const status = booking.status.toLowerCase();
  
    if (activeTab === "upcoming") return status === "confirmed" || status === "pending";
    if (activeTab === "past") return status === "completed";
    if (activeTab === "cancelled") return status === "cancelled";
    return true;
  });
  
  
  

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <UserInfo user={user} />
            <UserTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
          {filteredBookings.length === 0 ? (
            <NotFound activeTab={activeTab} />
          ) : (
            <div className="mt-6 space-y-6">
              {filteredBookings.map((booking) => (
                <BookingList booking={booking} key={booking.id} activeTab={activeTab} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
