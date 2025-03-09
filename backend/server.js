import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import asyncHandler from "express-async-handler";

import userRoutes from "./routes/userRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import dishRoutes from "./routes/dishRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.use("/users", userRoutes);
app.use("/vendors", vendorRoutes);
app.use("/dishes", dishRoutes);
app.use("/restaurants", restaurantRoutes);

app.use("/uploads", express.static("uploads"));

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
