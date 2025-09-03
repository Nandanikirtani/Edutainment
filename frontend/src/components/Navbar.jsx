import React, { useState, useEffect } from "react";
import { 
  FaSignInAlt, FaUser, FaUserCircle, FaExchangeAlt, FaSave, 
  FaRegMoneyBillAlt, FaLanguage, FaSignOutAlt, FaMoon, FaSun 
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Alumini", path: "/alumini" },
    { name: "Campus life", path: "/campus" },
    { name: "Podcast", path: "/podcast" },
  ];

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setIsOpen(false);
    navigate("#/home");
  };

  const handleThemeToggle = () => setIsDarkMode(!isDarkMode);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? "shadow-lg bg-white/90 dark:bg-black/90 backdrop-blur" : "bg-white dark:bg-black"}`}
    >
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <img
            className="m-4 h-10 w-auto"
            src="https://www.htbrandstudio.com/wp-content/uploads/2018/04/MANAV-RACHNA-logo-square.png"
            alt="logo"
          />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex text-lg space-x-8">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="relative text-gray-900 dark:text-white px-4 py-1 rounded-2xl 
                             after:content-[''] after:block after:w-0 after:h-[2px] after:bg-red-600 
                             after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex space-x-4 relative">
              {!user ? (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-red-500 to-red-700 
                             text-white rounded-lg hover:scale-105 transition-all duration-200"
                >
                  <FaSignInAlt />
                  Login
                </Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-900 dark:text-white 
                               rounded-full hover:bg-gray-200 dark:hover:bg-red-600 transition-all duration-200"
                  >
                    <FaUser size={22} />
                  </button>

                  {/* Dropdown */}
                  {showDropdown && (
                    <div
                      className="absolute right-0 mt-2 w-72 bg-white dark:bg-black/95 backdrop-blur-md rounded-xl shadow-lg transition-all duration-300"
                    >
                      {/* User Info */}
                      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-300 dark:border-gray-700">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-800 dark:text-white">
                          <FaUserCircle size={24} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-900 dark:text-white font-semibold">{user?.name || "User Name"}</span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">{user?.email || "user@example.com"}</span>
                        </div>
                      </div>

                      {/* Dropdown Links */}
                      <div className="py-2">
                        {[
                          { name: "Profile", icon: <FaUserCircle />, path: "/profile" },
                          { name: "Transactions", icon: <FaExchangeAlt />, path: "/transactions" },
                          { name: "Saved Reels", icon: <FaSave />, path: "/saved-reels" },
                          { name: "Subscription", icon: <FaRegMoneyBillAlt />, path: "/subscription" },
                          { name: "Languages", icon: <FaLanguage />, path: "/languages" },
                        ].map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.path}
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-3 px-6 py-3 text-gray-900 dark:text-white 
                                       hover:bg-gray-200 dark:hover:bg-red-600 transition-all duration-200 text-base"
                          >
                            {item.icon}
                            {item.name}
                          </Link>
                        ))}
                      </div>

                      <hr className="my-1 border-gray-300 dark:border-gray-700" />

                      {/* Theme & Logout */}
                      <div className="py-2">
                        <button
                          onClick={handleThemeToggle}
                          className="w-full flex items-center gap-3 px-6 py-3 text-gray-900 dark:text-white 
                                     hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 text-base"
                        >
                          {isDarkMode ? <FaSun /> : <FaMoon />}
                          <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-6 py-3 text-gray-900 dark:text-white 
                                     hover:bg-red-600 transition-all duration-200 text-base"
                        >
                          <FaSignOutAlt />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 dark:text-white focus:outline-none">
              {isOpen ? <IoMdClose size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden px-4 pb-4 space-y-2 z-50 transition-all duration-300 overflow-hidden
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-red-600 rounded transition-all duration-200"
          >
            {item.name}
          </Link>
        ))}

        {!user ? (
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-lg bg-red-600 text-white rounded hover:bg-red-700 dark:hover:bg-red-800 transition-all duration-200"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-lg bg-red-600 text-white rounded hover:bg-red-700 dark:hover:bg-red-800 transition-all duration-200"
          >
            Logout
          </button>
        )}

        {/* Theme Toggle Mobile */}
        <button
          onClick={handleThemeToggle}
          className="block w-full text-left px-4 py-2 text-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-all duration-200"
        >
          {isDarkMode ? <FaSun className="inline mr-2" /> : <FaMoon className="inline mr-2" />}
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}
