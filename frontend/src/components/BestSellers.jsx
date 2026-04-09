// BestSellers.jsx (Updated with reduced spacing)
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, TrendingUp, Eye } from "lucide-react";
import axios from "axios";

const BestSellers = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [bestSellers, setBestSellers] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/all");
        const filtered = res.data.products.filter(p => p.bestseller);
        setBestSellers(filtered);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const checkScrollPosition = () => {
    const container = scrollRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 20);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 20
      );
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      window.addEventListener("resize", checkScrollPosition);
      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, [bestSellers]);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const cardWidth = 300;
    const scrollAmount = cardWidth * 5;
    container.scrollBy({ 
      left: direction === "left" ? -scrollAmount : scrollAmount, 
      behavior: "smooth" 
    });
    setTimeout(checkScrollPosition, 300);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="py-10 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto mb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-3">
          <TrendingUp size={18} />
          <span className="text-sm font-semibold">Best Sellers</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Our Top Rated Products
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm">
          Discover our most loved items that customers can't get enough of
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative group">
        {showLeftArrow && bestSellers.length > 5 && (
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 bg-white shadow-xl p-2 md:p-3 rounded-full z-20 hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:scale-110 active:scale-95">
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
        )}

        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4" ref={scrollRef} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}>
          {bestSellers.map((product, index) => (
            <div key={product._id} onClick={() => handleProductClick(product._id)} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className="w-[300px] flex-shrink-0 bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="relative bg-gray-100 h-72 overflow-hidden">
                <img src={product.images?.[0]?.startsWith("http") ? product.images[0] : product.images?.[0] || "https://via.placeholder.com/400x500?text=Product"} alt={product.name} className="w-full h-full object-contain p-4 transition-transform duration-500" style={{ transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)' }} />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">Best Seller</div>
                {hoveredIndex === index && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-3 z-20 animate-in fade-in duration-300">
                    <button onClick={(e) => { e.stopPropagation(); handleProductClick(product._id); }} className="bg-white text-gray-800 px-5 py-2 rounded-full font-semibold transform transition-all duration-300 hover:bg-gray-900 hover:text-white hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg">
                      <Eye size={18} /> Quick View
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (<Star key={i} size={14} className={`${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300 fill-gray-300"}`} />))}
                  <span className="text-xs text-gray-500 ml-1">(128 reviews)</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-xl font-bold text-gray-900">Rs{product.price}</p>
                  {product.originalPrice && (<><p className="text-sm text-gray-400 line-through">Rs{product.originalPrice}</p><span className="text-xs text-green-600 font-semibold">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF</span></>)}
                </div>
                <button onClick={(e) => { e.stopPropagation(); }} className="w-full mt-3 bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        {showRightArrow && bestSellers.length > 5 && (
          <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 bg-white shadow-xl p-2 md:p-3 rounded-full z-20 hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:scale-110 active:scale-95">
            <ChevronRight size={24} className="text-gray-700" />
          </button>
        )}
      </div>

      {bestSellers.length > 5 && (
        <div className="flex justify-center gap-2 mt-4">
          <div className={`h-1.5 rounded-full transition-all duration-300 ${showLeftArrow ? 'w-6 bg-orange-500' : 'w-3 bg-gray-300'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${!showRightArrow ? 'w-6 bg-orange-500' : 'w-3 bg-gray-300'}`} />
        </div>
      )}

      {bestSellers.length > 0 && (
        <div className="text-center mt-8">
          <button onClick={() => navigate("/collection")} className="px-6 py-2 border-2 border-gray-800 text-gray-800 font-semibold rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95">View All Best Sellers</button>
        </div>
      )}

      {bestSellers.length === 0 && (<div className="text-center py-12"><p className="text-gray-500">No best sellers found</p></div>)}
    </div>
  );
};

export default BestSellers;