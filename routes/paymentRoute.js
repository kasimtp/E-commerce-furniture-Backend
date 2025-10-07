// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ✅ Create Razorpay order
// router.post("/orders/create", async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const options = {
//       amount: amount, // in paise
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };
//     const order = await razorpay.orders.create(options);
//     res.json({
//       success: true,
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Order creation failed" });
//   }
// });

// // ✅ Verify Razorpay signature after payment
// router.post("/orders/verify", async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//   const sign = razorpay_order_id + "|" + razorpay_payment_id;
//   const expectedSign = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(sign.toString())
//     .digest("hex");

//   if (razorpay_signature === expectedSign) {
//     res.json({ success: true });
//   } else {
//     res.status(400).json({ success: false, message: "Invalid signature" });
//   }
// });

// export default router;




// routes/paymentRoute.js
import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,   
});

// Create Order
router.post("/orders/creat4e", async (req, res) => {
  try {
    const { amount } = req.body; // amount in paise

    const options = {
      amount: amount, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("❌ Razorpay Order Error:", error);
    res.status(500).json({ message: "Order creation failed", error });
  }
});

// Verify Payment
router.post("/orders/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)  
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  } catch (error) {
    console.error("❌ Razorpay Verification Error:", error);
    res.status(500).json({ success: false, error });
  }
});

export default router;
