import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";
import { API_URL } from "../api.js";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

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

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    </div>
  );

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const deliveredOrders = orders.filter(o => o.status === "paid").length;
  const cancelledOrders = orders.filter(o => o.status === "cancelled").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const updateOrderStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const response = await axios.put(`${API_URL}/orders/update/${id}`, { status: newStatus });
      
      if (response.status === 200) {
        // Update local state immediately
        setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o));
        
        const statusText = newStatus === "paid" ? "Delivered" : newStatus === "cancelled" ? "Cancelled" : "Pending";
        alert(`✅ Order ${statusText} successfully!`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update order");
    } finally {
      setUpdatingId(null);
    }
  };

  const stats = [
    { title: "Total Orders", value: totalOrders, icon: "📦", color: "from-blue-500 to-cyan-500" },
    { title: "Pending Orders", value: pendingOrders, icon: "⏳", color: "from-yellow-500 to-orange-500" },
    { title: "Delivered Orders", value: deliveredOrders, icon: "✅", color: "from-green-500 to-emerald-500" },
    { title: "Cancelled Orders", value: cancelledOrders, icon: "❌", color: "from-red-500 to-pink-500" },
    { title: "Total Revenue", value: `Rs${totalRevenue.toLocaleString()}`, icon: "💰", color: "from-purple-500 to-indigo-500" },
  ];

  const getStatusBadge = (status) => {
    if (status === "paid") return { text: "Delivered", color: "bg-green-100 text-green-700" };
    if (status === "cancelled") return { text: "Cancelled", color: "bg-red-100 text-red-700" };
    return { text: "Pending", color: "bg-yellow-100 text-yellow-700" };
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-auto p-4">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500 text-sm">Welcome back! Here's what's happening with your store today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <span className="text-xl">{stat.icon}</span>
                    </div>
                    <span className="text-xs text-gray-400">This month</span>
                  </div>
                  <p className="text-gray-500 text-xs mb-1">{stat.title}</p>
                  <p className={`text-xl font-bold ${
                    stat.title === "Pending Orders" ? "text-yellow-600" :
                    stat.title === "Delivered Orders" ? "text-green-600" :
                    stat.title === "Cancelled Orders" ? "text-red-600" :
                    stat.title === "Total Revenue" ? "text-purple-600" : "text-gray-800"
                  }`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`h-0.5 bg-gradient-to-r ${stat.color}`}></div>
              </div>
            ))}
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-md font-semibold text-gray-800">Recent Orders</h2>
                <button 
                  onClick={() => window.location.href = "/orders"} 
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  View All Orders →
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Order ID</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Customer</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Amount</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.slice(0, 10).map((order) => {
                    const status = getStatusBadge(order.status);
                    return (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-mono text-gray-900">#{order._id?.slice(-6)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">{order.name?.charAt(0) || "G"}</span>
                            </div>
                            <span className="text-sm text-gray-700">{order.name || "Guest"}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-semibold text-gray-900">Rs{order.totalAmount}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${status.color}`}>
                            {status.text}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            {/* View Button */}
                            <button 
                              onClick={() => window.location.href = `/orders/${order._id}`}
                              className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                            >
                              View
                            </button>

                            {/* Deliver Button - Only for pending orders */}
                            {order.status === "pending" && (
                              <button 
                                onClick={() => updateOrderStatus(order._id, "paid")}
                                disabled={updatingId === order._id}
                                className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 disabled:opacity-50"
                              >
                                {updatingId === order._id ? "..." : "Deliver"}
                              </button>
                            )}

                            {/* Cancel Button - For pending and delivered orders */}
                            {(order.status === "pending" || order.status === "paid") && (
                              <button 
                                onClick={() => updateOrderStatus(order._id, "cancelled")}
                                disabled={updatingId === order._id}
                                className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50"
                              >
                                {updatingId === order._id ? "..." : "Cancel"}
                              </button>
                            )}

                            {/* Restore Button - For cancelled orders */}
                            {order.status === "cancelled" && (
                              <button 
                                onClick={() => updateOrderStatus(order._id, "pending")}
                                disabled={updatingId === order._id}
                                className="px-2 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 disabled:opacity-50"
                              >
                                {updatingId === order._id ? "..." : "Restore"}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-gray-500 text-sm">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Table Footer */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>Showing last {Math.min(orders.length, 10)} of {orders.length} orders</span>
                <button 
                  onClick={fetchOrders}
                  className="text-blue-600 hover:text-blue-700"
                >
                  🔄 Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;