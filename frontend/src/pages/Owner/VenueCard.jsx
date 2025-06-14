import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Users, Star, Edit3, Camera, Heart } from "lucide-react";
import ImageModal from "../../components/owner/ImageModal";

function VenueCard({ venue }) {
  const navigate = useNavigate();
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "tasdiqlangan":
        return "bg-green-100 text-green-800";
      case "tasdiqlanmagan":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("uz-UZ").format(price);
  };

  const handleImageError = (e) => {
    e.target.src = `https://placehold.co/600x400/f3f4f6/9ca3af?text=${encodeURIComponent(
      "Rasm topilmadi"
    )}`;
  };

  const openImageGallery = (venue, index = 0) => {
    setSelectedVenue(venue);
    setIsImageModalOpen(true);
  };

  return (
    <>
      <div
        className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        onClick={() => navigate(`/owner/venues/${venue.id}`)}
      >
        {/* Rasm qismi */}
        <div className="relative overflow-hidden">
          <div
            className="aspect-w-16 aspect-h-10 w-full overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (venue.images && venue.images.length > 0) {
                openImageGallery(venue);
              }
            }}
          >
            <img
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={
                venue.images?.[0] ||
                `https://placehold.co/600x400/f3f4f6/9ca3af?text=${encodeURIComponent(
                  venue.name || "Venue"
                )}`
              }
              alt={venue.name}
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Holat ko'rsatkichi */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(
                venue.status
              )}`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></div>
              {venue.status === "active" || venue.status === "faol"
                ? "Faol"
                : venue.status === "inactive" || venue.status === "nofaol"
                ? "Nofaol"
                : venue.status === "pending" || venue.status === "kutilmoqda"
                ? "Kutilmoqda"
                : venue.status}
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
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 truncate pr-2 group-hover:text-rose-600 transition-colors">
              {venue.name}
            </h3>
            <div className="text-right flex-shrink-0">
              <div className="text-lg font-bold text-rose-600">
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
          {/* Tahrirlash tugmasi */}
          <div className="flex justify-end">
            <Link
              to={`/owner/venues/${venue.id}/edit`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
              title="Tahrirlash"
              onClick={(e) => e.stopPropagation()}
            >
              <Edit3 className="w-4 h-4 mr-1.5" />
              Tahrirlash
            </Link>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 ring-2 ring-rose-500 ring-opacity-0 group-hover:ring-opacity-20 rounded-2xl transition-all duration-300 pointer-events-none" />
      </div>
      {isImageModalOpen && selectedVenue && (
        <ImageModal
          isOpen={isImageModalOpen}
          selectedVenue={selectedVenue}
          onClose={() => setIsImageModalOpen(false)}
        />
      )}
    </>
  );
}

export default VenueCard;
