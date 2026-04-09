import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api";
import { Truck, MapPin, Phone, User, CreditCard, Package } from "lucide-react";

const OrderPage = () => {
  const { cartItems, clearCart, setOrderDetails } = useCart();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    phone: "",
    address: "",
    area: "",
    postalCode: "",
    emergencyNumber: "",
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharges = 250;
  const totalAmount = subtotal + shippingCharges;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const createOrderInBackend = async () => {
    const orderData = {
      ...details,
      items: cartItems,
      subtotal: subtotal,
      shippingCharges: shippingCharges,
      totalAmount: totalAmount,
      paymentMethod: "COD",
    };
    return await axios.post(`${API_URL}/orders/create`, orderData);
  };

  const handlePlaceOrder = async () => {
    if (!details.name || !details.phone || !details.address || !details.area || !details.postalCode) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await createOrderInBackend();
      if (res.status === 201) {
        setOrderDetails(res.data.order);
        clearCart();
        setOrderConfirmed(true);
      }
    } catch (err) {
      alert("Order place error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !orderConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🛒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to proceed with checkout</p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  if (orderConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-2">Your order will be delivered within 2–3 days.</p>
          <p className="text-sm text-gray-500 mb-6">Thank you for shopping with Ai-Clothing!</p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Checkout</h1>
          <p className="text-gray-500 mt-1">Complete your order details</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Side - Delivery Details */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck size={16} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Delivery Details</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={details.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={details.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={details.address}
                      onChange={handleChange}
                      placeholder="Street, House No., Area"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area / Landmark <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={details.area}
                    onChange={handleChange}
                    placeholder="Near landmark or area name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={details.postalCode}
                    onChange={handleChange}
                    placeholder="Your postal code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="emergencyNumber"
                    value={details.emergencyNumber}
                    onChange={handleChange}
                    placeholder="Alternate contact number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              {/* Cart Items Preview */}
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <div>
                      <span className="text-gray-600">{item.name}</span>
                      <span className="text-gray-400 text-xs ml-2">x{item.quantity}</span>
                      <p className="text-xs text-gray-400">Size: {item.size || "M"}</p>
                    </div>
                    <span className="font-semibold">Rs{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>Rs{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Charges</span>
                  <span>Rs{shippingCharges}</span>
                </div>
              </div>

              <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-blue-600">Rs{totalAmount.toFixed(2)}</span>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                  <CreditCard size={14} />
                  Payment Method: Cash on Delivery
                </p>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Placing Order..." : "Place Order (COD)"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;