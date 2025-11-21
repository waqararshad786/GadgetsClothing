import React from "react";
import { assets } from "../assets/assets"; // aapke icons path ke hisaab se

const FeaturesAndSubscribe = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-16">
          <div className="flex flex-col items-center">
            <img src={assets.exchange_icon} alt="Easy Return" className="w-12 h-12 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Easy Return & Exchange Policy</h3>
            <p className="text-gray-400 mt-2 text-sm">Easy Returns/exchanges within 10 days.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={assets.quality_icon} alt="Quality Policy" className="w-12 h-12 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Our Quality Policy</h3>
            <p className="text-gray-400 mt-2 text-sm">Trendify ensures top-quality products.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={assets.support_img} alt="Customer Support" className="w-12 h-12 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Best Customer Support</h3>
            <p className="text-gray-400 mt-2 text-sm">We support via email, phone, or chat.</p>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default FeaturesAndSubscribe;
