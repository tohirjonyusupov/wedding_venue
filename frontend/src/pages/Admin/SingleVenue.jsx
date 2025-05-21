"use client";

import axios from "axios";
import React, { use, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Link, useParams } from "react-router-dom";

export default function SingleVenue() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const { venue_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    const fetchVenue = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/admin/venues/${venue_id}`
        );
        setVenue(response.data.venue);
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching venue:", error);
      } finally {
        setLoading(false); // Har qanday holatda loading ni to‘xtatadi
      }
    };
    fetchVenue();
  }, [venue_id]);

  // Sample venue? data
  // const venue? = {
  //   id: 1,
  //   name: "Murod To'yxonasi",
  //   description:
  //     "Shahar markazida joylashgan hashamatli to'yxona. Zamonaviy jihozlar va go'zal dizayn bilan jihozlangan.",
  //   longDescription:
  //     "Murod To'yxonasi - bu sizning eng muhim kunlaringiz uchun mukammal joy. Bizning to'yxonamiz shahar markazida joylashgan bo'lib, zamonaviy jihozlar va go'zal dizayn bilan jihozlangan.\n\nBizning to'yxonamiz 50 dan 300 gacha mehmonlarni qabul qila oladi. Biz har qanday marosim uchun turli xil paketlarni taklif etamiz. Bizning professional jamoamiz sizning har qanday istakingizni amalga oshirishga tayyor.\n\nTo'yxonamizda zamonaviy ovoz va yorug'lik tizimlari, konditsionerlar, keng avtoturargoh, va boshqa qulayliklar mavjud. Siz va sizning mehmonlaringiz uchun eng yaxshi xizmatni ko'rsatishga tayyormiz.",
  //   capacity: "50-300",
  //   priceRange: "$$$",
  //   location: "Toshkent, Yunusobod tumani, 4-mavze",
  //   type: "indoor",
  //   popular: true,
  //   features: [
  //     "Zamonaviy ovoz tizimi",
  //     "Yorug'lik tizimlari",
  //     "Keng avtoturargoh",
  //     "Konditsionerlar",
  //     "Kelin-kuyov xonasi",
  //     "Professional xizmat ko'rsatuvchi xodimlar",
  //     "Wi-Fi",
  //     "Videoproektor",
  //     "Bolalar o'yin maydoni",
  //     "Maxsus bezatish xizmati",
  //   ],
  //   packages: [
  //     {
  //       name: "Standart Paket",
  //       price: "15,000,000 so'm",
  //       includes: ["Zal ijarasi (6 soat)", "Asosiy bezatish", "Stol va stullar", "Ovoz tizimi", "Avtoturargoh"],
  //     },
  //     {
  //       name: "Premium Paket",
  //       price: "25,000,000 so'm",
  //       includes: [
  //         "Zal ijarasi (8 soat)",
  //         "To'liq bezatish",
  //         "Stol va stullar",
  //         "Ovoz va yorug'lik tizimlari",
  //         "Foto va video xizmati",
  //         "Avtoturargoh",
  //         "Kelin-kuyov xonasi",
  //       ],
  //     },
  //     {
  //       name: "VIP Paket",
  //       price: "40,000,000 so'm",
  //       includes: [
  //         "Zal ijarasi (10 soat)",
  //         "Premium bezatish",
  //         "Stol va stullar",
  //         "Professional ovoz va yorug'lik tizimlari",
  //         "Professional foto va video xizmati",
  //         "Avtoturargoh",
  //         "Kelin-kuyov xonasi",
  //         "Maxsus efektlar",
  //         "Mehmonlar uchun qo'shimcha xizmatlar",
  //       ],
  //     },
  //   ],
  //   faqs: [
  //     {
  //       question: "To'yxona necha kishini sig'dira oladi?",
  //       answer:
  //         "Bizning to'yxonamiz 50 dan 300 gacha mehmonlarni qabul qila oladi, bu sizning tadbiringiz turiga va stol joylashuviga bog'liq.",
  //     },
  //     {
  //       question: "O'z ovqatlarimizni olib kelishimiz mumkinmi?",
  //       answer:
  //         "Ha, siz o'z ovqatlaringizni olib kelishingiz mumkin. Biz shuningdek, professional oshpazlar bilan hamkorlik qilamiz va ular sizga turli xil menyu variantlarini taklif qilishlari mumkin.",
  //     },
  //     {
  //       question: "Avtoturargoh bormi?",
  //       answer: "Ha, bizning to'yxonamizda 100 dan ortiq avtomobillar uchun bepul avtoturargoh mavjud.",
  //     },
  //     {
  //       question: "Oldindan qancha to'lov qilish kerak?",
  //       answer:
  //         "Sanani band qilish uchun umumiy summaning 30% miqdorida oldindan to'lov talab qilinadi. Qolgan summa tadbirdan 1 hafta oldin to'lanishi kerak.",
  //     },
  //     {
  //       question: "Bekor qilish siyosati qanday?",
  //       answer:
  //         "Tadbirdan 30 kun oldin bekor qilsangiz, oldindan to'lovning 50% qaytariladi. 30 kundan kam vaqt qolgan bo'lsa, oldindan to'lov qaytarilmaydi.",
  //     },
  //   ],
  //   images: [
  //     "/images/venue1-main.jpg",
  //     "/images/venue1-garden.jpg",
  //     "/images/venue1-interior.jpg",
  //     "/images/venue1-night.jpg",
  //     "/images/venue1-setup.jpg",
  //     "/images/venue1-detail.jpg",
  //   ],
  //   floorPlan: "/images/venue1-floorplan.jpg",
  //   virtualTour: "https://example.com/virtual-tour",
  //   availableDates: ["2023-06-15", "2023-06-22", "2023-07-08", "2023-07-15", "2023-08-05", "2023-08-19"],
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {loading && (
          <div className="flex items-center justify-center h-screen">
            <svg
              className="animate-spin h-10 w-10 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
        )}
        {showAllPhotos ? (
          <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
            <div className="p-4 flex justify-between items-center border-b sticky top-0 bg-white z-10">
              <h3 className="text-xl font-medium">
                {venue?.name} - Barcha rasmlar
              </h3>
              <button
                onClick={() => setShowAllPhotos(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {venue?.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-gray-200"
                >
                  <img
                    src={
                      image ||
                      `/placeholder.svg?height=600&width=1200&text=Rasm ${
                        index + 1
                      }`
                    }
                    alt={`${venue?.name} - Rasm ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Gallery section */}
            <section className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="col-span-1 md:col-span-2 lg:col-span-2">
                    <div className="relative aspect-w-16 h-100 overflow-hidden rounded-lg bg-gray-200">
                      <img
                        src={
                          venue?.images[activeImageIndex] ||
                          `/placeholder.svg?height=600&width=1200&text=Asosiy rasm`
                        }
                        alt={`${venue?.name} - Asosiy`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 grid grid-cols-2 gap-4">
                    {venue?.images.slice(0, 4).map((image, index) => (
                      <div
                        key={index}
                        className={`relative aspect-w-1 h-30 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 cursor-pointer ${
                          index === activeImageIndex
                            ? "ring-2 ring-rose-500"
                            : ""
                        }`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img
                          src={
                            image ||
                            `/placeholder.svg?height=300&width=300&text=Rasm ${
                              index + 1
                            }`
                          }
                          alt={`${venue?.name} - Galereya ${index + 1}`}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShowAllPhotos(true)}
                    className="text-sm font-medium text-rose-600 hover:text-rose-700"
                  >
                    Barcha rasmlarni ko'rish ({venue?.images.length})
                  </button>
                </div>
              </div>
            </section>

            {/* Venue info section */}
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
                        {venue?.capacity} mehmon
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
                        <span>{venue?.capacity * venue?.price_seat}so'm</span>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                      <h2 className="text-lg font-medium text-gray-900 text-center">
                        Band qilingan kunlar
                      </h2>
                      <div className="mt-6 text-center">
                        <DatePicker
                          inline
                          minDate={new Date()}
                          renderDayContents={(day, date) => {
                            const booking = bookings.find(
                              (b) =>
                                new Date(b.reservation_date).toDateString() ===
                                date.toDateString()
                            );

                            return (
                              <div
                                title={
                                  booking
                                    ? `${booking.firstname} tomonidan, ${booking.guest_count} odamga bron qilingan`
                                    : ""
                                }
                                className={
                                  booking ? "bg-red-200 rounded-md" : ""
                                }
                              >
                                {day}
                              </div>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
