import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import VenueDetail from "../../components/client/VenueDetail";
import BookingForm from "../../components/client/BookingForm";

export default function VenueDetails() {
  const [venue, setVenue] = useState(null);
  const { venue_id } = useParams();

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/client/venues/${venue_id}`
        );
        setVenue(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    };

    fetchVenue();
  }, [venue_id]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <VenueDetail venue={venue} />
        <BookingForm />
      </main>
    </div>
  );
}
