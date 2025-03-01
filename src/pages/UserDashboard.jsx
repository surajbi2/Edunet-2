import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPizzaSlice, FaHamburger, FaIceCream, FaUtensils, FaStore } from 'react-icons/fa';
import { FaBowlRice } from "react-icons/fa6";
import Navbar from '../components/LoginNavbar';
import Footer from '../components/Footer';

const categories = [
  { id: 1, name: 'Pizza', icon: <FaPizzaSlice className='text-red-500 text-5xl' /> },
  { id: 2, name: 'Burgers', icon: <FaHamburger className='text-yellow-500 text-5xl' /> },
  { id: 3, name: 'Meals', icon: <FaBowlRice className='text-green-500 text-5xl' /> },
  { id: 4, name: 'Desserts', icon: <FaIceCream className='text-pink-500 text-5xl' /> },
  { id: 5, name: 'Biryani', icon: <FaUtensils className='text-orange-500 text-5xl' /> },
  { id: 6, name: 'Tiffins', icon: <FaStore className='text-blue-500 text-5xl' /> },
];

const restaurants = [
  { name: "McDonald's", image: "/burger.jpg" },
  { name: "Pizza Hut", image: "/pizza.jpg" },
  { name: "Domino's", image: "/pizza2.jpg" },
  { name: "KFC", image: "/kfc.jpg" },
  { name: "Cream Stone", image: "/icecream.jpg" },
  { name: "Starbucks", image: "/star.jpg" },
  { name: "Taco Bell", image: "/veg.jpg" },
  { name: "Burger King", image: "/burger2.jpg" },
  { name: "Paradise", image: "paradise.jpg" }
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    user.username = user.username.charAt(0).toUpperCase() + user.username.slice(1)
  const handleLogout = () => {
    // Clear user session (adjust as needed)
    localStorage.removeItem('user'); 
    navigate('/'); // Redirect to login page
  };

  return (
    <div className='w-full min-h-screen bg-gray-100'>
      <Navbar />
      {/* Dashboard Header */}
      <motion.div 
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
        transition={{ duration: 1 , ease: 'easeInOut' }}
      className='text-center py-8 bg-yellow-500 text-white text-4xl font-bold'>
        Welcome, <strong>{user.username}</strong> !
      </motion.div>

      {/* Categories Section */}
      <motion.div
       initial={{ opacity:0, y: 0 }}
       animate={{ opacity:1, y: 0}}
         transition={{ duration: 1 , ease: 'easeInOut' }}
      className='relative max-w-full mx-auto md:py-10 md:px-4 bg-[url("/category.jpg")] bg-cover bg-center overflow-hidden py-3'>
        <div className='absolute inset-0 bg-opacity-50 backdrop-blur-xs '></div>
        <motion.h2
        initial={{ opacity:0, y: 0 }}
        animate={{ opacity:1, y: 0}}
          transition={{ duration: 2 , ease: 'easeInOut' }}
        className='relative text-3xl font-bold text-white text-center'>Browse Categories</motion.h2>
        <div className='relative grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-15'>
          {categories.map((category) => (
            <motion.div
            initial={{ opacity:0, y:50 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration: 1 , ease: 'easeInOut' }}
            // whileHover={{ scale: 1.1, duration: 0.1, ease: 'easeInOut' }}
              key={category.id}
              className='bg-white p-6 rounded-xl shadow-md flex flex-col items-center cursor-pointer hover:shadow-xl hover:scale-105 duration-1000 transition-all border border-gray-200 hover:border-yellow-500 transform'
              // whileHover={{ scale: 1.1 }}
            >
              <div className='bg-gray-100 p-4 rounded-full'>{category.icon}</div>
              <h3 className='text-xl font-semibold mt-3 text-gray-700'>{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Restaurants Section */}
      <div className='max-w-full mx-auto md:py-10 md:px-4 py-3 bg-white'>
        <h2 className='text-3xl font-bold text-gray-800 text-center'>Popular Restaurants</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-15'>
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={index}
              className='relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all drop-shadow-2xl'
              whileHover={{ scale: 1.05 }}
            >
              <img src={restaurant.image} alt={restaurant.name} className='w-full h-64 object-cover' />
              <div className='absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2 text-lg font-semibold'>
                {restaurant.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className='text-center py-6'>
        <button onClick={handleLogout} className='bg-red-500 text-white px-6 py-2 rounded-full hover:cursor-pointer font-semibold hover:bg-red-600 transition'>
          Logout
        </button>
      </div>
      
    </div>
  );
};

export default UserDashboard;
