import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center group">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-rose-600 group-hover:text-rose-700 transition-colors">
            To‘yxona
          </span>
          <span className="ml-1 text-2xl sm:text-3xl font-light italic text-gray-600 group-hover:text-gray-700 transition-colors">
            Elegance
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-base font-medium">
          <Link
            to="/"
            className={`transition-colors hover:text-rose-600 ${isActive("/") ? "text-rose-600" : "text-gray-700"}`}
          >
            Bosh Sahifa
          </Link>
          <Link
            to="/venues"
            className={`transition-colors hover:text-rose-600 ${isActive("/venues") ? "text-rose-600" : "text-gray-700"}`}
          >
            To'yxonalar
          </Link>
          {user && user.role === "client" && (
            <Link
              to="/my-bookings"
              className={`transition-colors hover:text-rose-600 ${isActive("/my-bookings") ? "text-rose-600" : "text-gray-700"}`}
            >
              Mening Buyurtmalarim
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 rounded-full">
                <div className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center text-rose-700 font-semibold">
                  {user.firstname.charAt(0)}
                </div>
                <span className="text-gray-700 text-sm">
                  <span className="font-medium">{user.firstname}</span>
                </span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-gray-700 hover:text-rose-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Chiqish
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className={`transition-colors hover:text-rose-600 ${isActive("/login") ? "text-rose-600" : "text-gray-700"}`}
              >
                Kirish
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-all shadow-sm hover:shadow-md"
              >
                Ro‘yxatdan O‘tish
              </Link>
            </div>
          )}
        </nav>

        <button
          className="md:hidden p-2 text-gray-600 hover:text-rose-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 z-50 bg-white md:hidden"
      >
        <div className="p-4 flex justify-end">
          <button
            onClick={closeMenu}
            className="p-2 text-gray-600 hover:text-rose-600"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-3 p-6">
          <Link
            to="/"
            className={`text-lg font-semibold py-3 px-4 rounded-lg ${isActive("/") ? "bg-rose-50 text-rose-600" : "text-gray-700 hover:bg-rose-50"}`}
            onClick={closeMenu}
          >
            Bosh Sahifa
          </Link>
          <Link
            to="/venues"
            className={`text-lg font-semibold py-3 px-4 rounded-lg ${isActive("/venues") ? "bg-rose-50 text-rose-600" : "text-gray-700 hover:bg-rose-50"}`}
            onClick={closeMenu}
          >
            Joylar
          </Link>
          {user && user.role === "client" && (
            <Link
              to="/my-bookings"
              className={`text-lg font-semibold py-3 px-4 rounded-lg ${isActive("/my-bookings") ? "bg-rose-50 text-rose-600" : "text-gray-700 hover:bg-rose-50"}`}
              onClick={closeMenu}
            >
              Mening Buyurtmalarim
            </Link>
          )}
          {user ? (
            <div className="mt-4">
              <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center text-rose-700 font-semibold">
                  {user.firstname.charAt(0)}
                </div>
                <div>
                  <span className="text-sm text-gray-500">Kirilgan foydalanuvchi</span>
                  <p className="font-semibold text-gray-800">{user.firstname} {user.lastname || ""}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="mt-3 text-lg font-semibold py-3 px-4 rounded-lg text-rose-600 hover:bg-rose-50 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Chiqish
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/login"
                className="text-lg font-semibold py-3 px-4 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-center"
                onClick={closeMenu}
              >
                Kirish
              </Link>
              <Link
                to="/signup"
                className="text-lg font-semibold py-3 px-4 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-center"
                onClick={closeMenu}
              >
                Ro‘yxatdan O‘tish
              </Link>
            </div>
          )}
        </nav>
      </motion.div>
    </header>
  );
}