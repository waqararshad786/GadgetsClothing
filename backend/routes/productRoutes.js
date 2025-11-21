// routes/productRoutes.js
import express from "express";
import { 
  createProduct, 
  getAllProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// CREATE product
router.post("/create", upload.array("images", 5), createProduct);

// GET all products
router.get("/all", getAllProducts);

// GET single product
router.get("/:id", getProductById);

// UPDATE product
router.put("/update/:id", upload.array("images", 5), updateProduct);

// DELETE product
router.delete("/delete/:id", deleteProduct);

export default router;
