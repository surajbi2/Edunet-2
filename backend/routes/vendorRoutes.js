import express from "express";
import asyncHandler from "express-async-handler";
import Vendor from "../models/Vendor.js";
import Restaurant from "../models/Restaurant.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", asyncHandler(async (req, res) => {
    const { restaurantName, email, password } = req.body;

    if (await Vendor.findOne({ email })) {
        return res.status(400).json({ message: "Vendor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = new Vendor({
        email,
        password: hashedPassword,
    });

    await vendor.save();

    const restaurant = new Restaurant({
        name: restaurantName,
        vendor: vendor._id,
    });

    await restaurant.save();

    vendor.restaurant = restaurant._id;
    await vendor.save();

    res.status(201).json({
        message: "Vendor Registered Successfully",
        vendorId: vendor._id,
        restaurantId: restaurant._id,
    });
}));


router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email }).populate("restaurant");

    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    res.json({
      message: "Login Successful",
      vendor: {
        restaurantId: vendor.restaurant?._id.toString() || null,
        restaurantName: vendor.restaurant.name,
        email: vendor.email,
      },
    });
  })
);

export default router;
