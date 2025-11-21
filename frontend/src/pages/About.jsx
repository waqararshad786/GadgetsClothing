import React from "react";
import { assets } from "../assets/assets";
import EmailForm from "../components/EmailForm";

const About = () => {
  return (
<div>
      <div className="min-h-screen bg-white px-4 sm:px-6 md:px-12 py-12 flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-10 border-b-4 border-pink-500 pb-2 text-center">
        About Us
      </h1>

      {/* Image + Text Side by Side */}
      <div className="flex flex-col md:flex-row items-center md:items-start max-w-6xl gap-10">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={assets.about_img}
            alt="About Trendify"
            className="w-[90%] sm:w-[400px] md:w-[480px] h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl shadow-xl"
          />
        </div>

        {/* Right Side: Text */}
        <div className="w-full md:w-1/2 text-gray-700 text-sm sm:text-base leading-relaxed flex flex-col justify-center">
          <p className="mb-4">
            Welcome to{" "}
            <span className="font-semibold text-pink-600">Trendify</span>, where
            style meets quality. Our mission is to bring you the latest fashion
            trends and must-have items, all curated with an eye for quality and
            design. We believe everyone deserves to express themselves through
            fashion, and we're here to make that easier and more enjoyable.
          </p>

          <p className="mb-6">
            At <span className="font-semibold text-pink-600">Trendify</span>, we
            prioritize your satisfaction. From browsing our site to receiving
            your order, we aim to provide a seamless shopping experience. Our
            team constantly explores new trends, ensuring you have access to the
            freshest styles as soon as they hit the runway.
          </p>

          {/* Mission Section */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Our Mission
            </h2>
            <p>
              Our mission is to empower you to express your unique style with
              high-quality, on-trend fashion. We strive to make fashion
              accessible to all, offering diverse products that inspire
              confidence.
            </p>
          </div>

          {/* Vision Section */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Our Vision
            </h2>
            <p>
              Our vision is to be a global fashion leader, known for
              cutting-edge style and quality. We aim to inspire confidence and
              creativity, making{" "}
              <span className="font-semibold text-pink-600">Trendify</span> the
              go-to choice for individual expression.
            </p>
          </div>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="max-w-6xl mx-auto my-16 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-300 rounded-2xl overflow-hidden text-center divide-y md:divide-y-0 md:divide-x divide-gray-300">
          {/* 1️⃣ Quality Assurance */}
          <div className="p-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
              Quality Assurance
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              At <span className="font-semibold text-pink-600">Trendify</span>,
              quality comes first. Every product is carefully chosen and
              inspected to meet our high standards. Shop with confidence,
              knowing we ensure excellence in every detail.
            </p>
          </div>

          {/* 2️⃣ Convenience */}
          <div className="p-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
              Convenience
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Trendify ensures a smooth shopping experience with easy browsing,
              fast shipping, simple returns, and multiple payment options. Your
              comfort and satisfaction are our priorities.
            </p>
          </div>

          {/* 3️⃣ Customer Service */}
          <div className="p-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
              Exceptional Customer Service
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              At <span className="font-semibold text-pink-600">Trendify</span>,
              exceptional service is our promise. Our dedicated support team is
              here to assist you with any questions or concerns, ensuring a
              smooth and satisfying shopping experience.
            </p>
          </div>
        </div>
      </div>
    </div>

     <EmailForm/>
</div>
   
  );
};

export default About;
