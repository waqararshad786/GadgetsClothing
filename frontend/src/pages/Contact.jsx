import React from "react";
import SectionHeader from "../components/SectionHeader";
import { assets } from "../assets/assets";
import EmailForm from "../components/EmailForm";

const Contact = () => {
  return (
   <div>
     <div className="min-h-screen flex flex-col items-center bg-white px-4 sm:px-6 md:px-12 py-12">
      {/* Page Header */}
      <SectionHeader heading="Contact Us" />

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl bg-gray-50 shadow-md rounded-2xl overflow-hidden mt-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-[450px]">
          <img
            src={assets.contact_img}
            alt="Contact"
            className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 text-gray-700 flex flex-col justify-center">
          <h3 className="text-lg sm:text-xl font-bold mb-2">Our Store</h3>
          <p>AI 354 Fashion Lane</p>
          <p>Los Angeles, SC 45678, USA</p>

          <div className="my-4 text-sm sm:text-base">
            <p>Tel: (+11)-558-669-447</p>
            <p>Email: contact.trendify@info.com</p>
          </div>

          <h2 className="text-base sm:text-lg font-semibold mb-1">
            Careers at Trendify
          </h2>
          <p className="text-sm sm:text-base mb-1">
            Join us at <span className="font-semibold text-pink-600">Trendify</span>! Explore job openings and help shape the future of fashion.
          </p>
          <p className="text-sm sm:text-base mb-4">
            Discover how you can contribute to our mission of setting trends and creating style.
          </p>

          <button className="bg-black text-white px-5 py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-800 transition">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>

    <EmailForm/>
   </div>
  );
};

export default Contact;
