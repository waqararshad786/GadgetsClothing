import React from "react";
import { assets } from "../assets/assets";
import EmailForm from "../components/EmailForm";
import { MapPin, Phone, Mail, Briefcase, Clock, MessageSquare } from "lucide-react";
import FeaturesAndSubscribe from "../components/FeaturesAndSubscribes";

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      
      {/* Small Header */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full mb-3">
          <MessageSquare size={14} />
          <span className="text-xs font-semibold">Get in Touch</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Contact Us
        </h1>
        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Contact Info Cards */}
          <div className="space-y-4">
            {/* Store Info */}
            <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Our Store</h3>
                  <p className="text-gray-600 text-sm">AI 2326 Fashion Lane</p>
                  <p className="text-gray-600 text-sm">Pindi Stop, Main Bazar, Lahore</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                  <Phone size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Contact Info</h3>
                  <p className="text-gray-600 text-sm">Tel: +92 314 0654083</p>
                  <p className="text-gray-600 text-sm">Email: gadgetsclothing934@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <Clock size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Business Hours</h3>
                  <p className="text-gray-600 text-sm">Monday - Friday: 9:00 AM - 8:00 PM</p>
                  <p className="text-gray-600 text-sm">Saturday: 10:00 AM - 6:00 PM</p>
                  <p className="text-gray-600 text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl overflow-hidden shadow-sm">
            <img
              src={assets.contact_img}
              alt="Contact"
              className="w-full h-64 object-cover"
            />
            
            {/* Careers Section inside image card */}
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                  <Briefcase size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Careers at Ai-Clothing</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Join us at <span className="font-semibold text-purple-600">Ai-Clothing</span>! 
                    Explore job openings and help shape the future of fashion.
                  </p>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all hover:scale-105">
                    Explore Jobs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="rounded-xl overflow-hidden shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217862.0123062097!2d74.20457155!3d31.48274665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903e6b7c7e7e7%3A0x7e5c8e5c5e5c5e5c!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Store Location"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </div>
      </div>

      {/* <EmailForm /> */}
      <FeaturesAndSubscribe/>
    </div>
  );
};

export default Contact;