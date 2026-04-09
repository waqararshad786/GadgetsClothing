import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { API_URL } from "../api.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

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

  const updateOrderStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await axios.put(`${API_URL}/orders/update/${id}`, { status: newStatus });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o));
      alert(`Order status updated to ${newStatus === "paid" ? "Delivered" : newStatus === "cancelled" ? "Cancelled" : "Pending"}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Topbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading orders...</p>
          </div>
        </div>
      </div>
    </div>
  );

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order._id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                          (statusFilter === "delivered" && order.status === "paid") ||
                          (statusFilter === "pending" && order.status === "pending") ||
                          (statusFilter === "cancelled" && order.status === "cancelled");
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    if (status === "paid") {
      return { text: "Delivered", color: "bg-green-100 text-green-700", icon: "✅" };
    } else if (status === "cancelled") {
      return { text: "Cancelled", color: "bg-red-100 text-red-700", icon: "❌" };
    }
    return { text: "Pending", color: "bg-yellow-100 text-yellow-700", icon: "⏳" };
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        
        <div className="flex-1 overflow-auto p-4">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-800">Orders</h1>
            <p className="text-gray-500 text-sm">Manage and track all customer orders</p>
          </div>

          {/* Refresh Button */}
          <div className="mb-3 flex justify-end">
            <button onClick={fetchOrders} className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition flex items-center gap-1">
              🔄 Refresh Orders
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-3 mb-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                  <input
                    type="text"
                    placeholder="Search by order ID or customer name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-56">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="text-4xl mb-3">📦</div>
              <p className="text-gray-500 text-sm">No orders found</p>
              {(searchTerm || statusFilter !== "all") && (
                <button onClick={() => { setSearchTerm(""); setStatusFilter("all"); }} className="mt-3 text-sm text-blue-600 hover:text-blue-700">
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Order ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Customer</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total Amount</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredOrders.map((order) => {
                      const status = getStatusBadge(order.status);
                      return (
                        <tr key={order._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-xs font-mono text-gray-900">#{order._id?.slice(-8)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">{order.name?.charAt(0) || "G"}</span>
                              </div>
                              <span className="text-sm text-gray-700">{order.name || "Guest"}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm font-semibold text-gray-900">Rs{order.totalAmount?.toLocaleString()}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${status.color}`}>
                              <span>{status.icon}</span>
                              {status.text}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <button onClick={() => navigate(`/orders/${order._id}`)} className="px-2 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition">
                                View Details
                              </button>
                              {order.status === "pending" && (
                                <>
                                  <button onClick={() => updateOrderStatus(order._id, "paid")} disabled={updatingId === order._id} className="px-2 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition disabled:opacity-50">
                                    {updatingId === order._id ? "Updating..." : "Delivered"}
                                  </button>
                                  <button onClick={() => updateOrderStatus(order._id, "cancelled")} disabled={updatingId === order._id} className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition disabled:opacity-50">
                                    {updatingId === order._id ? "Updating..." : "Cancel"}
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Table Footer */}
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span>Showing {filteredOrders.length} of {orders.length} orders</span>
                  <button onClick={fetchOrders} className="text-blue-600 hover:text-blue-700 text-xs">
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;