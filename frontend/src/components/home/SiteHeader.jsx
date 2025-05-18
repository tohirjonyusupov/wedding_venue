"use client"
import React, { use } from "react";
import { useState } from "react"
import { Link } from "react-router-dom"

export function SiteHeader() {
  const user = JSON.parse(localStorage.getItem("user"))  
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm py-1.5">
      <div className="px-14 sm:px-6 lg:px-20 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center text-3xl">
          <span className=" font-semibold tracking-wide text-rose-600">Elegance</span>
          <span className="ml-1  font-light italic tracking-wide">Venues</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-1xl">
          <Link to="/" className="font-medium transition-colors hover:text-rose-600">
            Home
          </Link>
          <Link to="/venues" className="font-medium transition-colors hover:text-rose-600">
            Venues
          </Link>
          {user ? (
            <>
            {user.role === 'client' && (
              <Link to="/my-bookings" className="font-medium transition-colors hover:text-rose-600">
                My bookings
              </Link>
            )}
            <h1><span>Hello</span> {user.firstname}</h1>
            </>
          ) : (
            <>
              <Link to="/login" className="font-medium transition-colors hover:text-rose-600">
                Login
              </Link>
              <Link to="/signup" className="font-medium transition-colors hover:text-rose-600">
                Sign Up
              </Link>
            </>
          )}
        </nav>
          <button
            className="md:hidden p-2 text-gray-600 hover:text-rose-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="8-7 w-8 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        {/* <div className=""> */}
          {/* <button className="hidden md:flex  rounded-md bg-rose-600 px-6 py-2.5 font-medium text-white hover:bg-rose-700 transition-colors">
            Book
          </button> */}
        {/* </div> */}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="p-4 flex justify-end">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-rose-600 focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-4 text-lg p-6 bg-white">
            <Link to="/" className="font-medium transition-colors text-black hover:text-rose-600 py-2 border-b border-gray-200">
              Home
            </Link>
            <Link to="/venues" className="font-medium transition-colors text-black hover:text-rose-600 py-2 border-b border-gray-200">
              Venues
            </Link>
            {/* <button className="mt-2 px-4 py-2 rounded-md border border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors">
              Book a Tour
            </button> */}
          </nav>
        </div>
      )}
    </header>
  )
}
