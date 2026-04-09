import Product from "../models/productModel.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name & price required" });
    }

    const parsedSizes =
      typeof sizes === "string" ? JSON.parse(sizes) : sizes;

    const images = req.files ? req.files.map((file) => file.path) : [];

    const product = await Product.create({
      name,
      price,
      description,
      category,
      subCategory,
      sizes: parsedSizes || [],
      bestseller: bestseller === "true" || bestseller === true,
      images,
    });

    res.status(201).json({ message: "Product added", product });

  } catch (err) {
    console.error("PRODUCT ERROR:", err); // 🔥 DEBUG
    res.status(500).json({ message: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json({ products });
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json({ product });
};

export const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files?.length > 0) {
      updateData.images = req.files.map((f) => f.path);
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ product: updated });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};