"use client"

import React, { useState } from "react"
import { Link } from "react-router-dom"
import { MapPin, Users, Camera, Edit3, Trash2, Check, User, DollarSign, Star, ChevronDown } from "lucide-react"

function GridVenueCard({
  venue = {},
  owners = [],
  venueOwners = {},
  handleAssignOwner,
  handleDeleteVenue,
  handleConfirim,
  openImageGallery,
  getStatusColor,
  navigate,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("uz-UZ").format(price)
  }

  const handleImageError = (e) => {
    e.target.src = `https://placehold.co/600x400/f3f4f6/9ca3af?text=${encodeURIComponent(venue.name || "Venue")}`
  }

  const handleConfirm = async (venueId) => {
    setIsLoading(true)
    try {
      await handleConfirim(venueId)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedOwner = owners.find((owner) => owner.id === venueOwners[venue.id])

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Rasm qismi */}
      <div className="relative overflow-hidden">
        <div
          className="aspect-w-16 aspect-h-10 w-full overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            if (venue.images && venue.images.length > 0) {
              openImageGallery(venue)
            }
          }}
        >
          <img
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={
              venue.images?.[0] ||
              `https://placehold.co/600x400/f3f4f6/9ca3af?text=${encodeURIComponent(venue.name || "Venue")}`
            }
            alt={venue.name}
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Holat ko'rsatkichi */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(
              venue.status,
            )}`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></div>
            {venue.status === "tasdiqlangan"
              ? "Tasdiqlangan"
              : venue.status === "kutilmoqda"
                ? "Kutilmoqda"
                : venue.status?.charAt(0).toUpperCase() + venue.status?.slice(1)}
          </span>
        </div>

        {/* Rasm soni */}
        {venue.images && venue.images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex items-center bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs text-white">
            <Camera className="w-3 h-3 mr-1" />
            {venue.images.length}
          </div>
        )}
      </div>

      {/* Kontent qismi */}
      <div className="p-5">
        {/* Sarlavha va narx */}
        <div
          className="flex items-start justify-between mb-3 cursor-pointer"
          onClick={() => navigate(`/admin/venues/${venue.id}`)}
        >
          <h3 className="text-lg font-semibold text-gray-900 truncate pr-2 group-hover:text-rose-600 transition-colors">
            {venue.name}
          </h3>
          <div className="text-right flex-shrink-0">
            <div className="flex items-center text-lg font-bold text-rose-600">
              {formatPrice(venue.capacity * venue.price_seat)}
            </div>
            <div className="text-xs text-gray-500">so'm</div>
          </div>
        </div>

        {/* Joylashuv va sig'im */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
            <span className="truncate">{venue.district_name}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-gray-400" />
            <span>{venue.capacity} kishi</span>
          </div>
        </div>

        {/* Venue egasi tanlash */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            To'yxona egasi
          </label>
          <div className="relative">
            <button
              type="button"
              className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-left shadow-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 sm:text-sm hover:border-gray-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setIsDropdownOpen(!isDropdownOpen)
              }}
            >
              <span className="block truncate">
                {selectedOwner ? `${selectedOwner.firstname} ${selectedOwner.lastname}` : "Egani tanlang"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <div
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-rose-50 text-gray-900"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAssignOwner({ target: { value: "" } }, venue.id)
                    setIsDropdownOpen(false)
                  }}
                >
                  Egani tanlang
                </div>
                {owners.map((owner) => (
                  <div
                    key={owner.id}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-rose-50 text-gray-900"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAssignOwner({ target: { value: owner.id } }, venue.id)
                      setIsDropdownOpen(false)
                    }}
                  >
                    <span className="block truncate font-normal">
                      {owner.firstname} {owner.lastname}
                    </span>
                    {venueOwners[venue.id] === owner.id && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-rose-600">
                        <Check className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Amallar */}
        <div className="flex items-center justify-between gap-2">
          {/* Tasdiqlash tugmasi */}
          <button
            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              venue.status === "tasdiqlangan"
                ? "bg-green-100 text-green-800 cursor-not-allowed"
                : "bg-amber-100 text-amber-800 hover:bg-amber-200 hover:scale-105"
            }`}
            onClick={(e) => {
              e.stopPropagation()
              handleConfirm(venue.id)
            }}
            disabled={venue.status === "tasdiqlangan" || isLoading}
          >
            <Check className="w-4 h-4 mr-1.5" />
            {isLoading ? "Yuklanmoqda..." : venue.status === "tasdiqlangan" ? "Tasdiqlangan" : "Tasdiqlash"}
          </button>

          {/* Tahrirlash va o'chirish tugmalari */}
          <div className="flex gap-2">
            <Link
              to={`/admin/venues/${venue.id}/edit`}
              className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
              title="Tahrirlash"
              onClick={(e) => e.stopPropagation()}
            >
              <Edit3 className="w-4 h-4 " />
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteVenue(venue.id, e)
              }}
              className="inline-flex items-center text-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
              title="O'chirish"
            >
              <Trash2 className="w-4 h-4" />
              
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GridVenueCard
