import React from "react";
import { assets } from "./../assets/assets";

const Hero = () => {
  return (
    <div
      className="
        w-[82%] mx-auto mt-8 flex border border-gray-300 h-[520px]
        max-md:flex-col max-md:h-auto max-md:pb-6
      "
    >
      {/* Left Section */}
      <div
        className="
          flex-1 flex justify-center items-center bg-white
          max-md:order-2 max-md:py-6 max-md:text-center
        "
      >
        <div className="flex flex-col items-start px-16 max-md:items-center max-md:px-6">
          
          {/* Line + Text */}
          <div className="flex items-center space-x-4 mb-2 max-md:justify-center max-md:space-x-2">
            <span className="w-10 h-[2px] bg-gray-600 max-md:w-6"></span>
            <p className="uppercase text-gray-700 tracking-wider text-sm">
              Our Best Sellers
            </p>
          </div>

          {/* Heading */}
          <h1
            className="
              text-5xl font-serif text-gray-800 mb-6
              max-md:text-3xl max-md:mb-4
            "
          >
            Latest Arrivals
          </h1>

          {/* Shop Now */}
          <div className="flex items-center space-x-4 cursor-pointer group max-md:justify-center">
            <p className="uppercase text-gray-800 font-medium group-hover:underline">
              Shop Now
            </p>
            <span className="w-10 h-[2px] bg-gray-600 max-md:w-6"></span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="
          flex-1 bg-[#ffe0dc] relative overflow-hidden flex items-center justify-center
          max-md:order-1 max-md:h-[300px]
        "
      >
        <img
          src={assets.hero_img}
          alt="hero"
          className="h-full object-contain max-md:h-[90%]"
        />
      </div>
    </div>
  );
};

export default Hero;
