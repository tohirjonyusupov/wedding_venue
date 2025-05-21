"use client"

import axios from "axios"
import React, { useState, useEffect } from "react"

export default function BookingsList() {
  const {id} = JSON.parse(localStorage.getItem("user"))
  // State for bookings data
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])

  // State for sorting and filtering
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("asc")
  const [venueFilter, setVenueFilter] = useState("")
  const [districtFilter, setDistrictFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [, set] = useState("")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Sample data (in a real app, this would come from an API)
  useEffect(() => {
    const fetchBookings = async () => {
      
      const response = await axios.get(`http://localhost:4000/owner/bookings/${id}`)
      setBookings(response.data.data)
      setFilteredBookings(response.data)
    }

    fetchBookings()
  }, [])

  // Get unique venues for filter
  const uniqueVenues = [...new Set(bookings.map((booking) => booking.name))]

  // Get unique districts for filter
  const uniqueDistricts = [...new Set(bookings.map((booking) => booking.district_name))]

  // Handle sorting and filtering
  useEffect(() => {
    let result = [...bookings]

    // Apply filters
    if (venueFilter) {
      result = result.filter((booking) => booking.name === venueFilter)
    }

    if (districtFilter) {
      result = result.filter((booking) => booking.district_name === districtFilter)
    }

    if (statusFilter) {
      result = result.filter((booking) => booking.status === statusFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      let fieldA, fieldB

      switch (sortField) {
        case "id":
          fieldA = a.id
          fieldB = b.id
          break
        case "venueName":
          fieldA = a.name
          fieldB = b.name
          break
        case "district":
          fieldA = a.district_name
          fieldB = b.district_name
          break
        case "date":
          fieldA = new Date(a.reservation_date)
          fieldB = new Date(b.reservation_date)
          break
        case "guestCount":
          fieldA = a.guest_count
          fieldB = b.guest_count
          break
        case "status":
          fieldA = a.status
          fieldB = b.status
          break
        default:
          fieldA = a.date
          fieldB = b.date
      }

      if (sortDirection === "asc") {
        return fieldA > fieldB ? 1 : -1
      } else {
        return fieldA < fieldB ? 1 : -1
      }
    })

    setFilteredBookings(result)
  }, [bookings, sortField, sortDirection, venueFilter, districtFilter, statusFilter, ])

  // Handle sort click
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("uz-UZ", options)
  }

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get status text in Uzbek
  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Bo'lib o'tgan"
      case "pending":
        return "Endi bo'ladigan"
      case "cancelled":
        return "Bekor qilingan"
      default:
        return "Noma'lum"
    }
  }

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return null

    return sortDirection === "asc" ? (
      <svg className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    ) : (
      <svg className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    )
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axios.patch(`http://localhost:4000/owner/bookings/${bookingId}/cancel/`)
      if (response.status === 200) {
        alert("Bron bekor qilindi")
        setBookings((prevBookings) =>
          prevBookings.map((booking) => (booking.booking_id === bookingId ? { ...booking, status: "cancelled" } : booking))
        )
      }
    } catch (error) {
      console.error("Error cancelling booking:", error)
    }
  }

 

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("id")}
                    >
                      <div className="flex items-center">
                        Bron ID
                        {getSortIcon("id")}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("venueName")}
                    >
                      <div className="flex items-center">
                        To'yxona nomi
                        {getSortIcon("venueName")}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex items-center">
                        Sana
                        {getSortIcon("date")}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("guestCount")}
                    >
                      <div className="flex items-center">
                        Mehmonlar soni
                        {getSortIcon("guestCount")}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("customerName")}
                    >
                      <div className="flex items-center">
                        Mijoz
                        {getSortIcon("customerName")}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center">
                        Status
                        {getSortIcon("status")}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.booking_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.venue_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(booking.reservation_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.guest_count}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.firstname} {booking.lastname}
                          </div>
                          <div className="text-sm text-gray-500">{booking.phone_number}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(booking.status)}`}
                          >
                            {getStatusText(booking.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <button
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-amber-50 ${
                          booking.status !== "cancelled"
                            ? "bg-red-400 hover:bg-red-500 cursor-pointer"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                        disabled={booking.status === "cancelled"}
                        onClick={() => {
                          if (booking.status !== "cancelled") {
                            handleCancelBooking(booking.booking_id); // misol uchun
                          }
                        }}
                        >
                        Bekor qilish
                        </button>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                        Bronlar topilmadi
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
