import mongoose  from "mongoose";


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true,unique: true},
    password: {type: String, required: true},

  
    // address: { type: Object, default: { line1: "", line2: "" } },
  
    // dob: { type: String, default: "Not selected"},
  
    // gender: { type: String, default: "Not selected" },
    phone: {type: Array, default: "00000000000"}
  });
  const userModel = mongoose.models.user || mongoose.model("user", userSchema);

  export default userModel;

