import express from "express";
import asyncHandler from "express-async-handler";
import multer from "multer"; 
import Dish from "../models/Dish.js";
import Restaurant from "../models/Restaurant.js"; 

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

router.get("/restaurants/:id", asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id === "undefined") {
            return res.status(400).json({ message: "Invalid Restaurant ID" });
        }

        const restaurant = await Restaurant.findById(id)
            .populate({
                path: "dishes",
                select: "name description price image"
            });

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.json(restaurant);
    } catch (error) {
        console.error("❌ Backend Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}));

router.get("/restaurant-id/:vendorId", async (req, res) => {
    try {
        const { vendorId } = req.params;
        if (!vendorId || vendorId === "undefined") {
            return res.status(400).json({ message: "Invalid Vendor ID" });
        }

        const restaurant = await Restaurant.findOne({ vendor: vendorId });
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.json({ restaurantId: restaurant._id });
    } catch (error) {
        console.error("❌ Backend Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.post("/", upload.single("image"), asyncHandler(async (req, res) => {
    const { name, description, price, restaurant } = req.body;

    console.log("📌 Uploaded File:", req.file);  

    const image = req.file ? `/uploads/${req.file.filename}` : "default-dish.jpg";

    if (!restaurant) {
        return res.status(400).json({ message: "Restaurant ID is required" });
    }

    const dish = await Dish.create({ name, description, price, restaurant, image });

    await Restaurant.findByIdAndUpdate(
        restaurant, 
        { $push: { dishes: dish._id } }, 
        { new: true } 
    );

    res.status(201).json({ message: "Dish added successfully", dish });
}));

// 🟢 Get Dishes by Restaurant
router.get("/:restaurantId", asyncHandler(async (req, res) => {
    try {
        const dishes = await Dish.find({ restaurant: req.params.restaurantId });

        if (!dishes.length) {
            return res.status(404).json({ message: "No dishes found for this restaurant" });
        }

        res.json(dishes);
    } catch (error) {
        console.error("Error fetching dishes:", error);
        res.status(500).json({ message: "Server error" });
    }
}));

// 🟢 Update Dish
router.put("/:id", upload.single("image"), asyncHandler(async (req, res) => {
    const { name, description, price } = req.body;
    const dish = await Dish.findById(req.params.id);

    if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
    }

    dish.name = name || dish.name;
    dish.description = description || dish.description;
    dish.price = price || dish.price;
    if (req.file) {
        dish.image = `/uploads/${req.file.filename}`;
    }

    await dish.save();
    res.json({ message: "Dish updated successfully", dish });
}));

// 🟢 Delete Dish and Remove from Restaurant
router.delete("/:id", asyncHandler(async (req, res) => {
    const dish = await Dish.findById(req.params.id);

    if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
    }

    // 🔹 Remove dish from Restaurant's dishes array
    await Restaurant.findByIdAndUpdate(dish.restaurant, {
        $pull: { dishes: dish._id }
    });

    await dish.deleteOne();
    res.json({ message: "Dish deleted successfully" });
}));

export default router;
