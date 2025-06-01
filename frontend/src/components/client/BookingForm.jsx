import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BookingForm() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { venue_id } = useParams();
  const [disabledDates, setDisabledDates] = useState([]);
  const [booking, setBooking] = useState({
    peopleCount: "",
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    phone: user?.phone || "",
    selectedDate: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.warning("Iltimos, tizimga kiring.");
      return;
    }

    if (!booking.selectedDate) {
      toast.warning("Iltimos, bron qilish uchun sanani tanlang.");
      return;
    }

    if (
      !booking.peopleCount ||
      !booking.firstname ||
      !booking.lastname ||
      !booking.phone
    ) {
      toast.warning("Iltimos, barcha maydonlarni to‘ldiring.");
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
      if (response.data.success) {
        toast.success("Bron muvaffaqiyatli amalga oshirildi!");
        setBooking({
          peopleCount: "",
          firstname: user?.firstname || "",
          lastname: user?.lastname || "",
          phone: user?.phone || "",
          selectedDate: null,
        });        
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Bron qilishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
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
  return (
    <section className="w-full lg:w-1/3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-md border border-rose-100 text-center"
      >
        <h3 className="text-lg font-semibold text-gray-800">Mavjud sanalar</h3>
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
          className="w-full rounded-lg border-rose-200 bg-rose-50 text-gray-800"
          renderDayContents={(day, date) => {
            const isDisabled = disabledDates.some(
              (disabled) => disabled.toDateString() === date.toDateString()
            );
            return (
              <div
                className={`w-full rounded-md ${
                  isDisabled ? "bg-red-400 text-gray-700" : ""
                }`}
                title={isDisabled ? "Bu kun band qilingan" : ""}
              >
                {day}
              </div>
            );
          }}
        />

        <form className="mt-6 space-y-4 text-start" onSubmit={handleSubmit}>
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
            onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
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
  );
}

export default BookingForm;
