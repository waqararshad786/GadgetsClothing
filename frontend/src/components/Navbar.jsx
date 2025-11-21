import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const { cartItems } = useCart();
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white sticky top-0 py-2 z-50 shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-extrabold text-blue-600">
          Ai Clothing
        </Link>

        <ul className="hidden md:flex gap-8 text-lg font-medium">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/collection" className="hover:text-blue-600">Collection</Link></li>
          <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
          <li><Link to="/show-products" className="hover:text-blue-600">Products</Link></li>
        </ul>

        <div className="hidden md:flex items-center gap-5">
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>

          {isSignedIn ? (
            <UserButton userProfileMode="modal" afterSignOutUrl="/" appearance={{elements: {closeButton: "block"}}} />
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Login</Link>
          )}
        </div>

        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>☰</button>
      </div>

      {open && (
        <div className="md:hidden bg-white px-6 pb-4 shadow-md">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/collection" onClick={() => setOpen(false)}>Collection</Link></li>
            <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
             <li><Link to="/show-products" onClick={() => setOpen(false)} >Products</Link></li>
          </ul>

          <div className="flex justify-between items-center mt-6">
            <div onClick={() => { setOpen(false); navigate("/cart"); }} className="relative cursor-pointer">
              <ShoppingCart size={28} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>

            {isSignedIn ? (
              <UserButton userProfileMode="modal" afterSignOutUrl="/" appearance={{elements: {closeButton: "block"}}} />
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
