"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FilterPanel from "../../components/admin/FilterPanel";
import SearchInput from "../../components/admin/SearchInput";
import ViewToggle from "../../components/admin/ViewToggle";
import VenueListRenderer from "../../components/admin/VenueListRenderer";
import ImageModal from "../../components/owner/ImageModal";

export default function AdminVenues() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sort, setSort] = useState("none");
  const [filter, setFilter] = useState("all");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [initialVenues, setInitialVenues] = useState([]);
  const [venues, setVenues] = useState([]);
  const [venueOwners, setVenueOwners] = useState({}); // venueId => ownerId
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/venue-owners"
        );
        setOwners(response.data.owners);
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    };
    fetchOwners();
  }, []);

  useEffect(() => {
    const initialOwners = {};
    venues?.forEach((venue) => {
      if (venue.owner_id) {
        initialOwners[venue.id] = venue.owner_id;
      }
    });
    setVenueOwners(initialOwners);
  }, [venues]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:4000/admin/venues?search=${searchQuery}`
        );
        console.log("Venues response:", response.data.data);
        if(response.data){
          setIsLoading(false);
          setInitialVenues(response.data.data);
          setVenues(response.data.data);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching venues:", error);
      }
    };
    fetchVenues();
  }, [searchQuery]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/get-districts");
        setDistricts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDistricts();
  }, []);

  // Get status badge color

  // Handle venue deletion
  const handleDeleteVenue = (venue_id, e) => {
    axios
      .delete(`http://localhost:4000/admin/delete-venue/${venue_id}`)
      .then((response) => {
        console.log(response.data);
        setVenues((prevVenues) =>
          prevVenues.filter((venue) => venue.id !== venue_id)
        );
      })
      .catch((error) => {
        console.error("Error deleting venue:", error);
      });
  };

  // Open image gallery modal
  const openImageGallery = (venue, _ = 0) => {
    setSelectedVenue(venue);
    setIsImageModalOpen(true);
  };

  useEffect(() => {
    if (!initialVenues || initialVenues.length === 0) return;
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

  const handleAssignOwner = (e, venue_id) => {
    console.log("Selected owner ID:", e.target.value);
    console.log("Selected venue ID:", venue_id);
    const selectedOwnerId = e.target.value;
    setVenueOwners((prev) => ({
      ...prev,
      [venue_id]: selectedOwnerId,
    }));
    axios
      .post(`http://localhost:4000/admin/assign-owner`, {
        venue_id: +venue_id,
        owner_id: +e.target.value,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error assigning owner:", error);
      });
  };
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        {/* Filters and search */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-white shadow rounded-lg p-4 mb-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:flex md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <SearchInput
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />

                <FilterPanel
                  filter={filter}
                  setFilter={setFilter}
                  selectedDistrict={selectedDistrict}
                  setSelectedDistrict={setSelectedDistrict}
                  sort={sort}
                  setSort={setSort}
                  districts={districts}
                />
              </div>

              <div className="mt-4 ms-2 flex justify-center items-center gap-2 md:mt-0">
                <span className="text-sm text-gray-500 ms-3">
                  Umumiy {venues?.length} ta to'yxona
                </span>
                <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
              </div>
            </div>
          </div>
        </div>

        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
          <VenueListRenderer
            venues={venues}
            viewMode={viewMode}
            owners={owners}
            isLoading={isloading}
            venueOwners={venueOwners}
            handleAssignOwner={handleAssignOwner}
            handleDeleteVenue={handleDeleteVenue}
            handleConfirim={handleConfirim}
            openImageGallery={openImageGallery}
            getStatusColor={getStatusColor}
            navigate={navigate}
          />
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
