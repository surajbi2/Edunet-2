import React from 'react';
import { motion } from 'framer-motion';
import { FaPizzaSlice, FaHamburger, FaIceCream, FaUtensils, FaStore } from 'react-icons/fa';
import { FaBowlRice } from "react-icons/fa6";

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

const LandingPage = () => {
  return (
    <div className='w-full min-h-screen bg-gray-100'>
      {/* Hero Section */}
      <div className='relative md:w-full h-[60vh] bg-[url("/food.jpg")] bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4'>
        <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{type: 'tween', ease: 'easeInOut', duration: 2 }}
        className='bg-black bg-opacity-50 md:p-6 p-2 rounded-lg'>
          <h1 className='md:text-5xl text-2xl font-extrabold drop-shadow-lg'>Delicious Food, Delivered Fast</h1>
          <p className='text-lg mt-2 font-light'>Satisfy your cravings with just a few clicks</p>
          <div className='flex gap-4 justify-center items-center mt-4'>
            <button className='mt-4 bg-yellow-500 text-black cursor-pointer md:px-6 px-2 md:py-2 py-1 rounded-full text-lg font-semibold hover:bg-yellow-600 transition'>Order Now</button>
            <button className='mt-4 bg-yellow-500 text-black cursor-pointer md:px-6 px-2 md:py-2 py-1 rounded-full text-lg font-semibold hover:bg-yellow-600 transition'>Explore Menu</button>
          </div>
        </motion.div>
      </div>

      {/* Categories Section */}
      <div className='relative max-w-full mx-auto md:py-10 md:px-4 bg-[url("/category.jpg")] bg-cover bg-center overflow-hidden py-3'>
        <div className='absolute inset-0 bg-opacity-50 backdrop-blur-xs '></div>
        <motion.h2
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 2 }}
        className='relative text-3xl font-bold text-white text-center z-10'>Browse Our Categories</motion.h2>
        <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 1.5 }}

        className='relative grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 z-10 px-15'>
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className='bg-white p-6 rounded-xl shadow-md flex flex-col items-center cursor-pointer hover:shadow-xl transition-all border border-gray-200 hover:border-yellow-500 transform'
              whileHover={{ scale: 1.1 }}
            >
              <div className='bg-gray-100 p-4 rounded-full'>{category.icon}</div>
              <h3 className='text-xl font-semibold mt-3 text-gray-700'>{category.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Restaurants Section */}
      
      <div className='max-w-full mx-auto md:py-10 md:px-4 py-3'>
        <h2 className='text-3xl font-bold text-gray-800 text-center'>Popular Restaurants</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-15'>
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={index}
              className='relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all'
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
    </div>
  );
};

export default LandingPage;
