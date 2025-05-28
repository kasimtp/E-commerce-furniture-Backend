 
 import express from "express";
 import mongoose from 'mongoose';
 import cartModel from '../models/cartModel.js'
 const router = express.Router();
 const port = 5000 

 router.get('/wish-list', async (req,res) => {

      const { user, product, dateAdded } = req.body;

  if (!user || !product) {
    return res.status(400).json({ error: "Missing user or product ID" });
  }

    try {
    const wishItem = new cartModel({
      user,
      product,
      dateAdded: dateAdded || new Date(), // fallback to now
    });

    const saved = await wishItem.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Add to Wish list error:", err);
    res.status(500).json({ error: "Failed to Wish list", details: err.message });
  }
    
 })