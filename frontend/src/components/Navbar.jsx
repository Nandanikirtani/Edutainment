import React, { useState, useEffect } from 'react';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("email"); // check if user is logged in

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/aboutus' },
    { name: 'Courses', path: '/courses' },
    { name: 'Alumini', path: '/alumini' },
    { name: 'Campuslife', path: '/campus' },
    { name: 'Podcast', path: '/podcast' },
    // { name: 'My Profile', path: '/myprofile' } 
  ];

  return (
    <nav
      className={`fixed top-0  left-0 w-full bg-black z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : "shadow-none"
      }`}
    >
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <img className='m-4 h-10 w-30' src="https://www.htbrandstudio.com/wp-content/uploads/2018/04/MANAV-RACHNA-logo-square.png" alt="" />
         
          <div className="flex items-center space-x-10 justify-between me-6">
            {/* Menu Items (Desktop) */}
            <div className="hidden md:flex text-lg space-x-8">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="relative text-white px-4 py-1 rounded-2xl after:content-[''] after:block after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Buttons (Desktop) */}
            <div className="hidden md:flex space-x-4">
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-red-500 to-red-700 text-white rounded hover:bg-[#0a515f] transform hover:scale-105 transition-all duration-200"
              >
                <FaSignInAlt />
                Login
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <IoMdClose size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden px-4 pb-4 space-y-2 z-50 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="block px-4 py-2 text-lg text-white"
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
        
      </div>
    </nav>
  );
}