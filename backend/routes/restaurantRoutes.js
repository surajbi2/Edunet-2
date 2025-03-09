import express from "express";
import asyncHandler from "express-async-handler";
import Restaurant from "../models/Restaurant.js";

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
}));


router.get("/:id", asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id).populate("vendor");

    if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
}));


export default router;
