import mongoose from "mongoose";
import Dish from "../models/Dish.js";
import Restaurant from "../models/Restaurant.js"; 

export const createDish = async (req, res) => {
    try {
        const { name, description, price, restaurant } = req.body;

        if (!mongoose.Types.ObjectId.isValid(restaurant)) {
            return res.status(400).json({ error: "Invalid restaurant ID" });
        }

        const existingRestaurant = await Restaurant.findById(restaurant);
        if (!existingRestaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        const newDish = new Dish({ name, description, price, restaurant });
        await newDish.save();
        res.status(201).json(newDish);

    } catch (error) {
        console.error("Error creating dish:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getDishesByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ error: "Invalid restaurant ID" });
        }

        const dishes = await Dish.find({ restaurant: restaurantId });
        res.json(dishes);
    } catch (error) {
        console.error("Error fetching dishes:", error);
        res.status(500).json({ error: "Server error" });
    }
};
