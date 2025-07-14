import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1
  }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;