// Topbar.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const Topbar = () => {
  const { logout } = useAuth();

  return (
    <div className="w-full bg-white shadow-md p-3 md:p-4 flex justify-between items-center">
      <h2 className="text-base md:text-xl font-semibold">Admin Dashboard</h2>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md text-sm md:text-base hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
