import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { API_PATH } from "../path/apiPath";
import Loader from "../components/Loader";

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroImage, setHeroImage] = useState("");

  // Restaurant Images
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

  useEffect(() => {

    setHeroImage(restaurantImages[Math.floor(Math.random() * restaurantImages.length)]);

    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`${API_PATH}/restaurants/${restaurantId}`);
        if (!response.ok) throw new Error("Failed to fetch restaurant data");

        const data = await response.json();
        setRestaurant(data);
        console.log("Fetched Restaurant Data:", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchDishes = async () => {
      try {
        const response = await fetch(`${API_PATH}/dishes/${restaurantId}`);
        if (!response.ok) throw new Error("Failed to fetch dishes");

        const data = await response.json();
        setDishes(data);
        console.log("Fetched Dishes:", data);
      } catch (err) {
        console.error("Error fetching dishes:", err.message);
      }
    };

    fetchRestaurant();
    fetchDishes();
  }, [restaurantId]);

  if (loading) return <Loader/>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="w-full bg-gray-100">
      <Navbar />

     <div
  className="relative w-full h-72 bg-cover bg-center flex items-center justify-center text-center bg-gradient-to-r from-gray-400 to-white"
>
  {/* Dark Overlay for Better Readability */}
  <div className="absolute inset-0  opacity-100"></div>

  {/* Text with Image Inside */}
  <h1
    className="relative md:text-9xl text-3xl font-extrabold bg-clip-text text-transparent"
    style={{
      backgroundImage: `url(/images/restaurants/img8.jpg)`, // Apply image only to text
      backgroundSize: "cover",
      backgroundPosition: "center",
      WebkitBackgroundClip: "text", // Ensures effect works on WebKit browsers
    }}
  >
    {restaurant?.name
    ? restaurant.name
        .toLowerCase()
        .split(" ")
        .map(word => word.toUpperCase())
        .join(" ")
    : "Restaurant"}
  </h1>
</div>


      {/* Dishes Section */}
      <div className="max-w-6xl mx-auto py-10 px-6 ">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Our Menu</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {dishes.length > 0 ? (
            dishes.map((dish) => (
              <motion.div
                key={dish._id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 hover:border-yellow-500"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={`${API_PATH}${dish.image}`}
                  alt={dish.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-xl font-semibold mt-3">{dish.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{dish.description || "No description available"}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-green-600">₹{dish.price}</span>
                  <button className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-600 transition">
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">No dishes available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
