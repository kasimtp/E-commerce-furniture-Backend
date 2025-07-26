//  import express from 'express';
// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import productModel from '../models/productModel.js';
// import { v2 as cloudinary } from 'cloudinary';

// const router = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'temp'),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// });
// const uploadImg = multer({ storage });

// router.post('/post-product', uploadImg.single('image'), async (req, res) => {
//   try {
//     const { name, price, category, description  } = req.body;
//     if (!name || !price || !req.file || !category || !description  ) {
//       return res.status(400).json({ message: 'Name, price, and image etc  required' });
//     }

//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'ecommerce-products'
//     });

//     fs.unlinkSync(req.file.path);

//     const newProduct = await productModel.create({
//       name,
//       price,
//       category,
//       description,
//       image: result.secure_url
//     });

//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ error: error.message || 'Upload failed' });
//   }
// });

// router.get('/get-product', async (req, res) => {
//   try {
//     const data = await productModel.find();
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

// router.put('/put-product/:id', async (req, res) => {
//   try {
//     const updatedData = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updatedData);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

// router.delete('/delete-product/:id', async (req, res) => {
//   try {
//     const deleted = await productModel.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: 'Product not found' });
//     res.status(200).json({ message: 'Deleted', deleted });
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

// router.get('/product/:id', async (req, res) => {
//   try {
//     const product = await productModel.findById(req.params.id);
//     if (!product) return res.status(404).json({ error: 'Product not found' });
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ error: 'Fetch failed' });
//   }
// });

// export default router;











import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import productModel from '../models/productModel.js';
import { cloudinary } from '../config/cloudinary.js';

const router = express.Router();

// __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup (store temporarily)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "temp"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const uploadImg = multer({ storage: storage });

// 🔄 POST: Create Product and Upload Image to Cloudinary
router.post('/post-product', uploadImg.single("image"), async (req, res) => {
  try {
    const { name, price, category ,description} = req.body;  

    if (!name || !price || !req.file) {
      return res.status(400).json({ message: "Name, Price and image required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce-products",
    });

    fs.unlinkSync(req.file.path); // delete local file

    const newProduct = await productModel.create({
      name,
      price,
      category,
      description,
      image: result.secure_url,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message || "Upload failed" });
  }
});

// GET all products
router.get('/get-product', async (req, res) => {   
  try {
    const data = await productModel.find();
    
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

// console.log("getd`ta",data);


// PUT: Update product
router.put('/put-product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = await productModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE: Product
router.delete('/delete-product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await productModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Deleted", deleted });
  } catch (error) {
    res.status(400).json(error);
  }
});

// GET: Single Product
router.get('/product/:id', async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

export default router;






// import express from 'express';
// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import productModel from '../models/productModel.js';
// import { v2 as cloudinary } from 'cloudinary';

// const router = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ✅ Create temp directory if not exists
// const tempDir = path.join(__dirname, '../temp');
// if (!fs.existsSync(tempDir)) {
//   fs.mkdirSync(tempDir);
// }

// // ✅ Multer disk storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, tempDir),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });
// const uploadImg = multer({ storage });

// router.post('/post-product', uploadImg.single('image'), async (req, res) => {
//   try {
//     const { name, price, category, description } = req.body;
//     if (!name || !price || !req.file || !category || !description) {
//       return res.status(400).json({ message: 'All fields including image are required' });
//     }

//     // ✅ Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'ecommerce-products'
//     });

//     // ✅ Delete temp image after upload
//     fs.unlinkSync(req.file.path);

//     const newProduct = await productModel.create({
//       name,
//       price,
//       category,
//       description,
//       image: result.secure_url,
//     });

//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ error: error.message || 'Upload failed' });
//   }
// });

// export default router;






// import express from 'express';
// import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';
// import productModel from '../models/productModel.js';

// const router = express.Router();

// // ✅ Use memoryStorage (No file system involved)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post('/post-product', upload.single('image'), async (req, res) => {
//   try {
//     const { name, price, category, description } = req.body;

//     // Validation
//     if (!name || !price || !req.file || !category || !description) {
//       return res.status(400).json({ message: 'All fields including image are required' });
//     }

//     // Convert buffer to base64
//     const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

//     // Upload to cloudinary
//     const result = await cloudinary.uploader.upload(fileStr, {
//       folder: 'ecommerce-products',
//     });

//     const newProduct = await productModel.create({
//       name,
//       price,
//       category,
//       description,
//       image: result.secure_url,
//     });

//     res.status(201).json(newProduct);
//   } catch (error) {
//     console.error('❌ Upload Error:', error);
//     res.status(500).json({ message: error.message || 'Server Error' });
//   }
// });

// export default router;

