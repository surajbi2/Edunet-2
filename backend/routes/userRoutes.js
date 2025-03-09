import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
    if (await User.findOne({ email })) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User Registered Successfully" });
}));

router.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid Credentials" });
    }

    res.json({
        message: "Login Successful",
        user: { username: user.username, email: user.email },
    });
}));

export default router;
