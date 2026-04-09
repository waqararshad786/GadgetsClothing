import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/create", upload.array("images", 5), createProduct);
router.get("/all", getAllProducts);
router.get("/:id", getProductById);
router.put("/update/:id", upload.array("images", 5), updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;