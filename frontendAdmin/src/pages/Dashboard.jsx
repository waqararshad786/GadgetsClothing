import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";
import { API_URL } from "../api.js";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/orders/all`)
      .then((res) => {
        setOrders(res.data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6 text-xl">Loading...</p>;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status !== "paid").length;
  const deliveredOrders = orders.filter((o) => o.status === "paid").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const markDelivered = async (id) => {
    try {
      await axios.put(`${API_URL}/orders/update/${id}`, { status: "paid" });
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? { ...order, status: "paid" } : order))
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update order");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Topbar */}
        <Topbar />

        {/* Dashboard Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Dashboard Overview</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-gray-600 text-lg">Total Orders</h2>
              <p className="text-2xl md:text-3xl font-bold">{totalOrders}</p>
            </div>

            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-gray-600 text-lg">Pending Orders</h2>
              <p className="text-2xl md:text-3xl font-bold text-yellow-600">{pendingOrders}</p>
            </div>

            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-gray-600 text-lg">Delivered Orders</h2>
              <p className="text-2xl md:text-3xl font-bold text-green-600">{deliveredOrders}</p>
            </div>

            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-gray-600 text-lg">Total Revenue</h2>
              <p className="text-2xl md:text-3xl font-bold text-blue-600">${totalRevenue}</p>
            </div>
          </div>

          {/* Recent Orders Table */}
          <h2 className="text-xl md:text-2xl font-bold mb-4">Recent Orders</h2>

<div className="overflow-x-auto">
  <table className="min-w-full bg-white shadow rounded-lg text-sm md:text-base">
    <thead className="bg-gray-100">
      <tr className="hidden md:table-row">
        <th className="p-3 border text-center">Order ID</th>
        <th className="p-3 border text-center">Customer</th>
        <th className="p-3 border text-center">Amount</th>
        <th className="p-3 border text-center">Status</th>
        <th className="p-3 border text-center">Actions</th>
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
            <span className="font-semibold md:hidden">Amount: </span>${order.totalAmount}
          </td>
          <td className="block md:table-cell p-2 md:p-3 text-center">
            <span className="font-semibold md:hidden">Status: </span>
            <span
              className={`font-bold ${
                order.status === "paid" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {order.status === "paid" ? "Delivered" : "Pending"}
            </span>
          </td>
          <td className="block md:table-cell p-2 md:p-3 text-center">
            {order.status !== "paid" ? (
              <button
                onClick={() => markDelivered(order._id)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-full md:w-auto"
              >
                Mark Delivered
              </button>
            ) : (
              <span className="text-green-600 font-semibold">Completed</span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


        </div>
      </div>
    </div>
  );
};

export default Dashboard;
