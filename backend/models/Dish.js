import mongoose from "mongoose";

const dishSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { 
      type: String, 
      required: true, 
      default: "pizza.jpg"
    },
    restaurant: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Restaurant",
      required: true 
    },
  },
  { timestamps: true }
);

const Dish = mongoose.model("Dish", dishSchema);
export default Dish;
