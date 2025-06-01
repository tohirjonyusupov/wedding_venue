"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import VenueCard from "../../components/client/VenueCard";
import { toast } from "react-toastify";

export default function Venues() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("none");
  const [districts, setDistricts] = useState([]);
  const [initialVenues, setInitialVenues] = useState([]);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("http://localhost:4000/client/venues");
        if (response.status !== 200) {
          throw new Error("Failed to fetch venues");
        }
        setVenues(response.data.data);
        setInitialVenues(response.data.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/client/districts");
        if (response.status !== 200) {
          throw new Error("Failed to fetch districts");
        }
        setDistricts(response.data.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    let filtered = [...initialVenues];

    if (filter !== "all") {
      filtered = filtered.filter((venue) => venue.district_name === filter);
    }

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
  }, [filter, sort, initialVenues]);
  // const toastId = toast.loading("To'yxonalar yuklanmoqda...");

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 bg-[url('https://www.bellacollina.com/hubfs/Events/Events%20-%20Real%20Weddings/Bella%20Collina%20Grand%20Lawn%20Wedding%20Venue%20-%20Copy-2-1.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex min-h-[calc(90vh)] flex-col items-center justify-center py-20 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            >
              To‘yxonalarimizni <span className="italic text-rose-300">Kashf Eting</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 max-w-2xl text-lg text-gray-200"
            >
              Maxsus kuningiz uchun eng muhtasham joyni toping
            </motion.p>
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-48">
                  <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Tumanga ko‘ra filtr
                  </label>
                  <select
                    id="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="block w-full rounded-lg border border-rose-200 bg-rose-50 text-gray-800 focus:ring-2 focus:ring-rose-400 focus:border-transparent p-2.5 text-sm transition-all"
                  >
                    <option value="all">Barcha Tumanlar</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full sm:w-48">
                  <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                    Saralash
                  </label>
                  <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="block w-full rounded-lg border border-rose-200 bg-rose-50 text-gray-800 focus:ring-2 focus:ring-rose-400 focus:border-transparent p-2.5 text-sm transition-all"
                  >
                    <option value="none">Barchasi</option>
                    <option value="price-low">Narx: Pastdan Yuqoriga</option>
                    <option value="price-high">Narx: Yuqoridan Pastga</option>
                    <option value="capacity-low">Sig‘im: Pastdan Yuqoriga</option>
                    <option value="capacity-high">Sig‘im: Yuqoridan Pastga</option>
                  </select>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {venues.length} ta to‘yxona ko‘rsatilmoqda
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {venues.length === 0 && (
                <div className="col-span-full text-center">
                  <p className="text-lg text-gray-500">To‘yxonalar topilmadi</p>
                </div>
              )}
              {venues.map((venue) => (
                <VenueCard venue={venue} key={venue.id} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}