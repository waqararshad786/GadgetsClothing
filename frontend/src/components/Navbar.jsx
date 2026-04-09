import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { ShoppingCart, Menu, X, Home, Grid, Info, Phone, Package } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const { cartItems } = useCart();
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/collection", label: "Collection", icon: Grid },
    { to: "/about", label: "About", icon: Info },
    { to: "/contact", label: "Contact", icon: Phone },
    { to: "/show-products", label: "Products", icon: Package },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ai Clothing
              </span>
            </Link>

            {/* Desktop - Pages */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg transition ${
                    isActive(link.to)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop - Cart & Login */}
            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => navigate("/cart")} className="relative p-2">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-full">
                  Login
                </Link>
              )}
            </div>

            {/* ========== MOBILE ========== */}
            <div className="flex items-center gap-3 md:hidden">
              {/* Cart Icon */}
              <button onClick={() => navigate("/cart")} className="relative p-2">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* 3 Lines */}
              <button onClick={() => setOpen(!open)} className="p-2">
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t">
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                    isActive(link.to) ? "text-blue-600 bg-blue-50" : "text-gray-700"
                  }`}
                >
                  <link.icon size={20} />
                  {link.label}
                </Link>
              ))}
              <div className="border-t my-3"></div>
              {isSignedIn ? (
                <div className="flex items-center justify-between px-4 py-3">
                  <span>My Account</span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block text-center px-4 py-3 bg-blue-600 text-white rounded-xl"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="h-16"></div>
    </>
  );
};

export default Navbar;