import React, { useState, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import DashboardBooking from "./DashboardBooking";
import QuickActions from "./QuickActions";
import BookingStatus from "./BookingStatus";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "https://wedding-venue.onrender.com/admin/stats"
        );
        setStats(response.data.stats);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <StatCard
            icon={<MapPin className="h-8 w-8 text-rose-600" />}
            text={"Jami To'yxonalar"}
            value={stats.totalVenues}
          />
          <StatCard
            icon={<Calendar className="h-8 w-8 text-blue-600" />}
            text={"Jami Buyurtmalar"}
            value={stats.totalBookings}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <DashboardBooking />
          <div className="space-y-6">
            <QuickActions />
            <BookingStatus stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}
