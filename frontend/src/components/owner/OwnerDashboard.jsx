import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Building2,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  Star,
  MapPin,
  Clock,
  Plus,
  Eye,
  Edit,
  BarChart3,
  CalendarDays,
  Heart,
  Award,
  User,
  SunMoon,
} from "lucide-react"
import axios from "axios"

const OwnerDashboard = () => {
  const [user, setUser] = useState(null)
  const [venues, setVenues] = useState([]);
  const {id} = JSON.parse(localStorage.getItem("user")) || {};
  const [stats, setStats] = useState({
    totalVenues: 0,
    totalBookings: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/owner/stats/${id}`);
        setStats(response.data.stats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }
    fetchStats();
  }, [])
  

  useEffect(() => {
    // Get user from localStorage
    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
    }

    // Mock data for demonstration
    setStats({
      totalVenues: 3,
      totalBookings: 45,
      totalRevenue: 125000,
      totalCustomers: 38,
    })
  }, [])



  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/owner/venues/${id}`
        );
        setVenues(response.data.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };
    fetchVenues();
  }, []);
  // Mock data
  // const myVenues = [
  //   {
  //     id: 1,
  //     name: "Royal Garden Palace",
  //     location: "Tashkent, Uzbekistan",
  //     bookings: 15,
  //     rating: 4.8,
  //     status: "active",
  //     revenue: 45000,
  //     image: "/placeholder.svg?height=200&width=300",
  //   },
  //   {
  //     id: 2,
  //     name: "Crystal Ballroom",
  //     location: "Samarkand, Uzbekistan",
  //     bookings: 20,
  //     rating: 4.9,
  //     status: "active",
  //     revenue: 60000,
  //     image: "/placeholder.svg?height=200&width=300",
  //   },
  //   {
  //     id: 3,
  //     name: "Sunset Terrace",
  //     location: "Bukhara, Uzbekistan",
  //     bookings: 10,
  //     rating: 4.7,
  //     status: "active",
  //     revenue: 20000,
  //     image: "/placeholder.svg?height=200&width=300",
  //   },
  // ]


  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "rose" }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
              {trend === "up" ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {trendValue}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Venue Egasi Boshqaruv Paneli</h1>
              <p className="text-gray-600 mt-1">
                Xush kelibsiz, {user?.firstname || "Owner"}! To'yxonalaringizni osonlik ila boshqaring
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/owner/create-venue"
                className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Yangi Venue Qo'shish
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <StatCard
            title="Mening Venuelarim"
            value={stats.totalVenues}
            icon={Building2}
            trend="up"
            trendValue="+1 ta shu oyda"
            color="rose"
          />
          <StatCard
            title="Jami Bookinglar"
            value={stats.totalBookings}
            icon={Calendar}
            trend="up"
            trendValue="O'tgan oyga nisbatan +12%"
            color="emerald"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Venues */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Mening Venuelarim</h2>
                  <Link to="/owner/my-venues" className="text-rose-600 hover:text-rose-700 font-medium text-sm">
                    Barchasini Ko'rish
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {venues?.map((venue) => (
                    <div
                      key={venue.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={venue.images[0] || "/placeholder.svg"}
                          alt={venue.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{venue.name}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {venue.district_name}, Tashkent
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-1" />
                              {venue.bookings} bookings
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="w-4 h-4 mr-1" />
                              {venue.capacity} capacity
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            venue.status === "tasdiqlangan" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {venue.status}
                        </span>
                        <Link
                          to={`/owner/venues/${venue.id}`}
                          className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/owner/my-venues/${venue.id}/edit`}
                          className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Upcoming Bookings */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tezkor Amallar</h2>
              <div className="space-y-3">
                <Link
                  to="/owner/add-venue"
                  className="flex items-center p-3 bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-3" />
                  Yangi Venue Qo'shish
                </Link>
                <Link
                  to="/owner/venues"
                  className="flex items-center p-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <Building2 className="w-5 h-5 mr-3" />
                  Venuelarni Boshqarish
                </Link>
                <Link
                  to="/owner/bookings"
                  className="flex items-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Bookinglarni Ko'rish
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OwnerDashboard