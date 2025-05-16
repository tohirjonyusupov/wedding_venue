"use client"

import React, { useEffect } from "react"
import { useState } from "react"
import { SiteHeader } from "../../components/home/SiteHeader"
import axios from "axios"

export default function Venues() {
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("popular")

  // Sample venue data
  // const venues = [
  //   {
  //     id: 1,
  //     name: "Crystal Garden Palace",
  //     description: "An elegant glass-enclosed venue surrounded by lush gardens and fountains.",
  //     capacity: "50-200",
  //     priceRange: "$$$",
  //     location: "City Center",
  //     type: "indoor",
  //     popular: true,
  //     image: "/images/venue1.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Sunset Beach Resort",
  //     description: "A breathtaking beachfront venue with panoramic ocean views and golden sands.",
  //     capacity: "50-150",
  //     priceRange: "$$$$",
  //     location: "Coastal",
  //     type: "outdoor",
  //     popular: true,
  //     image: "/images/venue2.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Historic Mansion",
  //     description: "A grand historic estate with classic architecture and manicured gardens.",
  //     capacity: "80-250",
  //     priceRange: "$$$$",
  //     location: "Countryside",
  //     type: "indoor",
  //     popular: false,
  //     image: "/images/venue3.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "Vineyard Estate",
  //     description: "A rustic-elegant venue set among rolling hills and scenic vineyards.",
  //     capacity: "60-180",
  //     priceRange: "$$$",
  //     location: "Countryside",
  //     type: "outdoor",
  //     popular: true,
  //     image: "/images/venue4.jpg",
  //   },
  //   {
  //     id: 5,
  //     name: "Modern Loft",
  //     description: "A contemporary urban space with industrial charm and city skyline views.",
  //     capacity: "40-120",
  //     priceRange: "$$",
  //     location: "City Center",
  //     type: "indoor",
  //     popular: false,
  //     image: "/images/venue5.jpg",
  //   },
  //   {
  //     id: 6,
  //     name: "Mountain Lodge",
  //     description: "A cozy yet spacious retreat with stunning mountain vistas and natural beauty.",
  //     capacity: "50-150",
  //     priceRange: "$$$",
  //     location: "Mountains",
  //     type: "indoor",
  //     popular: false,
  //     image: "/images/venue6.jpg",
  //   },
  //   {
  //     id: 7,
  //     name: "Royal Ballroom",
  //     description: "An opulent ballroom with crystal chandeliers and grand staircases.",
  //     capacity: "100-400",
  //     priceRange: "$$$$$",
  //     location: "City Center",
  //     type: "indoor",
  //     popular: true,
  //     image: "/images/venue7.jpg",
  //   },
  //   {
  //     id: 8,
  //     name: "Botanical Gardens",
  //     description: "A serene garden setting with exotic flowers and tranquil water features.",
  //     capacity: "60-200",
  //     priceRange: "$$$",
  //     location: "Countryside",
  //     type: "outdoor",
  //     popular: true,
  //     image: "/images/venue8.jpg",
  //   },
  // ]
  const [venues, setVenues] = useState([])

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("http://localhost:4000/client/venues") // Replace with your API endpoint
        if (response.status !== 200) {
          throw new Error("Failed to fetch venues")
        }
        setVenues(response.data.data)
      } catch (error) {
        console.error("Error fetching venues:", error)
      }
    }

    fetchVenues()
  }, [])
  console.log(venues);
  
  
  // Filter venues based on selected filter
  // const filteredVenues = venues.filter((venue) => {
  //   if (filter === "all") return true
  //   return venue.type === filter
  // })

  // Sort venues based on selected sort option
  // const sortedVenues = [...filteredVenues].sort((a, b) => {
  //   if (sort === "popular") {
  //     return a.popular === b.popular ? 0 : a.popular ? -1 : 1
  //   } else if (sort === "price-low") {
  //     return a.priceRange.length - b.priceRange.length
  //   } else if (sort === "price-high") {
  //     return b.priceRange.length - a.priceRange.length
  //   } else if (sort === "capacity") {
  //     return Number.parseInt(b.capacity.split("-")[1]) - Number.parseInt(a.capacity.split("-")[1])
  //   }
  //   return 0
  // })

  // return (
  //   <div className="flex min-h-screen flex-col">
  //     <SiteHeader />
  //     <main className="flex-1">
  //       {/* Hero section */}
  //       <section className="relative">
  //         <div className="absolute inset-0 bg-[url('https://www.bellacollina.com/hubfs/Events/Events%20-%20Real%20Weddings/Bella%20Collina%20Grand%20Lawn%20Wedding%20Venue%20-%20Copy-2-1.jpg')] bg-cover bg-center bg-no-repeat opacity-90">
  //           <div className="absolute inset-0 bg-black/40"></div>
  //         </div>
  //         <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex min-h-[300px] flex-col items-center justify-center py-16 text-center text-white">
  //           <h1 className="mb-4 font-serif text-4xl font-light tracking-tight md:text-5xl">
  //             Our <span className="font-medium italic">Wedding Venues</span>
  //           </h1>
  //           <p className="mb-8 max-w-2xl text-lg text-white/90">Discover the perfect setting for your special day</p>
  //         </div>
  //       </section>

  //       {/* Filter and sort section */}
  //       <section className="py-8 border-b">
  //         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  //             <div className="flex flex-col sm:flex-row gap-4">
  //               <div>
  //                 <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
  //                   Filter by Type
  //                 </label>
  //                 <select
  //                   id="filter"
  //                   value={filter}
  //                   onChange={(e) => setFilter(e.target.value)}
  //                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
  //                 >
  //                   <option value="all">All Venues</option>
  //                   <option value="indoor">Indoor</option>
  //                   <option value="outdoor">Outdoor</option>
  //                 </select>
  //               </div>
  //               <div>
  //                 <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
  //                   Sort by
  //                 </label>
  //                 <select
  //                   id="sort"
  //                   value={sort}
  //                   onChange={(e) => setSort(e.target.value)}
  //                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
  //                 >
  //                   <option value="popular">Most Popular</option>
  //                   <option value="price-low">Price: Low to High</option>
  //                   <option value="price-high">Price: High to Low</option>
  //                   <option value="capacity">Capacity</option>
  //                 </select>
  //               </div>
  //             </div>
  //             <p className="text-sm text-gray-500">
  //               Showing {sortedVenues.length} of {venues.length} venues
  //             </p>
  //           </div>
  //         </div>
  //       </section>

  //       {/* Venues grid */}
  //       <section className="py-12">
  //         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  //           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  //             {sortedVenues.map((venue) => (
  //               <div
  //                 key={venue.id}
  //                 className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
  //               >
  //                 <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden bg-gray-200">
  //                   <img
  //                     src={venue.image || `/placeholder.svg?height=400&width=600`}
  //                     alt={venue.name}
  //                     className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
  //                   />
  //                 </div>
  //                 <div className="p-6">
  //                   <div className="flex items-center justify-between">
  //                     <h3 className="font-serif text-xl font-medium text-gray-900">{venue.name}</h3>
  //                     <span className="text-sm font-medium text-gray-900">{venue.priceRange}</span>
  //                   </div>
  //                   <p className="mt-2 text-sm text-gray-500 line-clamp-2">{venue.description}</p>
  //                   <div className="mt-4 flex items-center justify-between">
  //                     <div className="flex items-center text-sm text-gray-500">
  //                       <svg
  //                         xmlns="http://www.w3.org/2000/svg"
  //                         className="mr-1.5 h-4 w-4 text-gray-400"
  //                         fill="none"
  //                         viewBox="0 0 24 24"
  //                         stroke="currentColor"
  //                       >
  //                         <path
  //                           strokeLinecap="round"
  //                           strokeLinejoin="round"
  //                           strokeWidth={2}
  //                           d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  //                         />
  //                       </svg>
  //                       {venue.capacity} guests
  //                     </div>
  //                     <div className="flex items-center text-sm text-gray-500">
  //                       <svg
  //                         xmlns="http://www.w3.org/2000/svg"
  //                         className="mr-1.5 h-4 w-4 text-gray-400"
  //                         fill="none"
  //                         viewBox="0 0 24 24"
  //                         stroke="currentColor"
  //                       >
  //                         <path
  //                           strokeLinecap="round"
  //                           strokeLinejoin="round"
  //                           strokeWidth={2}
  //                           d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
  //                         />
  //                         <path
  //                           strokeLinecap="round"
  //                           strokeLinejoin="round"
  //                           strokeWidth={2}
  //                           d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
  //                         />
  //                       </svg>
  //                       {venue.location}
  //                     </div>
  //                   </div>
  //                   <button className="mt-4 w-full rounded-md bg-rose-50 py-2 text-sm font-medium text-rose-600 hover:bg-rose-100 transition-colors">
  //                     View Details
  //                   </button>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </section>

  //       {/* Call to action */}
  //       <section className="bg-rose-50 py-16">
  //         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
  //           <h2 className="font-serif text-3xl font-medium text-gray-900">Can't find what you're looking for?</h2>
  //           <p className="mt-4 text-lg text-gray-600">
  //             Contact our wedding specialists for personalized venue recommendations
  //           </p>
  //           <button className="mt-8 inline-flex items-center justify-center rounded-md bg-rose-600 px-6 py-3 font-medium text-white hover:bg-rose-700 transition-colors">
  //             Schedule a Consultation
  //           </button>
  //         </div>
  //       </section>
  //     </main>
  //   </div>
  // )
}
