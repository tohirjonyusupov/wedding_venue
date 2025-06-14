import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function VenueCard({venue}) {
  const navigate = useNavigate();
  return (
    <motion.div
      key={venue.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
        <img
          src={
            venue.images[0] || `https://placehold.co/600x400?text=${venue.name}`
          }
          alt={venue.name}
          className="h-[200px] w-full  object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-gray-800">
            {venue.name}
          </h3>
          <span className="text-sm font-medium text-rose-600">
            {(venue.price_seat * venue.capacity).toLocaleString()} so‘m
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
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
            {venue.capacity} mehmon
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
            {venue.district_name}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full rounded-lg bg-rose-600 text-white py-2.5 text-sm font-semibold hover:bg-rose-700 transition-all duration-300"
          onClick={() => navigate(`/venues/${venue.id}`)}
        >
          Batafsil Ko‘rish
        </motion.button>
      </div>
    </motion.div>
  );
}

export default VenueCard;
