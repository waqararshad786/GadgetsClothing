import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; // path sahi ho
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();


app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(express.json()); 


// app.use("/uploads", express.static("uploads"));




app.use("/api/orders", orderRoutes);

app.use("/api/products", productRoutes);



connectDB();


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
