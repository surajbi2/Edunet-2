import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import AddDish from "../components/AddDish";
import LogoutButton from "../components/LogoutButton";
import { API_PATH } from "../path/apiPath";
const VendorDashboard = () => {
  const [restaurantId, setRestaurantId] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [dishName, setDishName] = useState("");
  const [dishDescription, setDishDescription] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [dishImage, setDishImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const storedRestaurantId = localStorage.getItem("restaurantId");
  
      if (!storedRestaurantId) {
        console.error("No restaurantId found in localStorage");
        return;
      }
  
      setRestaurantId(storedRestaurantId);
  
      try {
        const response = await fetch(`${API_PATH}/restaurants/${storedRestaurantId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch restaurant: ${await response.text()}`);
        }
  
        const data = await response.json();
        console.log("Fetched restaurant data:", data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };
  
    fetchRestaurantData();
  }, []);
  

  useEffect(() => {
    if (!restaurantId) return;
  
    const fetchDishes = async () => {
      try {
        const response = await axios.get(`${API_PATH}/dishes/${restaurantId}`);
        setDishes(response.data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
  
    fetchDishes();
  }, [restaurantId]);
  


  const handleAddDish = async (e) => {
    e.preventDefault();
  
    if (!restaurantId) {
      console.error("Restaurant ID is missing!");
      alert("Restaurant ID is missing. Please refresh the page.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("name", dishName);
      formData.append("description", dishDescription);
      formData.append("price", dishPrice);
      formData.append("restaurant", restaurantId); 
      if (dishImage) {
        formData.append("image", dishImage);
      }
  
      const response = await axios.post(`${API_PATH}/dishes`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.dish) {
        setDishes((prevDishes) => [...prevDishes, response.data.dish]);
      }
  
      setDishName("");
      setDishDescription("");
      setDishPrice("");
      setDishImage(null);
    } catch (error) {
      console.error("Error adding dish:", error);
    }
  };
  
  const handleDeleteDish = async (id) => {
    try {
      await axios.delete(`${API_PATH}/dishes/${id}`);
      setDishes(dishes.filter((dish) => dish._id !== id));
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleLogout = () => {
    // const vendor = JSON.parse(vendorData); // Parse JSON string
    // console.log("Vendor logged out:", vendor.email);
    localStorage.removeItem("token");
    localStorage.removeItem("vendor");
    navigate("/v-login");
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-[#f5f7fa] to-[#c3cfe2]">

      
      <div className="w-full  md:p-6 p-2">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:text-4xl text-2xl font-bold text-center text-white mb-6 bg-gradient-to-r from-[#f83600] to-[#f9d423] p-2 rounded-3xl"
        >
          Vendor Dashboard
        </motion.h1>

       
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:max-w-[70%] mx-auto bg-gray-100 bg-opacity-80 backdrop-blur-md md:p-6 p-2 rounded-2xl shadow-2xl"
        >
          <div className=" flex flex-col justify-center md:m-5 m-2">
          <div className="flex w-full items-center justify-center">
          <h2 className="text-2xl font-bold mb-4 text-white bg-black w-full text-center p-2 rounded-2xl">Manage Your Dishes</h2>
          </div>
          <form onSubmit={handleAddDish} className="space-y-4">
            <input
              type="text"
              placeholder="Dish Name"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              required
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="text"
              placeholder="Dish Description"
              value={dishDescription}
              onChange={(e) => setDishDescription(e.target.value)}
              required
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="number"
              placeholder="Dish Price"
              value={dishPrice}
              onChange={(e) => setDishPrice(e.target.value)}
              required
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-500"
            />
           <div className="grid w-full max-w-sm items-center gap-1.5">
  <label className="text-sm text-gray-500 font-medium">Upload Dish Image</label>
  <input
    type="file"
    accept="image/*"
    id="dish-image"
    onChange={(e) => setDishImage(e.target.files[0])}
    className="w-full hover:drop-shadow-xl file:cursor-pointer rounded-xl border border-blue-100 bg-white text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-medium hover:file:bg-blue-700 cursor-pointer"
  />
</div>

            <div className="flex justify-center items-center md:gap-6 gap-4">

            <AddDish/>
            <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className=" text-white transition hover:bg-red-600 "
        >
         <LogoutButton/>
        </motion.div>
              </div>
              {/* Logout Button */}
         
          </form>
</div>
        </motion.div>
      </div>
      <div className="max-w-full mx-auto md:p-6 p-2">
<div className="flex flex-col justify-center p-6 rounded-4xl bg-gray-50 w-full drop-shadow-4xl">



          <h2 className="text-2xl text-center font-bold p-2 rounded-2xl bg-black mt-6 text-white">Your Dishes</h2>
          {dishes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {dishes.map((dish) => (
                <motion.div
                  key={dish._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition"
                >
                  <img
                    src={`${API_PATH}${dish.image}` || "default-dish.jpg"}
                    alt={dish.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-semibold mt-2">{dish.name}</h3>
                  <p className="text-gray-600">{dish.description}</p>
                  <p className="text-gray-800 font-bold">Rs: {dish.price}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteDish(dish._id)}
                    className="mt-3 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold shadow-md transition"
                  >
                    Delete
                  </motion.button>
                </motion.div>
              ))}
              
            </div>
            
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-gray-600 mt-4 text-center"
            >
              No dishes available.
            </motion.p>
          )}
        </div>
        
        </div>
         
      </div>
      <div>
        
      </div>
      
    </>
  );
};

export default VendorDashboard;
