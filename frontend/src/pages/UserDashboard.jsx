import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaPizzaSlice, FaHamburger, FaIceCream, FaUtensils, FaStore } from "react-icons/fa";
import { FaBowlRice } from "react-icons/fa6";
import Navbar from "../components/LoginNavbar";
import Footer from "../components/Footer";
import { API_PATH } from "../path/apiPath";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";  
const categories = [
  { id: 1, name: "Pizza", icon: <FaPizzaSlice className="text-red-500 text-5xl" /> },
  { id: 2, name: "Burgers", icon: <FaHamburger className="text-yellow-500 text-5xl" /> },
  { id: 3, name: "Meals", icon: <FaBowlRice className="text-green-500 text-5xl" /> },
  { id: 4, name: "Desserts", icon: <FaIceCream className="text-pink-500 text-5xl" /> },
  { id: 5, name: "Biryani", icon: <FaUtensils className="text-orange-500 text-5xl" /> },
  { id: 6, name: "Tiffins", icon: <FaStore className="text-blue-500 text-5xl" /> },
];

// images
const restaurantImages = [
  "/images/restaurants/img1.jpg",
  "/images/restaurants/img2.jpg",
  "/images/restaurants/img3.jpg",
  "/images/restaurants/img4.jpg",
  "/images/restaurants/img5.jpg",
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  user.username = user.username.charAt(0).toUpperCase() + user.username.slice(1);

  useEffect(() => {
    axios
      .get(`${API_PATH}/restaurants`)
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false); // Data loaded, hide loader
      })
      .catch((err) => {
        console.error("Error fetching restaurants:", err);
        setLoading(false); // Hide loader even on error
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="div"
      >
        <Navbar />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="text-center py-8 bg-yellow-500 text-white text-4xl font-bold"
      >
        Welcome, <strong>{user.username}</strong>!
      </motion.div>
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
      <div className="max-w-full mx-auto md:py-10 md:px-4 py-3 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Popular Restaurants</h2>

        {loading ? (
          <div className="flex justify-center items-center h-[50vh] w-full">
            <div>

          <Loader />
            </div>
        </div>
        
        
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-15">
            {restaurants.length > 0 ? (
              restaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant._id}
                  className="relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all drop-shadow-2xl"
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
              ))
            ) : (
              <p className="text-center col-span-3 text-gray-500">No restaurants available</p>
            )}
          </div>
        )}
      </div>

      <div className="text-center py-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-full hover:cursor-pointer font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
