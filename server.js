




import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoutes.js'; 
import adminRouter from './routes/adminRoutes.js';
import cartRoute from './routes/cartRoute.js';
import wishListRoutes from './routes/wishListRoute.js';
import addressRoutes from './routes/addressRoutes.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect DB & Cloudinary
connectDB();
connectCloudinary();

// __dirname setup for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// ✅ FIXED CORS to allow multiple origins (include localhost:5174)
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",  // ✅ your frontend port
      "https://e-commerce-furniture-hhmq.vercel.app",
      undefined // for Postman or server-to-server
    ];
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Static route for local image serving
app.use('/upload/images', express.static(path.join(__dirname, 'upload/images')));

// Routes
app.use("/api/user", userRouter);
app.use("/api", productRouter);
app.use("/api/admin", adminRouter);
app.use("/api", cartRoute);
app.use("/api", wishListRoutes);
app.use("/api", productRouter);

app.use("/api/addresses", addressRoutes);



// Test Route
app.get("/", (req, res) => {
  res.send("✅ API WORKING very GOOD");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
