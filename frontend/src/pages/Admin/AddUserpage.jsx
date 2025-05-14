import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirecting if token is missing

const AdminPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    role: "teacher",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token")); // Store token in state
  const navigate = useNavigate(); // For redirecting

  // Check for token on component mount
  useEffect(() => {
    if (!token) {
      setError("Please log in to access this page.");
      // Redirect to login page (adjust the path based on your app)
      navigate("/login");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.username ||
      !formData.password
    ) {
      setError("Barcha maydonlar to'ldirilishi kerak!");
      return;
    }

    try {
      console.log("Token being used:", token); // Log the token
      console.log("Sending data:", formData);

      const endpoint =
        formData.role === "teacher"
          ? "http://localhost:4000/admin/add-teacher"
          : "http://localhost:4000/admin/add-student";

      const response = await axios.post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("API response:", response);
      setSuccess(response.data.message);
      setError("");
      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        role: "teacher",
      });
    } catch (err) {
      console.error("Error:", err);
      const errorMessage = err.response?.data?.error || "Failed to add user.";
      setError(errorMessage);
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Admin Panel
        </h1>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Add User
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className={`w-full p-3 rounded-lg text-white transition duration-300 ${
              formData.role === "teacher"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Add {formData.role === "teacher" ? "Teacher" : "Student"}
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;