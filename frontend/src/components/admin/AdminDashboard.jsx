import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Eye,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import axios from "axios"

export default function AdminDashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
    }
  }, [])

  // Sample data - bu ma'lumotlar haqiqiy API dan kelishi kerak
  const [stats, setStats] = useState({})
  useEffect(() => {
    const fetchStats = async () => {
     try {
      const response = await axios.get("http://localhost:4000/admin/stats")
      setStats(response.data.stats)
     } catch (error) {
      console.log(error);
     }
    }
    fetchStats()
  }, [])

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

  
  // const recentBookings = [
  //   {
  //     id: 1,
  //     venueName: "Crystal Garden Palace",
  //     clientName: "Aziza Karimova",
  //     date: "2024-02-15",
  //     status: "confirmed",
  //     amount: 5500,
  //   },
  //   {
  //     id: 2,
  //     venueName: "Sunset Beach Resort",
  //     clientName: "Dilshod Toshmatov",
  //     date: "2024-02-18",
  //     status: "pending",
  //     amount: 7200,
  //   },
  //   {
  //     id: 3,
  //     venueName: "Royal Ballroom",
  //     clientName: "Malika Abdullayeva",
  //     date: "2024-02-20",
  //     status: "confirmed",
  //     amount: 8900,
  //   },
  //   {
  //     id: 4,
  //     venueName: "Historic Mansion",
  //     clientName: "Bobur Rahimov",
  //     date: "2024-02-22",
  //     status: "pending",
  //     amount: 6300,
  //   },
  // ]


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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                  {user ? `Xush kelibsiz, ${user.firstname}!` : "Xush kelibsiz!"} Bu yerda barcha ma'lumotlarni
                  ko'rishingiz mumkin.
                </p>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                <Link
                  to="/admin/create-venue"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Yangi To'yxona
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MapPin className="h-8 w-8 text-rose-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Jami To'yxonalar</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.totalVenues}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        12%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Jami Bookinglar</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.totalBookings}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        8%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Bookinglar</h3>
                  <Link to="/admin/bookings" className="text-sm text-rose-600 hover:text-rose-700 font-medium">
                    Barchasini ko'rish
                  </Link>
                </div>
              </div>
              <div className="overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {bookings?.map((booking) => (
                    <li key={booking.id} className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">{booking.name}</p>
                            <div className="ml-2 flex-shrink-0">
                              <span
                                className={`inline-flex justify-center w-26 py-1 text-xs text-center font-medium rounded-full ${getStatusColor(
                                  booking.status,
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

          {/* Quick Stats & Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Tezkor Amallar</h3>
              </div>
              <div className="p-6 space-y-4">
                <Link
                  to="/admin/venues/add"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Yangi Venue Qo'shish
                </Link>
                <Link
                  to="/admin/venues"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Venuelarni Ko'rish
                </Link>
                <Link
                  to="/admin/bookings"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Bookinglarni Boshqarish
                </Link>
              </div>
            </div>

            {/* Booking Status */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Booking Holati</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Tasdiqlangan</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{stats.completedBookings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-sm text-gray-600">Kutilmoqda</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{stats.pendingBookings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-sm text-gray-600">Bekor qilingan</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{stats.cancelledBookings}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
