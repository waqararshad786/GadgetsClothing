// LatestCollection.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, ShoppingBag, Star } from "lucide-react";
import axios from "axios";

const LatestCollection = () => {
  const navigate = useNavigate();
  const [latestProducts, setLatestProducts] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/all");
        const latest = res.data.products.slice(-8);
        setLatestProducts(latest);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="py-12 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
            <ShoppingBag size={16} />
            <span className="text-sm font-semibold">New Collection</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Latest Arrivals
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover our newest products added to the collection
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestProducts.map((item, index) => (
            <div
              key={item._id}
              onClick={() => handleProductClick(item._id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md 
                         hover:shadow-2xl transition-all duration-300 cursor-pointer
                         transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative bg-gray-100 h-64 overflow-hidden">
                <img
                  src={item.images?.[0]?.startsWith("http") 
                    ? item.images[0] 
                    : item.images?.[0] || "https://via.placeholder.com/400x500?text=Product"}
                  alt={item.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-500"
                  style={{
                    transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
                  }}
                />

                {/* New Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 
                              text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
                  New
                </div>

                {/* Quick View Overlay */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20
                                animate-in fade-in duration-300">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(item._id);
                      }}
                      className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold 
                               transform transition-all duration-300 hover:bg-gray-900 
                               hover:text-white hover:scale-105 active:scale-95
                               flex items-center gap-2 shadow-lg text-sm"
                    >
                      <Eye size={16} />
                      Quick View
                    </button>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={`${
                        i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(24)</span>
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600 
                               transition-colors duration-200 text-sm">
                  {item.name}
                </h3>

                {/* Price */}
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-bold text-gray-900">Rs{item.price}</p>
                  
                  {/* Add to Cart Icon */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic here
                    }}
                    className="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-800 
                             transition-all duration-300 transform hover:scale-110 active:scale-95"
                  >
                    <ShoppingBag size={14} />
                  </button>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 
                            rounded-2xl pointer-events-none transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {latestProducts.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/collection")}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gray-800 
                       text-gray-800 font-semibold rounded-full hover:bg-gray-800 
                       hover:text-white transition-all duration-300 transform 
                       hover:scale-105 active:scale-95"
            >
              View All Products
              <ShoppingBag size={16} />
            </button>
          </div>
        )}

        {/* Empty State */}
        {latestProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <ShoppingBag size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestCollection;