import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../assets/assets";
import { ChevronLeft, ChevronRight } from "lucide-react"; // arrow icons

const BestSellers = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const bestSellers = products.filter((p) => p.bestseller);

  const handleViewAll = (category, subCategory) => {
    navigate("/all-products", { state: { category, subCategory } });
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 280;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 md:px-10 bg-gradient-to-r from-pink-50 via-white to-blue-50 rounded-3xl">
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-center sm:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
              Best Sellers
            </h2>
            <p className="text-sm text-gray-600">
              Most loved picks by our customers ✨
            </p>
          </div>

          {/* View All button (hide on mobile) */}
          <button
            onClick={() => handleViewAll(null, null)}
            className="hidden sm:block mt-4 sm:mt-0 px-5 py-2 bg-black text-white rounded-full text-sm font-medium shadow hover:opacity-90 transition"
          >
            View All
          </button>
        </div>

        {/* Scrollable Card Section */}
        <div className="relative">
          {/* Scroll Buttons (visible only on mobile) */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 sm:hidden"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div
            ref={scrollRef}
            className="flex space-x-4 sm:space-x-5 overflow-x-auto scrollbar-hide scroll-smooth px-1"
          >
            {bestSellers.map((product) => (
              <div
                key={product._id}
                className="min-w-[180px] sm:min-w-[220px] md:min-w-[240px] lg:min-w-[250px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 duration-300"
              >
                <div className="relative">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-40 sm:h-52 md:h-60 lg:h-64 object-cover rounded-t-2xl"
                  />
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">
                    {product.subCategory}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      handleViewAll(product.category, product.subCategory)
                    }
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl text-sm sm:text-base font-medium hover:scale-[1.02] transition"
                  >
                    View Related
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 sm:hidden"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
