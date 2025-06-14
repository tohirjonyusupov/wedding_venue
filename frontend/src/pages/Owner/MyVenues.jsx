"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import NotFound from "../../components/owner/NotFound";
import Header from "./Header";
import VenueCard from "./VenueCard";
import CustomLoader from "../../components/loader/CustomLoader";

export default function MyVenues() {
  const [venues, setVenues] = useState(null);
  const { id } = JSON.parse(localStorage.getItem("user")) || {};

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

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        <Header />

        {/* Loader: venues hali yuklanayotgan bo‘lsa */}
        {venues === null && <CustomLoader size="xl" className="mt-50"/>}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
          {/* venues yuklangan, lekin bo‘sh bo‘lsa */}
          {venues?.length === 0 ? (
            <NotFound />
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 cursor-pointer">
              {venues?.map((venue) => (
                <VenueCard venue={venue} key={venue.id} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
