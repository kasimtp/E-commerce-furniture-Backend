const cartModel = require("../models/cartModel");

const express = require("express");
const Router = express.Router();
const port = 500;

Router.post("/post-cart", async (req, res) => {
  try {
    const { user, product, quantity } = req.body;
    if (!user || !product) {
      return res
        .status(400)
        .json({ message: "User and Product are required " });
    }
    const newData = await cartModel.create({ user, product, quantity });
       res.status(201).json({
      message: "Cart item created successfully",
      cart: newData,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});


Router.get('/get-cart/:userId',async(req,res)=>{
    try {
        const userId = req.params.userId;
        const data = await cartModel.find({user: userId}).populate('user').populate('product');
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error)
        
    }
})

Router.get('/get-cart', async (req, res) => {
    try {
        const data = await cartModel.find()
            .populate('user')
            .populate('product');
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});

Router.put('/put-cart/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const updateData = await cartModel.findOneAndUpdate({_id:id},req.body,{ new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})

Router.delete('/delete-cart/:id', async (req, res) => {
    try {
      const id = req.params.id; 
      const deleteData = await cartModel.findByIdAndDelete(id);
      if (!deleteData) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully", deletedProduct: deleteData });
    } catch (error) {
      res.status(400).json(error);
    }
  });

  module.exports = Router

