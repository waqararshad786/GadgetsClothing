import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Create order
router.post("/create", createOrder);

// Get all orders (Admin)
router.get("/all", getAllOrders);

// Update order status
router.put("/update/:id", updateOrderStatus);

// Get single order
router.get("/:orderId", getOrderById);


export default router;