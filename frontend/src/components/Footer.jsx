// import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="bg-[#1c1c1c] text-gray-300 py-10">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
//         {/* Grid Layout */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          
//           {/* Logo & About */}
//           <div>
//             <img
//   src={`${import.meta.env.BASE_URL}manav-rachna-logo.png`}
//   alt="Manav Rachna Logo"
//   className="w-40 h-auto block"
// />


//             <p className="text-sm leading-6 text-gray-300">
//               A premier private educational institution that is renowned for its
//               cutting-edge curriculum, distinguished faculty, and
//               state-of-the-art facilities.
//             </p>
//           </div>

//           {/* Links */}
//           <div>
//             <ul className="space-y-3 text-sm">
//               <li>
//                 <a href="#" className="hover:text-white">About</a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white">Privacy Policy</a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white">Refund Policy</a>
//               </li>
//             </ul>
//           </div>

//           {/* Social Icons */}
//           <div>
//             <ul className="space-y-3 text-sm">
//               <li>
//                 <a href="#" className="flex items-center space-x-2 hover:text-white">
//                   <FaInstagram /> <span>Instagram</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="flex items-center space-x-2 hover:text-white">
//                   <FaTwitter /> <span>Twitter</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="flex items-center space-x-2 hover:text-white">
//                   <FaFacebook /> <span>Facebook</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="flex items-center space-x-2 hover:text-white">
//                   <FaLinkedin /> <span>LinkedIn</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="flex items-center space-x-2 hover:text-white">
//                   <FaYoutube /> <span>YouTube</span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
//           <p className="font-semibold text-white">
//             Best viewed on Google Chrome 80+, Microsoft Edge 81+, Mozilla Firefox 75+, Safari 51.5+
//           </p>
//           <p className="mt-2">
//             © {new Date().getFullYear()} - Manav Rachna Vidyanatariksha - Manav Rachna Educational Institutions. All Rights Reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }














import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1c1c1c] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 text-center sm:text-left">
          
          {/* Logo & About */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <img
              src={`${import.meta.env.BASE_URL}manav-rachna-logo.png`}
              alt="Manav Rachna Logo"
              className="w-32 sm:w-40 h-auto"
            />
            <p className="text-sm leading-6 text-gray-300 max-w-xs sm:max-w-none">
              A premier private educational institution that is renowned for its
              cutting-edge curriculum, distinguished faculty, and
              state-of-the-art facilities.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center sm:items-start">
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">Refund Policy</a>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-center sm:items-start">
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="flex items-center justify-center sm:justify-start space-x-2 hover:text-white transition-colors duration-200">
                  <FaInstagram /> <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center sm:justify-start space-x-2 hover:text-white transition-colors duration-200">
                  <FaTwitter /> <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center sm:justify-start space-x-2 hover:text-white transition-colors duration-200">
                  <FaFacebook /> <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center sm:justify-start space-x-2 hover:text-white transition-colors duration-200">
                  <FaLinkedin /> <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center sm:justify-start space-x-2 hover:text-white transition-colors duration-200">
                  <FaYoutube /> <span>YouTube</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400 px-2">
          <p className="font-semibold text-white">
            Best viewed on Google Chrome 80+, Microsoft Edge 81+, Mozilla Firefox 75+, Safari 51.5+
          </p>
          <p className="mt-2 leading-6">
            © {new Date().getFullYear()} - Manav Rachna Vidyanatariksha - Manav Rachna Educational Institutions. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
