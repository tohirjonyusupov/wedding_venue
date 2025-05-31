"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageModal from "../../components/owner/ImageModal";

export default function MyVenues() {
  const navigate = useNavigate();
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [venues, setVenues] = useState([]);
  const {id} = JSON.parse(localStorage.getItem("user")) || {};


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

  

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "tasdiqlangan":
        return "bg-green-100 text-green-800";
      case "tasdiqlanmagan":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  // Open image gallery modal
  const openImageGallery = (venue, index = 0) => {
    setSelectedVenue(venue);
    setIsImageModalOpen(true);
  };


  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-serif font-medium text-gray-900 sm:text-3xl">
                  Wedding Venues
                </h1>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <Link
                  to="/owner/create-venue"
                  className="inline-flex items-center rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add New Venue
                </Link>
              </div>
            </div>
          </div>
        </div>

        

        {/* Venues grid */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
          {venues.length === 0 ? (
            <div className="mt-6 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No venues found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                No venues match your current filters. Try adjusting your search
                or filter criteria.
              </p>
              <div className="mt-6">
                <Link
                  to="/owner/create-venue"
                  className="inline-flex items-center rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add New Venue
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 cursor-pointer">
              {venues.map((venue) => (
                <div
                  key={venue.id}
                  className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md"
                  onClick={() => navigate(`/owner/venues/${venue.id}`)}
                >
                  <div className="relative">
                  <div
                    className="aspect-w-16 aspect-h-9 w-full overflow-hidden bg-gray-200 cursor-pointer"
                    onClick={(e) => {
                    e.stopPropagation();
                    if (venue.images.length > 0) {
                      openImageGallery(venue);
                    }
                    }}
                    >
                    <img
                    className="h-40 w-full object-cover"
                    src={
                      venue.images[0] ||
                      `https://placehold.co/600x400?text=${venue.name}`
                    }
                    alt={venue.name}
                    />
                    </div>

                    <div className="absolute top-2 right-2 flex space-x-1">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                          venue.status
                        )}`}
                      >
                        {venue.status.charAt(0).toUpperCase() +
                          venue.status.slice(1)}
                      </span>
                    </div>
                    {venue.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 rounded-full px-2 py-1 text-xs text-white">
                        {venue.images.length} photos
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {venue.name}
                      </h3>
                      <span className="text-sm font-medium text-gray-900">
                        {venue.capacity * venue.price_seat}so'm
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {venue.district_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {venue.capacity} guests
                      </div>
                    </div>

                    <div className="mt-4 flex items-center">
                      <div className="flex space-x-2 flex-col items-center">
                        <div className="flex items-center text-sm gap-1.5 text-gray-500">
                          
                        </div>
                        <div className="flex justify-end space-x-2 mt-2">
                          <Link
                            to={`/owner/my-venues/${venue.id}/edit`}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
                            title="Edit"
                            onClick={(e => e.stopPropagation())}
                          >
                            ✏️ Edit
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Image Gallery Modal */}
      {isImageModalOpen && selectedVenue && (
        <ImageModal
        isOpen={isImageModalOpen}
        selectedVenue={selectedVenue}
        onClose={() => setIsImageModalOpen(false)}
      />      
      )}
    </div>
  );
}
