import express from "express";
import mongoose from 'mongoose';
import cartModel from "../models/cartModel.js";
const router = express.Router();
const port = 5000




// ✅ POST: Add item to cart
router.post("/post-cart", async (req, res) => {
  try {
    const { user, product, quantity
 } = req.body;
    if (!user || !product) {
      return res.status(400).json({ message: "User and Product are required" });
    }

    const newData = await cartModel.create({ user, product, quantity });
    res.status(201).json({
      message: "Cart item created successfully",
      cart: newData,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to add to cart", error });
  }
});

router.get('/get-cart/:userId', async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const data = await cartModel
      .find({ user: userId })
      .populate('user')
      .populate('product');

    res.status(200).json(data);
  } catch (error) {
    console.error("Cart fetch error:", error); // 👈 very important
    res.status(500).json({ error: "Failed to fetch cart", details: error.message });
  }
});






// ✅ GET: Get all cart items
// router.get("/get-cart", async (req, res) => {
//   try {
//     const data = await cartModel.find().populate("user").populate("product");
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to fetch all cart items", error });
//   }
// });

// ✅ PUT: Update a cart item by ID
// router.put("/put-cart/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updateData = await cartModel.findOneAndUpdate({ _id: id }, req.body, {
//       new: true,
//     });
//     res.status(200).json(updateData);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to update cart item", error });
//   }
// });

// ✅ DELETE: Remove a cart item by ID
// router.delete("/delete-cart/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const deleteData = await cartModel.findByIdAndDelete(id);
//     if (!deleteData) {
//       return res.status(404).json({ message: "Cart item not found" });
//     }
//     res.status(200).json({
//       message: "Cart item deleted successfully",
//       deletedCart: deleteData,
//     });
//   } catch (error) {
//     res.status(400).json({ message: "Failed to delete cart item", error });
//   }
// });

export default router;
