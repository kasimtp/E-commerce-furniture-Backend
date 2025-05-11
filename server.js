import express from "express";
import cors from "cors";
import "dotenv/config";
import  connectDB from './config/mongodb.js'



//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB()


//middlewares
app.use(express.json());
app.use(cors());


// API Routes
app.get("/", (req, res) => {
    res.send("API WORKING very GOOD");
  });


  // Start server
app.listen(port, () => console.log(`Server started on port ${port}`));