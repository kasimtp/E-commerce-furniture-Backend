import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";


//app config
const app = express();
const port = process.env.PORT || 4000;


//middlewares
app.use(express.json());
app.use(cors());


// API Routes
app.get("/", (req, res) => {
    res.send("API WORKING very GOOD");
  });


  // Start server
app.listen(port, () => console.log(`Server started on port ${port}`));