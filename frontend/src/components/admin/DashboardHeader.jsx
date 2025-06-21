import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DashboardHeader() {
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
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {user ? `Xush kelibsiz, ${user.firstname}!` : "Xush kelibsiz!"}{" "}
                Bu yerda barcha ma'lumotlarni ko'rishingiz mumkin.
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
  );
}

export default DashboardHeader;
