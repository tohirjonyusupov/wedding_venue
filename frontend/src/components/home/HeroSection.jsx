import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510076857177-7470076d4098?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMHZlbnVlfGVufDB8fDB8fHww')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="mb-6 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            O‘zingizning <span className="italic text-rose-300">Mukammal To‘y</span> Kuniningizni Yarating
          </h1>
          <p className="mb-8 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
            Unutilmas to‘y marosimi uchun eng yaxshi joylarni kashf eting!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/venues"
                className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-rose-600/40 hover:bg-rose-700 transition-all duration-300"
              >
                To'yxonalarni Ko‘rish
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-lg bg-transparent border-2 border-rose-300 px-8 py-3 text-base font-semibold text-rose-200 hover:bg-rose-300/10 transition-all duration-300"
              >
                Ro‘yxatdan O‘tish
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}