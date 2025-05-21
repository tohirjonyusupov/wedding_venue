"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MyVenues() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sort, setSort] = useState("none");
  const [filter, setFilter] = useState("all");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [initialVenues, setInitialVenues] = useState([]);
  const [venues, setVenues] = useState([]);
  const [venueOwners, setVenueOwners] = useState({}); // venueId => ownerId
  const navigate = useNavigate();

  
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/venue-owners"
        );
        setOwners(response.data.owners);
      }
      catch (error) {
        console.error("Error fetching owners:", error);
      }
    };
    fetchOwners();
  }
  , []);

  useEffect(() => {
    const initialOwners = {};
    venues.forEach((venue) => {
      if (venue.owner_id) {
        initialOwners[venue.id] = venue.owner_id;
      }
    });
    setVenueOwners(initialOwners);
  }, [venues]);
  

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/owner/venues/2`
        );
        setInitialVenues(response.data.data);
        setVenues(response.data.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };
    fetchVenues();
  }, [searchQuery]);

  

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
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  // Navigate to next image
  const nextImage = () => {
    if (selectedVenue) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % selectedVenue.images.length
      );
    }
  };

  // Navigate to previous image
  const prevImage = () => {
    if (selectedVenue) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + selectedVenue.images.length) %
          selectedVenue.images.length
      );
    }
  };

  useEffect(() => {
    let filtered = [...initialVenues];

    // Filter
    if (filter !== "all") {
      filtered = filtered.filter((venue) => venue.status === filter);
    }

    if (selectedDistrict !== "all") {
      filtered = filtered.filter(
        (venue) => venue.district_name === selectedDistrict
      );
    }

    // Sort
    if (sort === "price-low") {
      filtered.sort((a, b) => a.price_seat - b.price_seat);
    } else if (sort === "price-high") {
      filtered.sort((a, b) => b.price_seat - a.price_seat);
    } else if (sort === "capacity-low") {
      filtered.sort((a, b) => a.capacity - b.capacity);
    } else if (sort === "capacity-high") {
      filtered.sort((a, b) => b.capacity - a.capacity);
    }

    setVenues(filtered);
  }, [filter, sort, selectedDistrict, initialVenues]);

  const handleConfirim = (venue_id) => {
    console.log(venue_id);

    axios
      .post(`http://localhost:4000/admin/confirm-venue/${venue_id}`)
      .then((response) => {
        console.log(response.data);
        setVenues((prevVenues) =>
          prevVenues.map((venue) =>
            venue.id === venue_id ? { ...venue, status: "tasdiqlangan" } : venue
          )
        );
      })
      .catch((error) => {
        console.error("Error confirming venue:", error);
      });
  };

  const handleAssignOwner = (e, venue_id) => {
    console.log("Selected owner ID:", e.target.value);
    console.log("Selected venue ID:", venue_id);
    const selectedOwnerId = e.target.value;
  setVenueOwners((prev) => ({
    ...prev,
    [venue_id]: selectedOwnerId,
  }));
    axios.post(`http://localhost:4000/admin/assign-owner`, {
      venue_id: +venue_id,
      owner_id: +e.target.value,
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error("Error assigning owner:", error);
    });
  }
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

        {/* Filters and search */}
        

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
                  onClick={() => navigate(`/admin/venues/${venue.id}`)}
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
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {selectedVenue.name} - Images
                    </h3>
                    <div className="mt-4">
                      <div className="relative">
                        <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-gray-200">
                          <img
                            src={
                              selectedVenue.images[currentImageIndex] ||
                              `/placeholder.svg?height=600&width=1200&text=${
                                selectedVenue.name || "/placeholder.svg"
                              }`
                            }
                            alt={`${selectedVenue.name} - Image ${
                              currentImageIndex + 1
                            }`}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        {selectedVenue.images.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-gray-800 shadow-md hover:bg-gray-100"
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-gray-800 shadow-md hover:bg-gray-100"
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                      <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                        {selectedVenue.images.map((image, index) => (
                          <div
                            key={index}
                            className={`relative h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded-md ${
                              index === currentImageIndex
                                ? "ring-2 ring-rose-500"
                                : "ring-1 ring-gray-200"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          >
                            <img
                              src={
                                image ||
                                `/placeholder.svg?height=64&width=64&text=${
                                  index + 1
                                }`
                              }
                              alt={`${selectedVenue.name} - Thumbnail ${
                                index + 1
                              }`}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Image {currentImageIndex + 1} of{" "}
                        {selectedVenue.images.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
