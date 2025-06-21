import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import React from "react";

function BookingStatus({ stats }) {
  return (
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
            <span className="text-sm font-medium text-gray-900">
              {stats.completedBookings}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm text-gray-600">Kutilmoqda</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {stats.pendingBookings}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm text-gray-600">Bekor qilingan</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {stats.cancelledBookings}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingStatus;
