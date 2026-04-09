import Order from "../models/orderModel.js";

// CREATE ORDER (COD ONLY)
export const createOrder = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      area,
      postalCode,
      emergencyNumber,
      items,
      totalAmount,
    } = req.body;

    if (!name || !phone || !address || !area || !postalCode || !items || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const fullAddress = `${address}, ${area}, ${postalCode}`;

    const order = await Order.create({
      name,
      phone,
      address: fullAddress,
      emergencyNumber,
      items,
      totalAmount,
      paymentMethod: "COD",
      status: "pending",
    });

    res.status(201).json({ success: true, order });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ORDER STATUS (pending, delivered, cancelled)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["pending", "paid", "cancelled"].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid status. Allowed: pending, paid, cancelled" 
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE ORDER
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};