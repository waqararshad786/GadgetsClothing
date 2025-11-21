// controllers/productController.js
import Product from "../models/productModel.js";

// CREATE product
// CREATE product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, subCategory, sizes, bestseller, quantity } = req.body;

    // sizes ko parse karo agar string me aayi ho
    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;

    // images ko map karo agar files aayi ho
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const product = new Product({
      name,
      price,
      quantity: quantity || 1,
      description,
      category,
      subCategory,
      bestseller: bestseller === 'true' || bestseller === true,
      sizes: parsedSizes,
      images
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET single product
import mongoose from "mongoose";

export const getProductById = async (req, res) => {
  const { id } = req.params;

  // Check if ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


// UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { sizes, bestseller } = req.body;

    let updateData = { ...req.body };

    // parse sizes and bestseller
    if (sizes && typeof sizes === "string") updateData.sizes = JSON.parse(sizes);
    if (bestseller !== undefined) updateData.bestseller = bestseller === 'true' || bestseller === true;

    // handle images if uploaded
    if (req.files && req.files.length > 0) {
      const images = req.files.map(file => `/uploads/${file.filename}`);
      updateData.images = images;
    }

    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ message: "Product updated", product: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
