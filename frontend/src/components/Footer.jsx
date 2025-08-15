import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-white">Edutainment</h2>
            <p className="mt-4 text-sm leading-6">
              Empowering learners worldwide with interactive courses,
              expert instructors, and career-ready skills for the future.
            </p>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold text-white">Courses</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">AI Meets C Programming</a></li>
              <li><a href="#" className="hover:text-white">OOPs Using Java</a></li>
              <li><a href="#" className="hover:text-white">Responsible AI</a></li>
              <li><a href="#" className="hover:text-white">Data Analysis</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">E-books</a></li>
              <li><a href="#" className="hover:text-white">Webinars</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            <p className="mt-4 text-sm">support@edutainment.com</p>
            <p className="text-sm">+1 (234) 567-890</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white"><FaFacebook size={18} /></a>
              <a href="#" className="hover:text-white"><FaTwitter size={18} /></a>
              <a href="#" className="hover:text-white"><FaLinkedin size={18} /></a>
              <a href="#" className="hover:text-white"><FaInstagram size={18} /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Edutainment. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
