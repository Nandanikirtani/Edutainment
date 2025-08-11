import React, { useState, useEffect } from 'react';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu items with proper routes
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/aboutus' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact Us', path: '/contactus' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
        scrolled
          ? 'shadow-lg bg-white/80 backdrop-blur-md'
          : 'bg-white/50 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 md:ms-6 ms-2 text-3xl font-bold text-[#0C7489]">
            Edutainment
          </div>

          <div className="flex items-center space-x-10 justify-between me-6">
            {/* Menu Items (Desktop) */}
            <div className="hidden md:flex text-lg space-x-8">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="relative text-gray-700 hover:text-[#0C7489] px-4 py-1 rounded-2xl after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#0C7489] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Buttons (Desktop) */}
            <div className="hidden md:flex space-x-4">
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-[#0C7489] text-white rounded hover:bg-[#0a515f] transform hover:scale-105 transition-all duration-200"
              >
                <FaSignInAlt />
                Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 border border-[#0C7489] text-[#0C7489] rounded hover:bg-indigo-50 transform hover:scale-105 transition-all duration-200"
              >
                <FaUserPlus />
                Create New Account
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <IoMdClose size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden px-4 pb-4 space-y-2 z-50 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="block px-4 py-2 text-lg text-gray-700 hover:text-[#0C7489]"
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ))}
        <Link
          to="/login"
          className="block px-4 py-2 text-lg bg-[#0C7489] text-white rounded hover:bg-[#0a515f]"
          onClick={() => setIsOpen(false)}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="block px-4 py-2 border border-[#0C7489] text-[#0C7489] rounded hover:bg-indigo-50"
          onClick={() => setIsOpen(false)}
        >
          Create New Account
        </Link>
      </div>
    </nav>
  );
}
