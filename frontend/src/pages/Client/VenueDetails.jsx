"use client";

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VenueImageCarousel from "../../components/client/VenueImageCarousel";

export default function VenueDetails() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [booking, setBooking] = useState({
    peopleCount: "",
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    phone: user?.phone || "",
    selectedDate: null,
  });
  const [venue, setVenue] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
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

  useEffect(() => {
    const fetchDisabledDates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/client/venues/${venue_id}/disabled-dates`
        );
        setDisabledDates(response.data.data.map((date) => new Date(date)));
      } catch (error) {
        console.error("Error fetching disabled dates:", error);
      }
    };

    fetchDisabledDates();
  }, [venue_id]);

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

    if (
      !booking.peopleCount ||
      !booking.firstname ||
      !booking.lastname ||
      !booking.phone
    ) {
      alert("Iltimos, barcha maydonlarni to‘ldiring.");
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
      const response = await axios.post(
        `http://localhost:4000/client/bookings`,
        bookingData
      );
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
      alert(
        "Bronni tugallash uchun avval tizimga kiring yoki ro‘yxatdan o‘ting."
      );
      const returnUrl = encodeURIComponent(window.location.pathname);
      window.location.href = `/login?returnUrl=${returnUrl}`;
    } else {
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Chap tomondagi bo'lim — Venue tafsilotlari */}
        <section className="w-full lg:w-2/3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 gap-4"
          >
            {/* Carousel yoki bitta rasm */}
            {venue?.images.length > 1 ? (
              <VenueImageCarousel
                images={venue.images}
                venueName={venue.name}
              />
            ) : (
              <img
                src={venue?.images[0]}
                alt={venue?.name}
                className="w-full h-[400px] object-cover rounded-xl"
              />
            )}
          </motion.div>

          {/* Venue ma’lumotlari */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6"
          >
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800">
              {venue?.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1.5 h-4 w-4 text-rose-400"
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
                    {venue?.capacity} mehmon
                  </div>
              <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1.5 h-4 w-4 text-rose-400"
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
              <div className="flex items-center font-medium text-rose-600">
                Narx: {(venue?.capacity * venue?.price_seat).toLocaleString()}{" "}
                so‘m
              </div>
            </div>
          </motion.div>
        </section>

        {/* O'ng tomondagi bo'lim — Bron qilish formasi */}
        <section className="w-full lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md border border-rose-100 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Mavjud sanalar
            </h3>
            <p className="mt-1 mb-4 text-sm text-gray-600">
              Bron qilish uchun sanani tanlang
            </p>

            <DatePicker
              selected={
                booking.selectedDate ? new Date(booking.selectedDate) : null
              }
              onChange={(date) =>
                setBooking({
                  ...booking,
                  selectedDate: date.toISOString().split("T")[0],
                })
              }
              minDate={new Date()}
              excludeDates={disabledDates}
              inline
              placeholderText="Bron qilinadigan kunni tanlang"
              className="w-full rounded-lg border border-rose-200 bg-rose-50 text-gray-800"
              renderDayContents={(day, date) => {
                const isDisabled = disabledDates.some(
                  (disabled) => disabled.toDateString() === date.toDateString()
                );
                return (
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      isDisabled ? "bg-red-300 text-white" : ""
                    }`}
                    title={isDisabled ? "Bu kun band qilingan" : ""}
                  >
                    {day}
                  </div>
                );
              }}
            />

            <form className="mt-6 space-y-4 text-start" onSubmit={handleSubmit}>
              {/* Inputlar */}
              <input
                type="number"
                name="peopleCount"
                value={booking.peopleCount}
                onChange={(e) =>
                  setBooking({ ...booking, peopleCount: e.target.value })
                }
                className="w-full rounded-lg border border-rose-200 bg-rose-50 text-gray-800 p-2.5 text-sm"
                placeholder="Mehmonlar soni"
                required
              />
              <input
                type="text"
                name="firstname"
                value={booking.firstname}
                onChange={(e) =>
                  setBooking({ ...booking, firstname: e.target.value })
                }
                className="w-full rounded-lg border border-rose-200 bg-rose-50 text-gray-800 p-2.5 text-sm"
                placeholder="Ismingiz"
                required
              />
              <input
                type="text"
                name="lastname"
                value={booking.lastname}
                onChange={(e) =>
                  setBooking({ ...booking, lastname: e.target.value })
                }
                className="w-full rounded-lg border border-rose-200 bg-rose-50 text-gray-800 p-2.5 text-sm"
                placeholder="Familiyangiz"
                required
              />
              <input
                type="tel"
                name="phone"
                value={booking.phone}
                onChange={(e) =>
                  setBooking({ ...booking, phone: e.target.value })
                }
                className="w-full rounded-lg border border-rose-200 bg-rose-50 text-gray-800 p-2.5 text-sm"
                placeholder="Telefon raqamingiz"
                required
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                onClick={(e) => handleBookingClick(e)}
                className="w-full rounded-lg bg-rose-600 py-3 text-sm font-semibold text-white hover:bg-rose-700 transition-all duration-300"
              >
                Bron Qilish
              </motion.button>
            </form>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
