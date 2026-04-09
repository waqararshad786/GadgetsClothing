import React from "react";
import { Facebook, Instagram, Mail, Phone, MapPin, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
      >
        <ArrowUp size={20} />
      </button>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-16 pb-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ai Clothing
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              Thank you for shopping with Ai-Clothing! We're dedicated to bringing you the latest trends and top-quality products.
            </p>
            
            {/* Social Links - Facebook & Instagram */}
            <div className="flex gap-3 pt-2">
              <a 
                href="https://www.facebook.com/profile.php?id=61581837694041" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110"
              >
                <Facebook size={18} className="text-gray-300 hover:text-white" />
              </a>
              <a 
                href="https://www.instagram.com/ai_clothing1/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-all duration-300 hover:scale-110"
              >
                <Instagram size={18} className="text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-5 relative inline-block">
              Company
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500 mt-1"></span>
            </h2>
            <ul className="space-y-3">
              {["Home", "About us", "Contact us", "Privacy policy", "Return policy"].map((item, index) => (
                <li key={index}>
                  <a 
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-5 relative inline-block">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500 mt-1"></span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <Phone size={18} className="text-blue-400 mt-0.5 group-hover:scale-110 transition" />
                <p className="text-sm text-gray-400 group-hover:text-white transition">+92 314 0654083</p>
              </div>
              <div className="flex items-start gap-3 group">
                <Mail size={18} className="text-blue-400 mt-0.5 group-hover:scale-110 transition" />
                <p className="text-sm text-gray-400 group-hover:text-white transition">gadgetsclothing934@gmail.com</p>
              </div>
              <div className="flex items-start gap-3 group">
                <MapPin size={18} className="text-blue-400 mt-0.5 group-hover:scale-110 transition" />
                <p className="text-sm text-gray-400 group-hover:text-white transition">[AI 2326 Fashion Lane] :

Pindi Stop, Main Bazar, Lahore</p>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-5 relative inline-block">
              Stay Updated
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500 mt-1"></span>
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get special offers and updates
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center text-xs text-gray-500">
              Copyright 2024 © All Rights Reserved. Made with{" "}
              <Heart size={12} className="inline text-red-500 animate-pulse" /> by Ai Clothing
            </p>
            
            {/* Payment Methods */}
            <div className="flex gap-3">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-6 w-auto opacity-70 hover:opacity-100 transition" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-6 w-auto opacity-70 hover:opacity-100 transition" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="PayPal" className="h-6 w-auto opacity-70 hover:opacity-100 transition" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;