import express from 'express';
import { getProducts, addProduct } from '../controllers/productController.js';

const productrouter = express.Router();

productrouter.get('/', getProducts);
productrouter.post('/', addProduct);

export default router;
