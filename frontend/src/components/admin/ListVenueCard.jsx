import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Users,
  DollarSign,
  Star,
  Camera,
  Edit3,
  Trash2,
  Check,
  User,
  ChevronDown,
  Eye,
  MoreVertical,
  Calendar,
  Award,
} from "lucide-react";

function ListVenueCard({
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("uz-UZ").format(price);
  };

  const handleImageError = (e) => {
    e.target.src = `https://placehold.co/600x400/f3f4f6/9ca3af?text=${encodeURIComponent(
      venue.name || "Venue"
    )}`;
  };

  const handleConfirm = async (venueId) => {
    setIsLoading(true);
    try {
      await handleConfirim(venueId);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedOwner = owners.find(
    (owner) => owner.id === venueOwners[venue.id]
  );

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-rose-200">
      <div className="sm:flex">
        {/* Rasm qismi */}
        <div
          className="relative h-48 w-full sm:h-auto sm:w-64 flex-shrink-0 overflow-hidden"
          onClick={(e) => {
            e.stopPropagation();
            if (venue.images && venue.images.length > 0) {
              openImageGallery(venue);
            }
          }}
        >
          <img
            className="h-full w-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
            src={
              venue.images?.[0] ||
              `https://placehold.co/600x400/f3f4f6/9ca3af?text=${encodeURIComponent(
                venue.name || "Venue"
              )}`
            }
            alt={venue.name}
            onError={handleImageError}
          />
          {/* Rasm soni */}
          {venue.images && venue.images.length > 1 && (
            <div className="absolute bottom-3 right-3 flex items-center bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs text-white">
              <Camera className="w-3 h-3 mr-1" />
              {venue.images.length}
            </div>
          )}

          {/* Holat badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(
                venue.status
              )}`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></div>
              {venue.status === "tasdiqlangan"
                ? "Tasdiqlangan"
                : venue.status === "kutilmoqda"
                ? "Kutilmoqda"
                : venue.status?.charAt(0).toUpperCase() +
                  venue.status?.slice(1)}
            </span>
          </div>
        </div>

        {/* Kontent qismi */}
        <div className="flex flex-1 flex-col p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3
                className="text-xl font-semibold text-gray-900 cursor-pointer hover:text-rose-600 transition-colors"
                onClick={() => navigate(`/admin/venues/${venue.id}`)}
              >
                {venue.name}
              </h3>
            </div>

            {/* Actions menu */}
            <div className="relative">
              <button
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsActionsOpen(!isActionsOpen)}
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {isActionsOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    onClick={(e) => {
                      navigate(`/admin/venues/${venue.id}`);
                      e.stopPropagation();
                      setIsActionsOpen(false);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ko'rish
                  </button>
                  <Link
                    to={`/admin/venues/${venue.id}/edit`}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    onClick={() => setIsActionsOpen(false)}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Tahrirlash
                  </Link>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                    onClick={() => {
                      handleDeleteVenue(venue.id);
                      setIsActionsOpen(false);
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    O'chirish
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Ma'lumotlar grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span>{venue.district_name}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2 text-gray-400" />
              <span>{venue.capacity} kishi</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium text-rose-600">
                {formatPrice(venue.capacity * venue.price_seat)} so'm
              </span>
            </div>
          </div>

          {/* Owner selection va actions */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            {/* Owner selection */}
            <div className="flex-1 max-w-xs">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                To'yxona egasi
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-left shadow-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 sm:text-sm hover:border-gray-400 transition-colors"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="block truncate">
                    {selectedOwner
                      ? `${selectedOwner.firstname} ${selectedOwner.lastname}`
                      : "Egani tanlang"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <div
                      className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-rose-50 text-gray-900"
                      onClick={() => {
                        handleAssignOwner({ target: { value: "" } }, venue.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      Egani tanlang
                    </div>
                    {owners.map((owner) => (
                      <div
                        key={owner.id}
                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-rose-50 text-gray-900"
                        onClick={() => {
                          handleAssignOwner(
                            { target: { value: owner.id } },
                            venue.id
                          );
                          setIsDropdownOpen(false);
                        }}
                      >
                        <div>
                          <span className="block truncate font-normal">
                            {owner.firstname} {owner.lastname}
                          </span>
                          <span className="block truncate text-xs text-gray-500">
                            {owner.email}
                          </span>
                        </div>
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

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {/* Tasdiqlash tugmasi */}
              <button
                className={`inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  venue.status === "tasdiqlangan"
                    ? "bg-green-100 text-green-800 cursor-not-allowed"
                    : "bg-amber-100 text-amber-800 hover:bg-amber-200 hover:scale-105 shadow-sm"
                }`}
                onClick={() => handleConfirm(venue.id)}
                disabled={venue.status === "tasdiqlangan" || isLoading}
              >
                <Check className="w-4 h-4 mr-2" />
                {isLoading
                  ? "Yuklanmoqda..."
                  : venue.status === "tasdiqlangan"
                  ? "Tasdiqlangan"
                  : "Tasdiqlash"}
              </button>

              {/* Tahrirlash tugmasi */}
              <Link
                to={`/admin/venues/${venue.id}/edit`}
                className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Tahrirlash
              </Link>

              {/* O'chirish tugmasi */}
              <button
                onClick={() => handleDeleteVenue(venue.id)}
                className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                O'chirish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListVenueCard;
