import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: [String],
});

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    emergencyNumber: { type: String },

    // Payment method (COD / ONLINE)
    paymentMethod: { 
      type: String, 
      required: true,
      enum: ["COD", "ONLINE"]
    },

    // Payment status (Pending / Paid)
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    items: [itemSchema],
    totalAmount: { type: Number, required: true },

    // Order processing status
    status: { 
      type: String, 
      default: "pending" 
      // You can later use: pending, shipped, delivered, cancelled
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
