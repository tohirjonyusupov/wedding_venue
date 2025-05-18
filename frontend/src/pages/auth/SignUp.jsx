import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  
  
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [client, setClient] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    phone_number: "",
  });
  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/client/signup",
        client,
        {
          headers: { "Content-Type": "application/json" },
        }
      );


      if(response){
        navigate("/login");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 400) {
        setWarning(error.response.data.message || "");
      console.error("SignUp error:", error);
      }
    }
  };

  return (
    <div className="p-[100px]">
      <div className="max-w-xs bg-white rounded-3xl p-6 border-4 border-white shadow-lg mx-auto">
        <h2 className="text-center font-extrabold text-2xl text-blue-500">
          Sign In
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-3 text-sm">
            {error}
          </div>
        )}
        {warning && (
          <div className="bg-yellow-100 text-yellow-700 p-3 rounded-lg mt-3 text-sm">
            {warning}
          </div>
        )}

        <form className="mt-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Firstname"
            className="w-full bg-white border-none p-4 rounded-xl mt-3 shadow-md focus:border-blue-400 focus:outline-none"
            onChange={handleChange}
            value={client.firstname}
            required
          />     
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Lastname"
            className="w-full bg-white border-none p-4 rounded-xl mt-3 shadow-md focus:border-blue-400 focus:outline-none"
            onChange={handleChange}
            value={client.lastname}
            required
          />     
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="w-full bg-white border-none p-4 rounded-xl mt-3 shadow-md focus:border-blue-400 focus:outline-none"
            onChange={handleChange}
            value={client.username}
            required
          />
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full bg-white border-none p-4 rounded-xl mt-3 shadow-md focus:border-blue-400 focus:outline-none"
            onChange={handleChange}
            value={client.password}
            required
          />     
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            placeholder="Phone_number"
            className="w-full bg-white border-none p-4 rounded-xl mt-3 shadow-md focus:border-blue-400 focus:outline-none"
            onChange={handleChange}
            value={client.phone_number}
            required
          />     
          <div className="flex justify-center mt-3">
            <span className="text-gray-500">You have an account?</span>
            <Link to="/login" className="text-blue-500 ml-1">
              Sign In
            </Link>
          </div>
          
          <button
            type="submit"
            className="w-full font-bold bg-gradient-to-r from-blue-500 to-blue-400 text-white py-4 mt-5 rounded-xl shadow-md hover:scale-105 hover:shadow-lg active:scale-95"
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
