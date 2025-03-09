import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPizzaSlice, FaHamburger, FaIceCream, FaUtensils, FaStore } from "react-icons/fa";
import { FaBowlRice } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";
import { API_PATH } from "../path/apiPath";
import Loader from "../components/Loader";
const categories = [
  { id: 1, name: "Pizza", icon: <FaPizzaSlice className="text-red-500 text-5xl" /> },
  { id: 2, name: "Burgers", icon: <FaHamburger className="text-yellow-500 text-5xl" /> },
  { id: 3, name: "Meals", icon: <FaBowlRice className="text-green-500 text-5xl" /> },
  { id: 4, name: "Desserts", icon: <FaIceCream className="text-pink-500 text-5xl" /> },
  { id: 5, name: "Biryani", icon: <FaUtensils className="text-orange-500 text-5xl" /> },
  { id: 6, name: "Tiffins", icon: <FaStore className="text-blue-500 text-5xl" /> },
];
const restaurantImages = [
  "/images/restaurants/img1.jpg",
  "/images/restaurants/img2.jpg",
  "/images/restaurants/img3.jpg",
  "/images/restaurants/img4.jpg",
  "/images/restaurants/img5.jpg",
  "/images/restaurants/img6.jpg",
  "/images/restaurants/img7.jpg",
  "/images/restaurants/img8.jpg",
  "/images/restaurants/img9.jpg",
];

const getRandomImage = () => {
  return restaurantImages[Math.floor(Math.random() * restaurantImages.length)];
};

const LandingPage = () => {
  const [restaurants, setRestaurants] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${API_PATH}/restaurants`);
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError("Failed to fetch restaurants. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Navbar section */}
      <Navbar />
      
      {/* Hero Section */}
      <div className='relative md:w-full h-[60vh] bg-[url("/food.jpg")] bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4'>
        <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{type: 'tween', ease: 'easeInOut', duration: 2 }}
        className='bg-black bg-opacity-50 md:p-6 p-2 rounded-lg'>
          <div className="flex flex-row items-center">
  <h1 className="md:text-5xl text-xl font-extrabold drop-shadow-lg">
    Delicious Food, Delivered            
  </h1>
  
  <motion.h1   
    className="md:text-5xl md:ml-3 ml-2 text-2xl font-extrabold drop-shadow-lg relative"
  >
    Fast
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
      className="absolute bottom-0 left-0 md:top-14 top-8 h-1 bg-amber-500"
    />
  </motion.h1>
</div>

          
          <p className='text-lg mt-2 font-light'>Satisfy your cravings with just a few clicks</p>
          <div className='flex gap-4 justify-center items-center mt-4'>
            <Link
            to='/v-login'
             className='mt-4 bg-yellow-500 text-black cursor-pointer md:px-6 px-2 md:py-2 py-1 rounded-full text-lg font-semibold hover:bg-yellow-600 transition' >Vendor</Link>

            <Link to='/login' className='mt-4 bg-yellow-500 text-black cursor-pointer md:px-6 px-2 md:py-2 py-1 rounded-full text-lg font-semibold hover:bg-yellow-600 transition'>Order Now</Link>
            
          </div>
        </motion.div>
      </div>

      {/* Categories Section */}
      <div className="relative max-w-full mx-auto md:py-10 md:px-4 bg-[url('/category.jpg')] bg-cover bg-center overflow-hidden py-3 before:absolute before:inset-0 before:bg-black/30 before:backdrop-blur-md">
      <motion.h2
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", ease: "easeInOut", duration: 2 }}
          className="relative text-3xl font-bold text-white text-center z-10"
        >
          Browse Our Categories
        </motion.h2>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", ease: "easeInOut", duration: 1.5 }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 z-10 px-15"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center cursor-pointer hover:shadow-xl transition-all border border-gray-200 hover:border-yellow-500 transform"
              whileHover={{ scale: 1.1 }}
            >
              <div className="bg-gray-100 p-4 rounded-full">{category.icon}</div>
              <h3 className="text-xl font-semibold mt-3 text-gray-700">{category.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Restaurants Section */}
      <div className="max-w-full mx-auto md:py-10 md:px-4 py-3 bg-linear-to-r from-[#fffeff] to-[#d7fffe]">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Popular Restaurants</h2>

        {/* loader */}
        <div className="flex justify-center my-6 ">

        {loading && <Loader/>}
        </div>
        
        {/* Error message */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Restaurant cards */}
        {!loading && !error && restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-15">
            {restaurants.map((restaurant, index) => (
              <motion.div
              key={index}
              className="relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <Link to={`/restaurant/${restaurant._id}`}>
                <img
                  src={restaurantImages[index % restaurantImages.length]}
                  alt={restaurant.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2 text-lg font-semibold">
                  {restaurant.name}
                </div>
              </Link>
            </motion.div>
            
            ))}
          </div>
        ) : (
          !loading && !error && <p className="text-center text-gray-600">No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
