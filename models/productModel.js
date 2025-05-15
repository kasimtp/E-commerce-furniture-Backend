import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
  },
  {
    timestapms: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
