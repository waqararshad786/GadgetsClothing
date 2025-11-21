import React from 'react'

const EmailForm = () => {
  return (
           <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Unlock 20% Off | Subscribe Today!
          </h2>
          <p className="text-gray-400 mb-6">
            Don't miss out—unlock your savings now by subscribing below!
          </p>

          <div className="flex justify-center">
            <input
              type="email"
              placeholder="hello@gmail.com"
              className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="px-6 py-3 bg-black text-white font-semibold rounded-r-md hover:bg-gray-900 transition">
              SUBSCRIBE
            </button>
          </div>
        </div>
  )
}

export default EmailForm