import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShoppingBag, Star, Eye } from "lucide-react";
import { API_URL } from "../api";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products/all`);
        setProducts(res.data.products);
        setLoading(false);
      } catch (err) {
        console.error(err);
        if (err.response) setError(err.response.data.message);
        else setError("Failed to fetch backend products.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getImage = (img) => {
    if (!img) return "https://via.placeholder.com/400x500?text=Product";
    return img.startsWith("http") ? img : img;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">Loading products...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center bg-red-50 p-8 rounded-2xl max-w-md">
        <div className="text-red-500 text-5xl mb-4">!</div>
        <p className="text-red-600 font-semibold">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Header Section - Blue Box Chota */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
            <ShoppingBag size={14} />
            <span className="text-xs font-semibold">Our Collection</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">All Products</h1>
          <p className="text-white/90 text-sm">Discover our complete collection of premium products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        
        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-800">{products.length}</span> products
          </p>
          <select className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            <option>Sort by: Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {products.map((item, index) => (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                onMouseEnter={() => setHoveredProduct(index)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  
                  {/* Image Container */}
                  <div className="relative bg-gray-100 h-56 overflow-hidden">
                    <img
                      src={getImage(item.images?.[0])}
                      alt={item.name}
                      className="w-full h-full object-contain p-3 transition-transform duration-500"
                      style={{
                        transform: hoveredProduct === index ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                    
                    {/* Quick View Overlay */}
                    {hoveredProduct === index && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center animate-in fade-in duration-300">
                        <div className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
                          <Eye size={14} />
                          Quick View
                        </div>
                      </div>
                    )}

                    {/* Best Seller Badge */}
                    {item.bestseller && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Best Seller
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-3">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={`${
                            i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300 fill-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">(24)</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1 group-hover:text-blue-600 transition">
                      {item.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-lg font-bold text-gray-900">Rs{item.price}</p>
                      {item.originalPrice && (
                        <p className="text-xs text-gray-400 line-through">Rs{item.originalPrice}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl">
            <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowProducts;