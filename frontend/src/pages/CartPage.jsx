import React from "react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from "lucide-react";

const CartPage = () => {
  const { cartItems = [], addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const increment = (item) => addToCart(item, item.size, 1);
  const decrement = (item) => {
    if (item.quantity === 1) removeFromCart(item._id, item.size);
    else addToCart(item, item.size, -1);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );
  
  const shippingCharges = 250;
  const totalPrice = subtotal + shippingCharges;

  const getImage = (img) => {
    if (!img) return "https://via.placeholder.com/100x100?text=Product";
    return img.startsWith("http") ? img : img;
  };

  if (!cartItems) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">Loading cart...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Your Cart</h1>
          <p className="text-gray-500 mt-1">{cartItems.length} items in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
            <button
              onClick={() => navigate("/collection")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-center p-4 gap-4">
                    
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={getImage(item.image?.[0])}
                        alt={item.name || "Product"}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="font-semibold text-lg text-gray-800">{item.name || "Unnamed Product"}</h2>
                      <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500">
                        <span>Size: <span className="font-medium text-gray-700">{item.size || "-"}</span></span>
                        <span>Price: <span className="font-medium text-gray-700">Rs{item.price || 0}</span></span>
                      </div>
                      <p className="text-gray-900 font-bold mt-2">
                        Total: Rs{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decrement(item)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity || 0}</span>
                      <button
                        onClick={() => increment(item)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item._id, item.size)}
                      className="text-red-500 hover:text-red-700 transition p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                
                <div className="space-y-3 border-b border-gray-200 pb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold">Rs{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Charges</span>
                    <span className="font-semibold">Rs{shippingCharges}</span>
                  </div>
                </div>

                <div className="flex justify-between mt-4 pb-4 border-b border-gray-200">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-blue-600">Rs{totalPrice.toFixed(2)}</span>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => navigate("/order")}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <CreditCard size={18} />
                    Proceed to Checkout
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full border-2 border-red-500 text-red-500 py-3 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Clear Cart
                  </button>

                  <button
                    onClick={() => navigate("/collection")}
                    className="w-full text-gray-500 py-2 rounded-xl font-medium hover:text-blue-600 transition text-sm"
                  >
                    Continue Shopping →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;