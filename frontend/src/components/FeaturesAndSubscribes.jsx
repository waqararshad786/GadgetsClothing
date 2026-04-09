// FeaturesAndSubscribe.jsx (Updated with your Instagram link)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Shield, Instagram, ArrowRight, Sparkles, Gift, Tag } from "lucide-react";

const FeaturesAndSubscribe = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: assets.exchange_icon,
      title: "Easy Return & Exchange",
      description: "Easy Returns & exchanges within 10 days",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      link: "/return-policy"
    },
    {
      icon: assets.quality_icon,
      title: "Premium Quality",
      description: "Ai-Clothing ensures top-quality products",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      link: "/about"
    },
    {
      icon: assets.support_img,
      title: "24/7 Customer Support",
      description: "We support via email, phone, or chat",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      link: "/contact"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full mb-4">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-semibold">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            We Provide Best Services
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Experience the best shopping experience with our premium services
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.link)}
              className="group relative bg-white rounded-2xl p-6 text-center shadow-lg 
                       hover:shadow-2xl transition-all duration-300 transform 
                       hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 
                            group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon Container */}
              <div className={`inline-flex p-3 rounded-2xl ${feature.bgColor} mb-4 
                            group-hover:scale-110 transition-transform duration-300`}>
                <img 
                  src={feature.icon} 
                  alt={feature.title} 
                  className="w-10 h-10 object-contain"
                />
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 
                           transition-colors duration-300">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Line */}
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 
                            group-hover:w-12 h-0.5 bg-gradient-to-r ${feature.color} 
                            rounded-full transition-all duration-300`} />
            </div>
          ))}
        </div>

        {/* Instagram Follow Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative px-6 py-10 md:py-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Instagram className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Follow Us on Instagram</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Follow Our Instagram Account
              </h3>
              <p className="text-white/90 text-lg mb-2">
                Get Weekly Offer Discount!
              </p>

              <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Gift className="w-4 h-4 text-yellow-300" />
                <span className="text-yellow-300 text-sm font-semibold">Weekly Special Discounts</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 px-3">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span className="text-white text-sm">Exclusive flash sales</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 px-3">
                  <Tag className="w-4 h-4 text-yellow-300" />
                  <span className="text-white text-sm">Weekly discount codes</span>
                </div>
              </div>

              <a
                href="https://www.instagram.com/ai_clothing1/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-purple-600 
                         font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300
                         transform hover:scale-105 active:scale-95 shadow-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Instagram className="w-5 h-5" />
                Follow @ai_clothing1
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </a>

              <p className="text-yellow-300 text-sm mt-4 font-semibold">
                ✨ Get 10% extra off on your next purchase when you follow us ✨
              </p>
              <p className="text-white/60 text-xs mt-2">
                New weekly offers every Monday on Instagram stories
              </p>
            </div>
          </div>

          <div className="absolute top-5 right-5 opacity-10">
            <Instagram className="w-20 h-20 text-white" />
          </div>
          <div className="absolute bottom-5 left-5 opacity-10">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAndSubscribe;