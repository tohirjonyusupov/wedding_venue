import { Calendar, Eye, Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function QuickActions() {
  return (
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
          Yangi To'yxona Qo'shish
        </Link>
        <Link
          to="/admin/venues"
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Eye className="w-4 h-4 mr-2" />
          To'yxonalarni Ko'rish
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
  );
}

export default QuickActions;
