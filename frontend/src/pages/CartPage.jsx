import React from "react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems = [], addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const increment = (item) => addToCart(item, item.size, 1);
  const decrement = (item) => {
    if (item.quantity === 1) removeFromCart(item._id, item.size);
    else addToCart(item, item.size, -1);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  if (!cartItems) return <p className="text-center mt-10">Loading cart...</p>;

  return (
    <div className="w-[90%] sm:w-[85%] lg:w-[75%] mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {cartItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 p-4 border rounded-lg shadow"
            >
          <img
            src={item.image?.[0] ? item.image[0] : "/placeholder.png"}
            alt={item.name || "Product"}
            className="w-24 h-24 object-cover rounded-lg"
          />



              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-semibold text-lg">{item.name || "Unnamed Product"}</h2>
                <p className="text-gray-500">Size: {item.size || "-"}</p>
                <p className="text-gray-900 font-bold">
                  Price: ${item.price || 0} × {item.quantity || 0} = ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrement(item)}
                  className="bg-gray-200 px-3 py-1 rounded-lg text-lg"
                >
                  -
                </button>
                <span>{item.quantity || 0}</span>
                <button
                  onClick={() => increment(item)}
                  className="bg-gray-200 px-3 py-1 rounded-lg text-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item._id, item.size)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right text-xl font-bold mt-4">
            Total: ${totalPrice.toFixed(2)}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => navigate("/order")}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
