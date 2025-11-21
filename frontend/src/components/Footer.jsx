import React from 'react'

const Footer = () => {
  return (

<footer class="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
    <div class="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div class="md:max-w-96">
           <h1 className='text-2xl font-extrabold '>Ai Clothing</h1>
            <p class="mt-6 text-sm">
                Thank you for shopping with Trendify! We're dedicated to bringing you the latest
                 trends and top-quality products. Follow us on social media for updates on new arrivals,
                  exclusive offers, and more. If you have any questions or need assistance, our friendly 
                  customer support team is here to help. Subscribe to our newsletter for special discounts
                   and be the first to know about our
                 latest promotions. Your style journey starts here—let's make it unforgettable!
            </p>
        </div>
        <div class="flex-1 flex items-start md:justify-end gap-20">
            <div>
                <h2 class="font-semibold mb-5 text-gray-800">Company</h2>
                <ul class="text-sm space-y-2">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Contact us</a></li>
                    <li><a href="#">Privacy policy</a></li>
                </ul>
            </div>
            <div>
                <h2 class="font-semibold mb-5 text-gray-800">Get in touch</h2>
                <div class="text-sm space-y-2">
                    <p>+1-212-456-7890</p>
                    <p>contact@example.com</p>
                </div>
            </div>
        </div>
    </div>
    <p class="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2024 © <a href="https://prebuiltui.com">PrebuiltUI</a>. All Right Reserved.
    </p>
</footer>  )
}

export default Footer