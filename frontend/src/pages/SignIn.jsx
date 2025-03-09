import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import {motion} from 'framer-motion';
import { API_PATH } from '../path/apiPath';
const SignIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${API_PATH}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering user");
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
          <h2 className="text-3xl font-bold text-center text-gray-800">Welcome,</h2>
          <p className="text-center text-gray-600 mb-6">Sign In and explore delicious food near you</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none" 
                placeholder="Enter your full name" 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none" 
                placeholder="Enter your email" 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none" 
                placeholder="Enter your password" 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none" 
                placeholder="Enter your password" 
              />
            </div>
            <button type="submit" className="w-full bg-yellow-500 cursor-pointer text-black font-semibold py-2 rounded-lg hover:bg-yellow-600 transition">
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account? <a href="/login" className="text-yellow-500 font-semibold">Log In</a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignIn;
