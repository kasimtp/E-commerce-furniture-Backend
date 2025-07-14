import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import productModel from '../models/productModel.js';
const router = express.Router();
const port= 5000

// __dirname support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploadImg = multer({ storage: storage });

// Serve images
router.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "../upload/images", imageName);
  res.sendFile(imagePath);
});

// Get all products
router.get('/get-product', async (req, res) => {
  try {
    const data = await productModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});


// Create new product
router.post('/post-product', uploadImg.single("image"), async (req, res) => {
  try {
    const image_url = `http://localhost:5000/api/images/${req.file.filename}`;
    const { name, price,category } = req.body;

    if (!name || !price ) {
      return res.status(400).json({ message: "Name, Price and category  are required" });
    }

    const newData = await productModel.create({
      name,
      price,
      image: image_url ,
      category
    });

    

    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update product
router.put('/put-product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = await productModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updateData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete product
router.delete('/delete-product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await productModel.findByIdAndDelete(id);
    if (!deleteData) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", deletedProduct: deleteData });
  } catch (error) {
    res.status(400).json(error);
  }
});

//add photo data in products page to product detiels page

router.get('/product/:id', async (req,res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if(!product )return res.status(404).json({error: "Product not found"});
    res.json(product)
  } catch (error) { res.status(500).json({error: "Failed to fetch product"})
    
  }
})

export default router;