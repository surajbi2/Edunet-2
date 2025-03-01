import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios"; // To make API requests
import Navbar from "../components/Navbar";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // State for handling errors
  const navigate = useNavigate(); // Navigation hook

  // Handle input change
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
        const response = await axios.post("http://localhost:5000/login", loginData);

        if (response.status === 200) {
            localStorage.setItem("token", response.data.token); // Store token
            localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details
            console.log("User logged in: ", response.data.user.username);
            navigate("/dashboard"); // Redirect to dashboard
        }
    } catch (err) {
        setError(err.response?.data?.message || "Login failed. Please try again.");
    }
};


  return (
    <>
    <Navbar/>
    <div className="w-full min-h-screen bg-[url('/login-bg.jpg')] bg-cover bg-center flex flex-col">
      <div className="flex flex-1 items-center justify-center px-4 inset-0 bg-opacity-100 backdrop-blur-xs">
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back!</h2>
          <p className="text-center text-gray-600 mb-6">Login to continue ordering delicious food</p>
          
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none" 
                placeholder="Enter your email" 
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input 
                type="password" 
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none" 
                placeholder="Enter your password" 
                required
              />
            </div>
            <button type="submit" className="w-full bg-yellow-500 cursor-pointer text-black font-semibold py-2 rounded-lg hover:bg-yellow-600 transition">
              Login
            </button>
          </form>
          
          <p className="text-center text-gray-600 mt-4">
            Don't have an account? <a href="/sign-up" className="text-yellow-500 font-semibold">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  
    </>

  );
};

export default Login;
