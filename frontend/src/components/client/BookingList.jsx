import React from "react";

function BookingList({ booking }) {
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
  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmed"
      case "pending":
        return "Kutilmoqda"
      case "completed":
        return "Bo'lib o'tgan"
      case "cancelled":
        return "Bekor qilingan"
      default:
        return "Noma'lum"
    }
  }
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric"
    }
    return new Intl.DateTimeFormat("uz-UZ", options).format(new Date(dateString))
  }
  
  return (
    <div
      key={booking.id}
      className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md"
    >
      <div className="sm:flex">
        <div className="h-48 w-full sm:h-auto sm:w-48 flex-shrink-0">
          <img
            className="h-full w-full object-cover"
            src={
              booking.images[0] ||
              `https://placehold.co/600x400?text=${booking.venue_name}`
            }
            alt={booking.venue_name}
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-6">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-gray-900">
                {booking.venue_name}
              </h3>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                  booking.status
                )}`}
              >
                {getStatusText(booking.status)}
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
                {booking.guest_count} mehmon
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
                Umumiy: {booking.capacity * booking.price_seat} so'm
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-900">No:</span>{" "}
                {booking.id}
              </div>
            </div>
            <div className="flex space-x-3">
              {booking.status !== "cancelled" &&
                booking.status !== "completed" && (
                  <button
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    onClick={() => handleCancel(booking.id)}
                  >
                    Bekor qilish
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingList;
