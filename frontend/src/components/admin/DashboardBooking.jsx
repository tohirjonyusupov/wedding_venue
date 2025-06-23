import axios from "axios";
import { Calendar, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DashboardBooking() {
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:4000/admin/bookings")
        setBookings(response.data)
      }
      catch (error) {
        console.error("Error fetching bookings:", error)
      }
    }
    fetchBookings()
  }, [])
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Tasdiqlangan"
      case "pending":
        return "Kutilmoqda"
      case "cancelled":
        return "Bekor qilingan"
      default:
        return "Noma'lum"
    }
  }
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
  return (
    <div className="lg:col-span-2">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Bookinglar</h3>
            <Link
              to="/admin/bookings"
              className="text-sm text-rose-600 hover:text-rose-700 font-medium"
            >
              Barchasini ko'rish
            </Link>
          </div>
        </div>
        <div className="overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {bookings.length === 0 ? 
              <li className="px-6 py-5 text-gray-500 text-lg text-center">
                Bookinglar mavjud emas
              </li>
            :bookings?.map((booking) => (
              <li key={booking.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {booking.name}
                      </p>
                      <div className="ml-2 flex-shrink-0">
                        <span
                          className={`inline-flex justify-center w-26 py-1 text-xs text-center font-medium rounded-full ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Users className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      {booking.firstname} {booking.lastname}
                      <span className="mx-2">•</span>
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      {formatDate(booking.reservation_date)}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardBooking;
