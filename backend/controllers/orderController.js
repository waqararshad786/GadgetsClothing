import Order from "../models/orderModel.js";

// ================================
// CREATE NEW ORDER
// ================================
export const createOrder = async (req, res) => {
  try {
    const { name, phone, address, area, postalCode, emergencyNumber, items, totalAmount, paymentMethod } = req.body;

    if (!name || !phone || !address || !area || !postalCode || !items || !totalAmount || !paymentMethod) {
      return res.status(400).json({ success: false, message: "All required fields must be provided." });
    }

    const fullAddress = `${address}, ${area}, ${postalCode}`;

    // Set status based on payment method
    const status = paymentMethod === "ONLINE" ? "paid" : "pending";

    const order = await Order.create({
      name,
      phone,
      address: fullAddress,
      emergencyNumber: emergencyNumber || null,
      items,
      totalAmount,
      paymentMethod,
      status, // <-- use conditional status
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Order creation error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ================================
// GET ALL ORDERS (ADMIN)
// ================================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================================
// GET USER ORDERS
// ================================
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================================
// UPDATE ORDER STATUS (ADMIN)
// ================================
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
