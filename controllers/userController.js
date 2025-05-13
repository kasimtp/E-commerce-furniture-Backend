import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//api to resgiter user

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if ((!name || !email || !password)) {
      return res.json({ success: false, message: "missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "password must be at least 6 characters" });
    }
    const existtingUser = await userModel.findOne({ email });

    if (existtingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = userModel(userData);
    const user = await newUser.save();

    //create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token , message:"user registered successfull" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for using login

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
      }
  
      // Check if user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: "User not found" });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid password" });
      }
  
      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });
  
      res.status(200).json({ success: true, token, message: "Login successful" });
  
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

export {registerUser,loginUser};
