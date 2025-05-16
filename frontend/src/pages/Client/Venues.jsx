"use client"

import React, { useEffect } from "react"
import { useState } from "react"
import { SiteHeader } from "../../components/home/SiteHeader"
import axios from "axios"

export default function Venues() {
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("none")
  const [districts, setDistricts] = useState([])

 
  const [initialVenues, setInitialVenues] = useState([])
  const [venues, setVenues] = useState([])

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("http://localhost:4000/client/venues") // Replace with your API endpoint
        if (response.status !== 200) {
          throw new Error("Failed to fetch venues")
        }
        setVenues(response.data.data)
        setInitialVenues(response.data.data)

      } catch (error) {
        console.error("Error fetching venues:", error)
      }
    }

    fetchVenues()
  }, [])

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/client/districts") // Replace with your API endpoint
        if (response.status !== 200) {
          throw new Error("Failed to fetch districts")
        }
        setDistricts(response.data.data)
      } catch (error) {
        console.error("Error fetching districts:", error)
      }
    }
    fetchDistricts()
  }, [])

  useEffect(() => {
    let filtered = [...initialVenues]
  
    // Filter
    if (filter !== "all") {
      filtered = filtered.filter((venue) => venue.district_name === filter)
    }
  
    // Sort
    if (sort === "price-low") {
      filtered.sort((a, b) => a.price_seat - b.price_seat)
    } else if (sort === "price-high") {
      filtered.sort((a, b) => b.price_seat - a.price_seat)
    } else if (sort === "capacity-low") {
      filtered.sort((a, b) => a.capacity - b.capacity)
    } else if (sort === "capacity-high") {
      filtered.sort((a, b) => b.capacity - a.capacity)
    }
  
    setVenues(filtered)
  }, [filter, sort, initialVenues])
  
  
  
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative">
          <div className="absolute inset-0 bg-[url('https://www.bellacollina.com/hubfs/Events/Events%20-%20Real%20Weddings/Bella%20Collina%20Grand%20Lawn%20Wedding%20Venue%20-%20Copy-2-1.jpg')] bg-cover bg-center bg-no-repeat opacity-90">
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex min-h-[300px] flex-col items-center justify-center py-16 text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-light tracking-tight md:text-5xl">
              Our <span className="font-medium italic">Wedding Venues</span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-white/90">Discover the perfect setting for your special day</p>
          </div>
        </section>

        {/* Filter and sort section */}
        <section className="py-8 border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by district
                  </label>
                  <select
                    id="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                  >
                    <option value="all">All Districts</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                    Sort by
                  </label>
                  <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                  >
                    <option value="popular">All</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="capacity-low">Capacity: Low to High</option>
                    <option value="capacity-high">Capacity: High to Low</option>
                  </select>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Showing {venues.length} of {venues.length} venues
              </p>
            </div>
          </div>
        </section>

        {/* Venues grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {venues.length === 0 && (
                <div className="col-span-full text-center">
                  <p className="text-lg text-gray-500">Venues not found</p>
                </div>
              )}
              {venues?.map((venue) => (
                <div
                  key={venue.id}
                  className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden bg-gray-200">
                    <img
                      src={venue.image_url || `https://placehold.co/600x400?text=${venue.name}`}
                      alt={venue.name}
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl font-medium text-gray-900">{venue.name}</h3>
                      <span className="text-sm font-medium text-gray-900">{venue.price_seat * venue.capacity}so'm</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
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
                        {venue.capacity} guests
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
                        {venue.district_name}
                      </div>
                    </div>
                    <button className="mt-4 w-full rounded-md bg-rose-50 py-2 text-sm font-medium text-rose-600 hover:bg-rose-100 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-rose-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-medium text-gray-900">Can't find what you're looking for?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Contact our wedding specialists for personalized venue recommendations
            </p>
            <button className="mt-8 inline-flex items-center justify-center rounded-md bg-rose-600 px-6 py-3 font-medium text-white hover:bg-rose-700 transition-colors">
              Schedule a Consultation
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
