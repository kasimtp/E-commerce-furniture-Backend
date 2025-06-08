 import mongoose from 'mongoose';

const wishListSchema = new mongoose.Schema({
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
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

const wishListModel = mongoose.model("wishlist", wishListSchema);
export default wishListModel;
