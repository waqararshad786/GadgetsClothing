import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api.js";
import Topbar from "../components/Topbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/orders/${id}`)
      .then((res) => {
        setOrder(res.data.order);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">Loading order details...</p>;

  if (!order)
    return <p className="text-center mt-10 text-red-500">Order not found.</p>;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Topbar + Content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <Topbar />

        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-full md:max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-4 md:p-6 space-y-6">

            {/* Heading */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                Order #{order._id.slice(-6)}
              </h1>
              <span
                className={`mt-2 md:mt-0 px-3 py-1 rounded-full font-semibold text-sm md:text-base ${
                  order.status === "paid"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status ||
                  (order.paymentMethod === "ONLINE" ? "paid" : "pending")}
              </span>
            </div>

            {/* Customer Info */}
            <div className="p-3 md:p-4 bg-gray-50 rounded-lg shadow-sm">
              <h2 className="text-md md:text-lg font-semibold text-gray-700 mb-2">
                Customer Information
              </h2>
              <p><span className="font-medium">Name:</span> {order.name}</p>
              <p><span className="font-medium">Phone:</span> {order.phone}</p>
              <p><span className="font-medium">Address:</span> {order.address}</p>
              <p><span className="font-medium">Emergency Number:</span> {order.emergencyNumber || "N/A"}</p>
            </div>

            {/* Payment Info */}
            <div className="p-3 md:p-4 bg-blue-50 rounded-lg shadow-sm">
              <h2 className="text-md md:text-lg font-semibold text-blue-700 mb-2">
                Payment & Order Info
              </h2>
              <p><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p>
              <p><span className="font-medium">Total Amount:</span> ${order.totalAmount}</p>
            </div>

            {/* Items */}
            <div>
              <h2 className="text-md md:text-lg font-semibold text-gray-700 mb-3">
                Ordered Items
              </h2>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 md:p-4 bg-gray-100 rounded-lg shadow-sm"
                  >
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-semibold">${item.price}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
