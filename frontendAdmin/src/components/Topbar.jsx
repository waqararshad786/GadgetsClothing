import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Topbar = () => {
  const { logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="w-full bg-white shadow-md sticky top-0 z-40">
      <div className="flex justify-between items-center px-4 md:px-8 py-3 md:py-4">
        
        {/* Left Side - Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm md:text-base">A</span>
          </div>
          <div>
            <h2 className="text-base md:text-xl font-bold text-gray-800">Admin Dashboard</h2>
            <p className="text-xs text-gray-500 hidden md:block">Welcome back, Admin</p>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Notification Bell */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-200">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-all duration-200"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">👤</span>
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">Admin</span>
              <svg className="w-4 h-4 text-gray-500 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <span>👤</span> Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <span>⚙️</span> Settings
                  </button>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <span>🚪</span> Logout
                  </button>
                </div>
                <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;