"use client";

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SiteHeader } from "../../components/home/SiteHeader";
import { useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function VenueDetails() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [venue, setVenue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null)
  const [disabledDates, setDisabledDates] = useState([])

  const {venue_id} = useParams();
  // console.log(venue_id);
  
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/client/venues/${venue_id}`);        
        setVenue(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    };

    fetchVenue();
  }, []);

  useEffect(() => {
    const fetchDisabledDates = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/client/venues/${venue_id}/disabled-dates`);
        setDisabledDates(response.data);
      } catch (error) {
        console.error("Error fetching disabled dates:", error);
      }
    };

    fetchDisabledDates();
  }, [])
  

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
      

        {/* Gallery section */}
        <section className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-1 md:col-span-2 lg:col-span-2">
                <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={
                      venue?.image_url ||
                      `https://placehold.co/600x400?text=${venue?.name}`
                    }
                    alt={`${venue?.name} - Featured`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Venue? info section */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Main content */}
              <div className="lg:col-span-2">
                <h1 className="font-serif text-3xl font-medium text-gray-900 md:text-4xl">
                  {venue?.name}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1.5 h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {venue?.capacity} guests
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1.5 h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {venue?.district_name}
                  </div>
                
                  <div className="flex items-center text-sm font-medium text-rose-600">
                    <span>Narx: {venue?.capacity * venue?.price_seat}so'm</span>
                  </div>
                </div>                
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-medium text-gray-900">
                    Book this venue?
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Schedule a tour or reserve this venue? for your special day.
                  </p>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900">
                      Available dates
                    </h3>
                    {/* <div className="mt-2 grid grid-cols-3 gap-2">
                      {venue?.availableDates.slice(0, 6).map((date, index) => {
                        const formattedDate = new Date(date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        );
                        return (
                          <div
                            key={index}
                            className="flex h-10 items-center justify-center rounded-md border border-gray-200 text-sm hover:border-rose-500 hover:bg-rose-50"
                          >
                            {formattedDate}
                          </div>
                        );
                      })}
                    </div> */}
                    <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    excludeDates={[new Date(disabledDates)]}
                    inline
                    placeholderText="Bron qilinadigan kunni tanlang"
                    />

                    <button className="mt-2 text-sm font-medium text-rose-600 hover:text-rose-700">
                      View more dates
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    <button className="w-full rounded-md bg-rose-600 py-3 text-sm font-medium text-white hover:bg-rose-700 transition-colors">
                      Schedule a Tour
                    </button>
                    <button className="w-full rounded-md border border-rose-200 bg-rose-50 py-3 text-sm font-medium text-rose-600 hover:bg-rose-100 transition-colors">
                      Check Availability
                    </button>
                    <button className="w-full rounded-md border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Request Pricing
                    </button>
                  </div>

                  

                  
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
