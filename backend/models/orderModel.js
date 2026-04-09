import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  _id: String,
  name: String,
  size: String,
  price: Number,
  quantity: Number,
  image: [String],
});

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    emergencyNumber: String,

    paymentMethod: {
      type: String,
      default: "COD",
    },

    items: [itemSchema],
    totalAmount: { type: Number, required: true },

    // Status: pending, paid (delivered), cancelled
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;