const express = require('express')
const multer = require('multer');
const productModel = require('../models/productModel');
const router = express.Router()

const storage = multer .diskStorage({
    destination: (req, file, cb) => {
        cd(null, "upload/images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + Path.extname(file.originalname) )
    }
});

 router.get("/images/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    // console.log(imageName);
    
    const imagesFolder = path.join(__dirname, "../upload", "images");
    // console.log(imagesFolder);
    
    const imagePath = path.join(imagesFolder, imageName);
  
    // Check if the file exists and send it
    res.sendFile(imagePath);

  })


  router.get('/get-product',async(req,res)=>{
    try {
        const data = await productModel.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
})

const uploadImg = multer({storage: storage })

router.post('/post-product',uploadImg.single("image"),async(req,res)=>{
    try {
      const image_url = `http://localhost:5000/api/images/${req.file.filename}`;
        const {name,price} =req.body
        if (!name || !price ){
            return res.status(400).json({message: "Name,Price and Unit are required"})
        }
        const newData = await product.create({name:name, price:price,unit:unit,image: image_url})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.put('/put-product/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const updateData = await product.findOneAndUpdate({_id:id},req.body,{ new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete('/delete-product/:id', async (req, res) => {
    try {
      const id = req.body.id; // Get id from request body
      const deleteData = await product.findByIdAndDelete(id);
      if (!deleteData) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully", deletedProduct: deleteData });
    } catch (error) {
      res.status(400).json(error);
    }
  });


  module.exports = router
