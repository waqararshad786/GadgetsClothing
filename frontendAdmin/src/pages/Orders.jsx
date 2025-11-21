import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api.js";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/orders/all`);
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Topbar + Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <Topbar />

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Orders</h2>

          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
           <div className="overflow-x-auto">
  <table className="min-w-full border border-gray-300 bg-white text-sm md:text-base">
    <thead className="bg-gray-100">
      <tr className="hidden md:table-row">
        <th className="p-2 md:p-3 border text-center">Order ID</th>
        <th className="p-2 md:p-3 border text-center">Customer</th>
        <th className="p-2 md:p-3 border text-center">Total</th>
        <th className="p-2 md:p-3 border text-center">Status</th>
        <th className="p-2 md:p-3 border text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {orders.map((order) => (
        <tr
          key={order._id}
          className="block md:table-row mb-4 md:mb-0 border rounded-lg md:rounded-none shadow md:shadow-none p-4 md:p-0"
        >
          <td className="block md:table-cell p-2 md:p-3 text-center">
            <span className="font-semibold md:hidden">Order ID: </span>
            {order._id.slice(-6)}
          </td>
          <td className="block md:table-cell p-2 md:p-3 text-center">
            <span className="font-semibold md:hidden">Customer: </span>
            {order.name}
          </td>
          <td className="block md:table-cell p-2 md:p-3 text-center">
            <span className="font-semibold md:hidden">Total: </span>${order.totalAmount}
          </td>
          <td className="block md:table-cell p-2 md:p-3 text-center">
            <span className="font-semibold md:hidden">Status: </span>
            <span
              className={`font-bold ${
                order.status === "paid" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {order.status === "paid" ? "Paid" : "Pending"}
            </span>
          </td>
          <td className="block md:table-cell p-2 md:p-3 text-center">
            <button
              onClick={() => navigate(`/orders/${order._id}`)}
              className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded hover:bg-blue-600 w-full md:w-auto"
            >
              View Details
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
