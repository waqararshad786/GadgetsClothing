// models/productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  subCategory: { type: String },
  sizes: [String],
  bestseller: { type: Boolean, default: false },
  images: [String],
  quantity: { type: Number, default: 1 },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
