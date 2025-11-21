// Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Topbar with Menu Button */}
      <div className="md:hidden flex items-center justify-between bg-[#182233] text-white p-3">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center"
        >
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#182233] text-white p-5 flex flex-col gap-4
        w-64 transform transition-transform duration-300 z-50 shadow-lg
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        <h2 className="text-xl font-bold mb-4 hidden md:block">Admin Panel</h2>
        <Link
          to="/dashboard"
          className="hover:text-blue-300 py-2 px-2 rounded-md transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Dashboard
        </Link>
        <Link
          to="/orders"
          className="hover:text-blue-300 py-2 px-2 rounded-md transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Orders
        </Link>
        <Link
          to="/products"
          className="hover:text-blue-300 py-2 px-2 rounded-md transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Products
        </Link>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
