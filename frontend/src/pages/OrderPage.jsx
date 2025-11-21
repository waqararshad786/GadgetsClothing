import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import axios from "axios";
import { API_URL } from "../api";

const OrderPage = () => {
  const { cartItems, clearCart, setOrderDetails } = useCart();

  const [details, setDetails] = useState({
    name: "",
    phone: "",
    address: "",
    area: "",
    postalCode: "",
    emergencyNumber: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const createOrderInBackend = async () => {
    const orderData = {
      ...details,
      items: cartItems,
      totalAmount,
      paymentMethod,
    };
    return await axios.post(`${API_URL}/orders/create`, orderData);
  };

  const handlePlaceOrder = async () => {
    if (!details.name || !details.phone || !details.address || !details.area || !details.postalCode) {
      alert("Please fill all required fields");
      return;
    }

    if (paymentMethod === "ONLINE") {
      setShowPaymentForm(true);
      return;
    }

    try {
      const res = await createOrderInBackend();
      if (res.status === 201) {
        setOrderDetails(res.data.order);
        clearCart();
        setOrderConfirmed(true);
      }
    } catch (err) {
      alert("Order place error");
    }
  };

  const handleOnlinePayment = async (e) => {
    e.preventDefault();
    try {
      const res = await createOrderInBackend();
      if (res.status === 201) {
        setOrderDetails(res.data.order);
        clearCart();
        setOrderConfirmed(true);
        setShowPaymentForm(false);
      }
    } catch (err) {
      alert("Something went wrong after payment.");
    }
  };

  if (cartItems.length === 0 && !orderConfirmed)
    return <p className="text-center mt-10 text-gray-400">Your cart is empty.</p>;

  return (
    <div className="w-full min-h-screen flex justify-center items-start py-12 text-white">
      
      {/* DARK CARD */}
      <div className="w-[90%] sm:w-[70%] lg:w-[50%] rounded-3xl p-8 bg-gray-900 shadow-2xl border border-gray-700">

        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">
          Checkout
        </h1>

        {/* CART ITEMS */}
        {cartItems.length > 0 && (
          <div className="mb-8 p-5 rounded-2xl border border-gray-700 shadow-lg bg-gray-800">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    Size: {item.size || "M"} • Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-yellow-300">${item.price * item.quantity}</p>
              </div>
            ))}
            <hr className="border-gray-700 my-3" />
            <p className="text-right text-xl font-bold text-yellow-300">
              Total: ${totalAmount}
            </p>
          </div>
        )}

        {/* USER DETAILS */}
        {!orderConfirmed && (
          <div className="p-6 rounded-2xl border border-gray-700 shadow-xl bg-gray-900">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Your Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input className="input-dark" type="text" name="name" placeholder="Full Name" value={details.name} onChange={handleChange} />
              <input className="input-dark" type="text" name="phone" placeholder="Phone Number" value={details.phone} onChange={handleChange} />
              <input className="input-dark col-span-2" type="text" name="address" placeholder="Address" value={details.address} onChange={handleChange} />
              <input className="input-dark" type="text" name="area" placeholder="Area / Landmark" value={details.area} onChange={handleChange} />
              <input className="input-dark" type="text" name="postalCode" placeholder="Postal Code" value={details.postalCode} onChange={handleChange} />
              <input className="input-dark" type="text" name="emergencyNumber" placeholder="Emergency Number (Optional)" value={details.emergencyNumber} onChange={handleChange} />
            </div>

            {/* PAYMENT METHOD */}
            <div className="mt-5">
              <h3 className="mb-2 font-medium text-yellow-400">Payment Method</h3>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input type="radio" value="COD" checked={paymentMethod === "COD"} onChange={(e) => { setPaymentMethod(e.target.value); setShowPaymentForm(false); }} />
                  COD
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" value="ONLINE" checked={paymentMethod === "ONLINE"} onChange={(e) => setPaymentMethod(e.target.value)} />
                  Online Payment
                </label>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 py-3 rounded-xl font-bold bg-yellow-500 text-gray-900 hover:bg-yellow-400 transition"
            >
              {paymentMethod === "ONLINE" ? "Continue to Payment" : "Place Order"}
            </button>

            {/* ONLINE PAYMENT FORM */}
            {showPaymentForm && paymentMethod === "ONLINE" && (
              <div className="mt-6 p-6 rounded-xl border border-gray-700 shadow-lg bg-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">Online Payment</h3>
                <form onSubmit={handleOnlinePayment} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className="input-dark" placeholder="Card Holder Name" required />
                  <input className="input-dark" placeholder="Card Number" maxLength={16} required />
                  <input className="input-dark" placeholder="Expiry Date (MM/YY)" required />
                  <input className="input-dark" placeholder="CVV" maxLength={3} required />
                  <button type="submit" className="col-span-2 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-gray-900 font-bold transition">
                    Pay ${totalAmount}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {orderConfirmed && (
          <div className="mt-6 text-center text-green-300 bg-green-900/30 border border-green-600/30 p-4 rounded-xl">
            Your order will be delivered within 2–3 days.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
