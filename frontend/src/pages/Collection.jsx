import React, { useState, useEffect } from "react";
import axios from "axios";
import EmailForm from "../components/EmailForm";
import { Link } from "react-router-dom";
import { API_URL } from "../api";
import { ChevronDown, Filter, X, Star, ShoppingBag, SlidersHorizontal } from "lucide-react";
import FeaturesAndSubscribe from "../components/FeaturesAndSubscribes";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState("relevant");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const getImage = (img) => {
    if (!img) return "https://via.placeholder.com/400x500?text=Product";
    return img.startsWith("http") ? img : img;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products/all`);
        setProducts(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (categoryFilter.length > 0) {
      temp = temp.filter((item) => categoryFilter.includes(item.category));
    }

    if (typeFilter.length > 0) {
      temp = temp.filter((item) => typeFilter.includes(item.subCategory));
    }

    if (sortOrder === "low-to-high")
      temp.sort((a, b) => a.price - b.price);
    else if (sortOrder === "high-to-low")
      temp.sort((a, b) => b.price - a.price);

    setFilteredProducts(temp);
  }, [categoryFilter, typeFilter, sortOrder, products]);

  const clearFilters = () => {
    setCategoryFilter([]);
    setTypeFilter([]);
    setSortOrder("relevant");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Banner - Chota kar diya */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Our Collection</h1>
          <p className="text-white/90 text-sm">Discover the perfect style for every occasion</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-3">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between bg-white p-3 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={20} />
              <span className="font-semibold">Filters & Sort</span>
            </div>
            <ChevronDown className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* FILTER SIDEBAR */}
          <div className={`
            lg:w-72 flex-shrink-0
            ${isFilterOpen ? 'block' : 'hidden lg:block'}
            fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto
            bg-white lg:bg-transparent
            w-full lg:w-72 h-full lg:h-auto
            overflow-y-auto lg:overflow-visible
            p-5 lg:p-0
            shadow-xl lg:shadow-none
          `}>
            <div className="lg:bg-white lg:rounded-2xl lg:p-5 lg:shadow-sm">
              {/* Mobile Close Button */}
              <div className="flex justify-between items-center lg:hidden mb-3">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-2">
                  <X size={24} />
                </button>
              </div>

              {/* Sort By */}
              <div className="mb-5">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <ShoppingBag size={18} />
                  Sort By
                </h3>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevant">Relevant</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                </select>
              </div>

              {/* Categories */}
              <div className="mb-5">
                <h3 className="font-semibold text-gray-800 mb-2">Categories</h3>
                <div className="space-y-2">
                  {["Men", "Women", "Kids"].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        value={cat}
                        checked={categoryFilter.includes(cat)}
                        onChange={(e) =>
                          setCategoryFilter((prev) =>
                            e.target.checked
                              ? [...prev, cat]
                              : prev.filter((i) => i !== cat)
                          )
                        }
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700 group-hover:text-blue-600 transition">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Mobile Overlay */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsFilterOpen(false)} />
          )}

          {/* PRODUCTS GRID */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600 text-sm">
                Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
              </p>
              <div className="hidden lg:block">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevant">Sort: Relevant</option>
                  <option value="low-to-high">Sort: Price Low to High</option>
                  <option value="high-to-low">Sort: Price High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((item, index) => (
                  <Link
                    key={item._id}
                    to={`/product/${item._id}`}
                    onMouseEnter={() => setHoveredProduct(index)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
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
                            <button className="bg-white text-gray-800 px-3 py-1.5 rounded-full font-semibold text-xs hover:bg-gray-900 hover:text-white transition">
                              Quick View
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-3">
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-1">
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
                        <h3 className="font-semibold text-gray-800 text-xs mb-1 line-clamp-1 group-hover:text-blue-600 transition">
                          {item.name}
                        </h3>

                        {/* Price */}
                        <p className="text-md font-bold text-gray-900">Rs{item.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <ShoppingBag size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  onClick={clearFilters}
                  className="mt-3 text-blue-600 font-semibold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* EmailForm - Added */}
      <EmailForm />
    </div>
  );
};

export default Collection;