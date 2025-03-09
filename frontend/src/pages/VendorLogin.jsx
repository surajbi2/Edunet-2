import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { API_PATH } from "../path/apiPath";
const VendorLogin = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await axios.post(`${API_PATH}/vendors/login`, loginData);
      console.log("Backend Response:", response.data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("vendor", JSON.stringify(response.data.vendor));
        localStorage.setItem("vendorId", response.data.vendorId);
        localStorage.setItem("restaurantId", response.data.vendor.restaurantId);
        console.log("Restaurant ID stored in localStorage:", localStorage.getItem("restaurantId"));

        console.log(localStorage.getItem("vendorId"));
        console.log("Restaurant ID:", response.data.vendor.restaurantId);
        console.log(localStorage.getItem("restaurantId"));        


        console.log("Vendor logged in:", response.data.vendor);
        navigate("/vendor-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || "Login failed.");
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h2 className="text-4xl font-bold text-center text-gray-800">Vendor Login</h2>
          <p className="text-center text-gray-500 mb-6">Login to manage your restaurant</p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-xl hover:bg-yellow-600 transition shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account? <Link to="/v-signin" className="text-yellow-500 font-semibold">Sign Up</Link>
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default VendorLogin;
