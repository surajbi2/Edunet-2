//Importing required modules

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation
import bcrypt from "bcryptjs";
import os from "os";
// import localStorage from "localStorage";
dotenv.config();
//Middlewears

const app = express()
app.use(cors());
app.use(express.json());
const PORT = 5000 

console.log(process.env.MONGO_URI);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(
    () => console.log('DB connected...')
).catch(
    (err) => console.log(err)
)

//Register API
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password: hashedPassword })
        await user.save()
        console.log("User Registration completed...");
        return res.status(201).json({ message: "User Registered Successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

// Login API

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Token generated: ", token);
        res.json({ 
            message: "Login Successful", 
            token,
            user: { username: user.username, email: user.email }, 
        });

        console.log("User logged in: ", user.username);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


//Connecting Server
app.listen(PORT, () => console.log("Server running on port 5000"));
