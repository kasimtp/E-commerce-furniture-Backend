import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoutes.js'; 
import adminRouter from './routes/adminRoutes.js'
import cartRoute from './routes/cartRoute.js'
import wishListRoutes from './routes/wishListRoute.js'


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();
connectCloudinary();

// Helper for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());
app.use('/upload/images', express.static(path.join(__dirname, 'upload/images')));

// Routes
app.use('/api/user', userRouter);
app.use('/api', productRouter);
app.use('/api/admin', adminRouter )
app.use('/api', cartRoute)
app.use( '/api', wishListRoutes)

// Test route
app.get("/", (req, res) => {
  res.send("API WORKING very GOOD");
});

app.listen(port, () => console.log(`✅ Server running on port ${port}`));
