import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api";

const PaymentPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const amount = query.get("amount");
  const navigate = useNavigate();

  const makePayment = async () => {
    try {
      const res = await axios.post(`${API_URL}/orders/create`, {
        items: JSON.parse(localStorage.getItem("cart")) || [],
        paymentMethod: "Online Payment",
      });

      if (res.data.success) {
        localStorage.removeItem("cart");
        alert("Payment successful & order placed!");
        navigate("/orders");
      }
    } catch (err) {
      alert("Payment failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Online Payment</h2>
      <p>Total Amount: <strong>Rs {amount}</strong></p>

      <button onClick={makePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
