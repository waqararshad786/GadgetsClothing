import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../api.js";
import Topbar from "../../components/admin/Topbar.jsx";
import Sidebar from "../../components/admin/Sidebar.jsx";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders/${id}`);
      setOrder(res.data.order);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const updateOrderStatus = async (newStatus) => {
    setUpdating(true);
    try {
      await axios.put(`${API_URL}/orders/update/${id}`, { status: newStatus });
      setOrder({ ...order, status: newStatus });
      const statusText = newStatus === "paid" ? "Delivered" : newStatus === "cancelled" ? "Cancelled" : "Pending";
      alert(`Order status updated to ${statusText}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col md:flex-row h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gray-50">
          <Topbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Loading order details...</p>
            </div>
          </div>
        </div>
      </div>
    );

  if (!order)
    return (
      <div className="flex flex-col md:flex-row h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gray-50">
          <Topbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center bg-white rounded-xl p-6 shadow-lg max-w-md">
              <div className="text-5xl mb-3">🔍</div>
              <p className="text-red-500 font-semibold">Order not found.</p>
              <button onClick={() => navigate("/admin/orders")} className="mt-3 px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">
                Back to Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  const getStatusBadge = () => {
    if (order.status === "paid") {
      return { text: "Delivered", color: "bg-green-100 text-green-700", icon: "✅" };
    } else if (order.status === "cancelled") {
      return { text: "Cancelled", color: "bg-red-100 text-red-700", icon: "❌" };
    }
    return { text: "Pending", color: "bg-yellow-100 text-yellow-700", icon: "⏳" };
  };

  const status = getStatusBadge();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        
        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-4xl mx-auto">
            
            <button onClick={() => navigate("/admin/orders")} className="mb-3 flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
              <span>←</span> Back to Orders
            </button>

            <div className="mb-3 flex justify-end">
              <button onClick={fetchOrder} className="px-2 py-1 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 flex items-center gap-1">
                🔄 Refresh
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <p className="text-white/80 text-xs">Order Details</p>
                    <h1 className="text-xl font-bold text-white">Order #{order._id?.slice(-8)}</h1>
                  </div>
                  <div className={`mt-2 md:mt-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${status.color}`}>
                    <span className="text-xs">{status.icon}</span>
                    <span className="font-semibold text-xs">{status.text}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
              <div className="px-4 py-3">
                <h3 className="font-semibold text-gray-800 text-sm mb-2">Update Order Status</h3>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => updateOrderStatus("pending")} disabled={updating || order.status === "pending"} className="px-3 py-1.5 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition disabled:opacity-50">
                    {updating ? "Updating..." : "Mark as Pending"}
                  </button>
                  <button onClick={() => updateOrderStatus("paid")} disabled={updating || order.status === "paid"} className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition disabled:opacity-50">
                    {updating ? "Updating..." : "Mark as Delivered"}
                  </button>
                  <button onClick={() => updateOrderStatus("cancelled")} disabled={updating || order.status === "cancelled"} className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition disabled:opacity-50">
                    {updating ? "Updating..." : "Cancel Order"}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2">
                  <h2 className="text-white font-semibold text-sm flex items-center gap-1">
                    <span>👤</span> Customer Information
                  </h2>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 text-sm">📛</span>
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium text-gray-800 text-sm">{order.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 text-sm">📞</span>
                    <div>
                      <p className="text-xs text-gray-500">Phone Number</p>
                      <p className="font-medium text-gray-800 text-sm">{order.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 text-sm">📍</span>
                    <div>
                      <p className="text-xs text-gray-500">Delivery Address</p>
                      <p className="font-medium text-gray-800 text-sm">{order.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2">
                  <h2 className="text-white font-semibold text-sm flex items-center gap-1">
                    <span>💳</span> Payment & Order Info
                  </h2>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 text-sm">💵</span>
                    <div>
                      <p className="text-xs text-gray-500">Payment Method</p>
                      <p className="font-medium text-gray-800 text-sm capitalize">{order.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 text-sm">💰</span>
                    <div>
                      <p className="text-xs text-gray-500">Total Amount</p>
                      <p className="text-xl font-bold text-green-600">Rs{order.totalAmount?.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 text-sm">📅</span>
                    <div>
                      <p className="text-xs text-gray-500">Order Date</p>
                      <p className="font-medium text-gray-800 text-sm">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2">
                <h2 className="text-white font-semibold text-sm flex items-center gap-1">
                  <span>📦</span> Ordered Items
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Product</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">Size</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">Qty</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Price</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800 text-sm">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{item.size}</span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className="font-semibold text-sm">x{item.quantity}</span>
                        </td>
                        <td className="px-3 py-2 text-right text-gray-600 text-sm">Rs{item.price}</td>
                        <td className="px-3 py-2 text-right font-semibold text-gray-800 text-sm">Rs{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 border-t border-gray-200">
                    <tr>
                      <td colSpan="4" className="px-3 py-2 text-right font-semibold text-gray-800 text-sm">Grand Total:</td>
                      <td className="px-3 py-2 text-right text-lg font-bold text-green-600">Rs{order.totalAmount?.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;