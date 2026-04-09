// EmailForm.jsx
import React, { useState } from "react";
import { Gift, Sparkles, Instagram, Award, Tag, ArrowRight } from "lucide-react";

const EmailForm = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl mx-4 md:mx-10 my-6 shadow-xl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-52 h-52 bg-white rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-300 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative px-5 py-10 md:py-12">
        <div className="max-w-3xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-4">
              <Instagram className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-semibold">Follow Us on Instagram</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Follow Our Instagram
              <span className="block text-xl md:text-2xl mt-1 text-yellow-300">Get Weekly Offers!</span>
            </h2>

            {/* Description */}
            <p className="text-white/90 text-sm md:text-base max-w-xl mx-auto">
              Join 50K+ fashion lovers and unlock exclusive weekly discounts
            </p>
          </div>

          {/* Instagram Card */}
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl p-5 shadow-lg">
            {/* Weekly Offer Badge */}
            <div className="flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm rounded-lg p-3 mb-4">
              <div className="bg-yellow-400 rounded-full p-1.5">
                <Award className="w-4 h-4 text-purple-900" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">Weekly Offer Discount</p>
                <p className="text-white/80 text-xs">New deals every Monday - Don't miss out!</p>
              </div>
              <Tag className="w-5 h-5 text-yellow-300" />
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <span className="text-white text-xs">Exclusive flash sales</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <span className="text-white text-xs">Behind the scenes</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <span className="text-white text-xs">Customer style features</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <span className="text-white text-xs">Weekly giveaways</span>
              </div>
            </div>

            {/* Instagram Stats */}
            <div className="flex justify-around mb-5 py-3 border-t border-b border-white/20">
              <div className="text-center">
                <p className="text-xl font-bold text-white">50K+</p>
                <p className="text-white/70 text-xs">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-white">1M+</p>
                <p className="text-white/70 text-xs">Reach</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-white">500+</p>
                <p className="text-white/70 text-xs">Posts</p>
              </div>
            </div>

            {/* Instagram Button */}
            <a
              href="https://www.instagram.com/ai_clothing1/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-white text-purple-600 
                       font-bold py-3 rounded-lg hover:bg-gray-100 transition-all duration-300
                       transform hover:scale-105 active:scale-95 shadow-md text-base"
            >
              <Instagram className="w-5 h-5" />
              Follow @ai_clothing1
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Weekly Offer Text */}
            <div className="text-center mt-4">
              <p className="text-yellow-300 font-semibold text-xs">
                ✨ Get 10% extra off on your next purchase when you follow us ✨
              </p>
              <p className="text-white/60 text-xs mt-1">
                Weekly discount codes shared every Monday on Instagram stories
              </p>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span className="text-white/80 text-xs">Join 50,000+ happy customers</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-5 right-5 opacity-10">
          <Instagram className="w-16 h-16 text-white" />
        </div>
        <div className="absolute bottom-5 left-5 opacity-10">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
      </div>
    </div>
  );
};

export default EmailForm;