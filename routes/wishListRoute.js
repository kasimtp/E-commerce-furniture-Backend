import express from "express";
import wishListModel from "../models/wishListModel.js";

const router = express.Router();

// ➕ Add to Wishlist
router.post("/wish-list", async (req, res) => {
  const { user, product, dateAdded } = req.body;

  if (!user || !product) {
    return res.status(400).json({ error: "Missing user or product ID" });
  }

  try {
    const wishItem = new wishListModel({
      user,
      product,
      dateAdded: dateAdded || new Date(),
    });

    const saved = await wishItem.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Add to Wishlist error:", err);
    res.status(500).json({ error: "Failed to add to wishlist", details: err.message });
  }
});

// 📦 Get Wishlist by User ID
router.get("/get-wishlist/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await wishListModel
      .find({ user: userId })
      .populate("product");
    res.status(200).json(wishlist);
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

// ❌ Remove item from Wishlist
router.delete("/delete-wishlist/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await wishListModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }
    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (err) {
    console.error("Error deleting wishlist item:", err);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

export default router;
