import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
    category: {
    type: String,
    required: true,
  },
  
    description : {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  }
  
});

const productModel = mongoose.model('product', productSchema);

export default productModel;  