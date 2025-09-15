import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // ✅ 10 digit mobile validation
    },
    address1: {
      type: String,
      required: true,
      trim: true,
    },
    landmark: {
      type: String,
      default: "",
      trim: true,
    },
    pinCode: {
      type: String,
      required: true,
      match: /^[0-9]{6}$/, // ✅ Indian 6 digit pincode validation
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      default: "",
      trim: true,
    },
    country: {
      type: String,
      default: "India", // ✅ Default India
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ connect to User model
      required: true,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;
