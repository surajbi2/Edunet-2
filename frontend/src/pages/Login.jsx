import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { API_PATH } from "../path/apiPath"; 
const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
        const response = await axios.post(`${API_PATH}/users/login`, loginData);

        if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user)); 
            console.log("User logged in: ", response.data.user.username);
            navigate("/dashboard"); 
        }
    } catch (err) {
        setError(err.response?.data?.message || "Login failed. Please try again.");
    }
};


  return (
    <>
    <motion.div
    initial={{ opacity: 0 , y: -100 }}
    animate={{ opacity: 1 , y: 0 }}  
    exit={{ opacity: 0 }}
    transition={{ duration: 2 , ease: 'easeInOut' }}
    className="div">

   <Navbar />
    </motion.div>
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
