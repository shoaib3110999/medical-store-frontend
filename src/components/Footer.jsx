import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-gray-950 rounded py-8 md:py-10 lg:py-12 px-4 md:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12'>
        {/* Quick Links Section */}
        <div className='text-center'>
          <h2 className='text-white text-lg md:text-xl font-bold mb-4 md:mb-6'>Quick links</h2>
          <ul className='flex flex-col gap-2 md:gap-3 lg:gap-4 text-white text-sm md:text-base'>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>log in</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>miya huzoor</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>about us</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Medicines</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Books</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Events</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Courses</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Khidmat-e-khalq</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Specials</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>PDFs</li></a>
          </ul>
        </div>

        {/* Customer Support Section */}
        <div className='text-center'>
          <h2 className='text-white text-lg md:text-xl font-bold mb-4 md:mb-6'>Customer Support</h2>
          <ul className='flex flex-col gap-2 md:gap-3 lg:gap-4 text-white text-sm md:text-base'>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Contact us</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Whatsapp Chat</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Privacy Policy</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Terms of Service</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Contact Information</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Shipping Policy</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Return Policy</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Refund Policy</li></a>
            <a href="#" className='hover:text-blue-400 transition-colors'><li>Replacement Policy</li></a>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className='text-white flex flex-col gap-3 md:gap-4 text-center sm:col-span-2 lg:col-span-1'>
          <h2 className='text-white text-lg md:text-xl font-bold mb-2 md:mb-4'>Tariq Jhangiri Ruhani center India</h2>
          <p className='text-gray-300 text-sm md:text-base break-words'>
            <span className='font-semibold'>Phone:</span> 8153906236
          </p>
          <p className='text-gray-300 text-sm md:text-base break-words'>
            <span className='font-semibold'>Email:</span> pshoaib215@gmail.com
          </p>
          <p className='text-gray-300 text-sm md:text-base break-words'>
            <span className='font-semibold'>Address:</span> Oppo Zanda Masjid, Taiwada, Viramgam, Ahmedabad, Gj, India
          </p>

          {/* Social Media Icons */}
          <div className='flex gap-4 md:gap-5 mt-2 md:mt-4 text-xl md:text-2xl justify-center'>
            <a href="#" className='hover:text-blue-400 transition-colors transform hover:scale-110'><FaFacebookF /></a>
            <a href="#" className='hover:text-blue-400 transition-colors transform hover:scale-110'><FaInstagram /></a>
            <a href="#" className='hover:text-blue-400 transition-colors transform hover:scale-110'><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className='mt-8 md:mt-10 border-t border-gray-800 pt-4 md:pt-6'>
        <p className='text-gray-500 text-center text-xs md:text-sm leading-relaxed px-2'>
          © 2025, Tariq Jhangiri Ruhani center India Designed by TJRCI.
          <span className='hidden md:inline'> Privacy policy . Terms of service . Contact information . Shipping policy</span>
        </p>
        {/* Mobile version - stacked */}
        <p className='text-gray-500 text-center text-xs mt-2 md:hidden px-2'>
          Privacy policy . Terms of service
        </p>
      </div>
    </footer>
  )
}

export default Footer