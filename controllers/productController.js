import Product from '../models/productModel.js';

const getProducts = async (req, res) => {
    const products = await Product.find(); 
    res.json(products);
};

const addProduct = async (req, res) => {
    const { title, description, price, image } = req.body;
    const product = new Product({ title, description, price, image });
    const saved = await product.save();
    res.status(201).json(saved);
};

export { getProducts, addProduct };
