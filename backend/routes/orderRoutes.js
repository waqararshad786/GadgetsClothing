import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Create new order
router.post("/create", createOrder);

// Get all orders (Admin)
router.get("/all", getAllOrders);

// Get orders of a specific user
router.get("/user/:userId", getUserOrders);

// Update order status (Admin)
router.put("/update/:id", updateOrderStatus);

// Get single order (This MUST be last)
router.get("/:orderId", getOrderById);

export default router;
