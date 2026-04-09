import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    if (!paymentMethod) return alert("Please select a payment method.");
    
    if (paymentMethod === "cod") {
      alert("Your order will be delivered within 2 to 3 days.");
      clearCart();
      setOrderPlaced(true);
    } else if (paymentMethod === "online") {
      alert("Online Payment Form Placeholder (Implement payment gateway here)");
      // You can integrate Stripe / Razorpay etc.a
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
        <p>Your order has been placed successfully.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      {cartItems.length > 0 && (
        <div className="space-y-6">
          {/* Delivery Details */}
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Delivery Details</h2>
            <input type="text" placeholder="Full Name" className="border w-full mb-2 p-2 rounded" />
            <input type="text" placeholder="Address" className="border w-full mb-2 p-2 rounded" />
            <input type="text" placeholder="Near Famous Area" className="border w-full mb-2 p-2 rounded" />
            <input type="text" placeholder="Emergency Number" className="border w-full mb-2 p-2 rounded" />
            <input type="text" placeholder="Post Code" className="border w-full mb-2 p-2 rounded" />
          </div>

          {/* Payment Options */}
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Online Payment
              </label>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
