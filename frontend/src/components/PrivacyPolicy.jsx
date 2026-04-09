import React from 'react';
import { Shield, Lock, Cookie, Mail, FileText, ExternalLink, ChevronRight } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 1,
      title: "Information We Collect",
      icon: FileText,
      content: "We may collect personal information such as your name, email address, phone number, and payment details when you register, make a purchase, or interact with our services."
    },
    {
      id: 2,
      title: "How We Use Your Information",
      icon: Shield,
      content: "The information collected is used to process orders, provide customer support, improve our website, and send relevant promotional updates if you have opted in."
    },
    {
      id: 3,
      title: "Data Protection",
      icon: Lock,
      content: "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure."
    },
    {
      id: 4,
      title: "Third-Party Services",
      icon: ExternalLink,
      content: "We may use trusted third-party services for payment processing, analytics, and marketing. These services are obligated to protect your information according to their privacy policies."
    },
    {
      id: 5,
      title: "Cookies",
      icon: Cookie,
      content: "Our website uses cookies to enhance user experience, track website activity, and analyze traffic. You can choose to disable cookies in your browser settings."
    },
    {
      id: 6,
      title: "Changes to Privacy Policy",
      icon: FileText,
      content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with the effective date."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
            <Shield size={16} />
            <span className="text-sm font-semibold">Privacy & Security</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, 
            and protect your personal information when you use our website and services.
          </p>
        </div>

        {/* Last Updated */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-center">
          <p className="text-sm text-gray-600">
            📅 Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                      {section.id}. {section.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                Have Questions?
              </h3>
              <p className="text-white/90 text-sm">
                If you have any questions about this Privacy Policy or our data practices, 
                please don't hesitate to contact us.
              </p>
            </div>
            <a
              href="mailto:gadgetsclothing934@gmail.com"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <Mail size={18} />
              Contact Us
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            By using our website, you consent to our Privacy Policy and agree to its terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;