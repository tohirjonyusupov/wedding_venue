"use client";

import React, { use, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SiteHeader } from "../../components/home/SiteHeader";
import { useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function VenueDetails() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [booking, setBooking] = useState({
    peopleCount: '',
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    phone: user?.phone || '',
    selectedDate: null
  });
  const [venue, setVenue] = useState(null);
  const [disabledDates, setDisabledDates] = useState([])
  const {venue_id} = useParams();
  
  
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
        setDisabledDates(response.data.data.map(date => new Date(date)));
      } catch (error) {
        console.error("Error fetching disabled dates:", error);
      }
    };

    fetchDisabledDates();
  }, [])
  

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user?.id) {
    alert("Iltimos, tizimga kiring.");
    return;
  }

  if (!booking.selectedDate) {
    alert("Iltimos, bron qilish uchun sanani tanlang.");
    return;
  }

  if (!booking.peopleCount || !booking.firstname || !booking.lastname || !booking.phone) {
    alert("Iltimos, barcha maydonlarni to'ldiring.");
    return;
  }

  const bookingData = {
    ...booking,
    venue_id: venue_id,
    reservation_date: booking.selectedDate,
    guest_count: booking.peopleCount,
    user_id: user.id,
  };

  try {
    const response = await axios.post(`http://localhost:4000/client/bookings`, bookingData);
    alert("Bron muvaffaqiyatli amalga oshirildi!");
    console.log("Booking successful:", response.data);
  } catch (error) {
    console.error("Error creating booking:", error);
    alert("Bron qilishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
  }
};


  const handleBookingClick = (e) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Bronni tugallash uchun avval tizimga kiring yoki ro'yxatdan o'ting.");
      // current page URL ni encode qilib yuboramiz
      const returnUrl = encodeURIComponent(window.location.pathname);
      window.location.href = `/login?returnUrl=${returnUrl}`;
    } else {
      handleSubmit(e);
    }
  };
  
  
  

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
      

        {/* Gallery section */}
        <section className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-1 md:col-span-2 lg:col-span-2">
                <div className="relative overflow-hidden rounded-lg bg-gray-200">
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
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mt-6 mx-auto text-center max-w-xs">
                    <h3 className="text-sm font-medium text-gray-900">
                      Available dates
                    </h3>
                    <p className="mt-1 mb-2 text-sm text-gray-600">
                      Select a date to check availability.
                    </p>
                    <DatePicker
                    selected={booking.selectedDate}
                    onChange={(date) => {
                      setBooking({ ...booking, selectedDate: date.toISOString().split('T')[0] });
                    }}
                    minDate={new Date()}
                    excludeDates={disabledDates.map(dateString => new Date(dateString))}
                    inline
                    placeholderText="Bron qilinadigan kunni tanlang"
                    />
                  </div>
                  <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mt-4">
                      <label
                        htmlFor="peopleCount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        People Count
                      </label>
                      <input
                        type="number"
                        id="peopleCount"
                        name="peopleCount"
                        value={booking.peopleCount}
                        onChange={(e) =>
                          setBooking({ ...booking, peopleCount: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                      />
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="firstname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Firstname
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={booking.firstname}
                        onChange={(e) =>
                          setBooking({ ...booking, firstname: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="lastname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Lastname
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={booking.lastname}
                        onChange={(e) =>
                          setBooking({ ...booking, lastname: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                      />
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={booking.phone}
                        onChange={(e) =>
                          setBooking({ ...booking, phone: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                      />
                    </div>
                  </form>
                  <div className="mt-6 space-y-4">
                    <button className="w-full rounded-md bg-rose-600 py-3 text-sm font-medium text-white hover:bg-rose-700 transition-colors" onClick={(e) => handleBookingClick(e)}>
                      Booking
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
