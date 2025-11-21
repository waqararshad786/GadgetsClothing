import React from "react";
import { Link } from "react-router-dom";
import { products } from "../assets/assets";

const LatestCollection = () => {
  // Filter to show bestsellers or latest
  const latestProducts = products.filter((item) => item.bestseller).slice(0, 5);

  return (
    <div className="w-[90%] sm:w-[85%] lg:w-[82%] mx-auto my-12">
      {/* Optional Heading — uncomment if needed */}
      {/* <SectionHeader heading="Latest Collection" paragraph="Explore our trending new arrivals." /> */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mt-8">
        {latestProducts.map((item) => (
          <Link key={item._id} to={`/product/${item._id}`}>
            <div className="text-center border border-gray-200 rounded-2xl p-3 sm:p-4 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-full h-40 sm:h-52 md:h-60 lg:h-64 object-cover rounded-xl mb-3"
              />
              <p className="text-gray-700 text-sm sm:text-base font-medium truncate">
                {item.name}
              </p>
              <p className="text-gray-900 text-sm sm:text-base md:text-lg font-semibold mt-1">
                ${item.price}.00
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
