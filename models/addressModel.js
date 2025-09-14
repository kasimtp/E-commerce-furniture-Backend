import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  addressLine1: { type: String, required: true },
  pinCode: { type: String, required: true },
  district: { type: String, required: true },
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);
export default Address;
