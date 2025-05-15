import React from "react";

import { Link } from "react-router-dom"

export function HeroSection() {
  return (
    <section className=" pt-50">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510076857177-7470076d4098?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMHZlbnVlfGVufDB8fDB8fHww')] bg-cover bg-center bg-no-repeat opacity-90">
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8 flex  flex-col items-center justify-cente text-center text-white">
        <h1 className="mb-4 font-serif text-4xl font-light tracking-tight md:text-5xl lg:text-6xl">
          Create Your Perfect <span className="font-medium italic">Wedding Day</span>
        </h1>
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* <Link
            to="/venues"
            className="inline-flex items-center justify-center rounded-md bg-rose-600 px-6 py-3 font-medium text-white hover:bg-rose-700 transition-colors"
          >
            Explore Venues
          </Link> */}
          <Link
            to="/venues"
            className="inline-flex items-center justify-center rounded-md border border-white px-6 py-3 font-medium text-white hover:bg-white/20 transition-colors"
          >
            Explore Venues
          </Link>
        </div>
      </div>
    </section>
  )
}
