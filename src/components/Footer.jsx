import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'


const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-1'>
        <div className='max-w-6xl mx-auto px-6 space-y-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='space-y-4'>
              <h3 className='text-xl font-bold'>Newsletter</h3>
              <p className='text-gray-400'>Subscribe to get updates on new offers and features</p>
              <div className='flex gap-2'>
                <input 
                  type='email' 
                  placeholder='Enter your email'
                  className='p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 flex-grow'
                />
                <button className='bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors'>
                  Subscribe
                </button>
              </div>
            </div>
            <div className='space-y-4'>
              <h3 className='text-xl font-bold'>Quick Links</h3>
              <div className='flex flex-col space-y-2'>
                <a href='#' className='text-gray-400 hover:text-yellow-400 transition'>Privacy Policy</a>
                <a href='#' className='text-gray-400 hover:text-yellow-400 transition'>Terms of Service</a>
                <a href='#' className='text-gray-400 hover:text-yellow-400 transition'>Contact Us</a>
              </div>
            </div>
            <div className='space-y-4'>
              <h3 className='text-xl font-bold'>Follow Us</h3>
              <div className='flex space-x-4'>
                <a href='#' className='text-gray-400 hover:text-yellow-400 transition hover:scale-125 ease-in duration-500' aria-label='Facebook'>
                  <FaFacebook size={24} />
                </a>
                <a href='#' className='text-gray-400 hover:text-yellow-400 transition hover:scale-125 ease-in duration-500' aria-label='Twitter'>
                  <FaTwitter size={24} />
                </a>
                <a href='#' className='text-gray-400 hover:text-yellow-400 transition hover:scale-125 ease-in duration-500' aria-label='Instagram'>
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className='border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center'>
            <p className='text-lg font-semibold'>&copy; 2025 Thindham Food Delivery. All rights reserved.</p>
            <p className='text-gray-400 mt-2 md:mt-0'>Made with ❤️ by Food Lovers</p>
          </div>
        </div>

      </footer>
  )
}

export default Footer
