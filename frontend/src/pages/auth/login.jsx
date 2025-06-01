import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const returnUrl = params.get("returnUrl") || "/";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      setIsLoading(false);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const decoded = jwtDecode(data.token);
      const role = decoded.role;

      if (returnUrl && returnUrl !== "/login" && role === "client") {
        navigate(returnUrl);
      } else {
        navigate(`/${role}`);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login error:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Kirish amalga oshmadi");
        setError(error.response.data.message || "Kirish amalga oshmadi");
      } else if (error.request) {
        setError("Serverdan javob yo‘q. Iltimos, qayta urinib ko‘ring.");
      } else {
        setError("Server xatosi yuz berdi. Iltimos, keyinroq urinib ko‘ring.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-gray-100 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-center text-3xl font-serif font-bold text-rose-600 mb-6">
          Kirish
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Foydalanuvchi nomi"
              className="w-full p-3 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200 bg-rose-50 text-gray-800 placeholder-gray-400"
              onChange={handleChange}
              value={formData.username}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Parol"
              className="w-full p-3 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200 bg-rose-50 text-gray-800 placeholder-gray-400"
              onChange={handleChange}
              value={formData.password}
              disabled={isLoading}
              required
            />
          </div>
          <div className="flex justify-center items-center space-x-2 text-sm">
            <span className="text-gray-600">Akkauntingiz yo‘qmi?</span>
            <Link
              to="/signup"
              className="text-rose-600 hover:text-rose-700 font-medium transition-colors"
            >
              Ro‘yxatdan O‘tish
            </Link>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Yuklanmoqda...
              </div>
            ) : (
              "Kirish"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;