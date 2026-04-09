import React from 'react';
import { RotateCcw, Package, AlertCircle, Mail, Truck, RefreshCw, DollarSign, Clock } from 'lucide-react';

const ReturnPolicy = () => {
  const sections = [
    {
      id: 1,
      title: "Eligibility for Returns",
      icon: Package,
      content: "Products must be returned within 14 days of delivery. Items must be unused, in original packaging, and include all tags and accessories.",
      highlight: "14 days return window"
    },
    {
      id: 2,
      title: "Non-Returnable Items",
      icon: AlertCircle,
      content: "Certain items cannot be returned, including personalized products, perishable goods, and digital downloads.",
      highlight: "Exceptions apply"
    },
    {
      id: 3,
      title: "How to Initiate a Return",
      icon: Mail,
      content: "To initiate a return, please contact our customer support with your order details.",
      highlight: "Easy process"
    },
    {
      id: 4,
      title: "Refund Process",
      icon: DollarSign,
      content: "Once we receive and inspect the returned item, we will process your refund within 5–7 business days. Refunds will be issued to the original payment method.",
      highlight: "5-7 business days"
    },
    {
      id: 5,
      title: "Exchanges",
      icon: RefreshCw,
      content: "Exchanges are allowed only for defective or damaged items. Please contact customer support for assistance.",
      highlight: "Defective items only"
    },
    {
      id: 6,
      title: "Shipping Costs",
      icon: Truck,
      content: "Customers are responsible for return shipping costs unless the return is due to our error or a defective product.",
      highlight: "Free for defective items"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full mb-4">
            <RotateCcw size={16} />
            <span className="text-sm font-semibold">Hassle-Free Returns</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Return & Refund Policy
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            We want you to be completely satisfied with your purchase. This Return Policy explains how you can return products and get refunds.
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
            <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Return Window</p>
            <p className="font-bold text-gray-800">14 Days</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
            <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Refund Time</p>
            <p className="font-bold text-gray-800">5-7 Business Days</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
            <Truck className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Free Returns</p>
            <p className="font-bold text-gray-800">On Defective Items</p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 group"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                        {section.id}. {section.title}
                      </h2>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        {section.highlight}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Note */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-yellow-800 mb-1">Important Note</p>
              <p className="text-sm text-yellow-700">
                Customers are responsible for return shipping costs unless the return is due to our error or a defective product. 
                We recommend using a trackable shipping service.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                Need Help with Returns?
              </h3>
              <p className="text-white/90 text-sm">
                For any questions regarding our return policy, please don't hesitate to contact us.
              </p>
            </div>
            <a
              href="mailto:gadgetsclothing934@gmail.com"
              className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <Mail size={18} />
              Contact Support
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            This policy is effective as of {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;