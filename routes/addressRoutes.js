import express from "express";
import Address from "../models/addressModel.js";

const router = express.Router();

// @desc   Save new address
// @route  POST /api/addresses
router.post("/", async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json({ message: "Address saved successfully", address });
  } catch (error) {
    res.status(400).json({ message: "Error saving address", error: error.message });
  }
});

// @desc   Get all addresses (optional)
// @route  GET /api/addresses
router.get("/", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
