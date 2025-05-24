
const express from 'express'
const Router = express.Router()
const port = 500

Router.post('/ppost-cart',async(req,res)=>{
    try {
        const {user,product,quantity} =req.body
        if (!user || !product){
            return res.status(400).json({message: "User and Product are required "})
        }
        const newData = await Cart.create({user, product, quantity})
        res.status(201)
    } catch (error) {
        
    }
})

