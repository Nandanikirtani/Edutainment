
// import React from "react";
// import { motion } from "framer-motion";

// export default function Allumani() {
//   return (
//     <div className="bg-black text-white min-h-screen">
//       {/* Hero Background Section */}
//       <section className="relative h-[80vh] w-full">
//         <img
//           src="/images/hero-bg.png"
//           alt="Hero Background"
//           className="absolute inset-0 w-full h-full object-cover opacity-70"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
//         <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
//           <motion.h1
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 1 }}
//             className="text-6xl font-extrabold tracking-wide"
//           >
//             Manav Rachna Alumni
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 1 }}
//             className="mt-4 text-xl max-w-2xl italic opacity-90"
//           >
//             Celebrating Excellence, Leadership & Achievements
//           </motion.p>
//         </div>
//       </section>

//       {/* MRE Awards Section */}
//       <section className="py-14">
//         <h2 className="text-4xl font-bold text-left px-6 mb-8">MRE Awards</h2>
//         <div className="flex justify-center items-center gap-8 overflow-x-auto px-6">
//           {[1, 2, 3, 4].map((award, i) => (
//             <motion.div
//               key={award}
//               whileHover={{ scale: 1.05, rotate: 1 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 + i * 0.2 }}
//               className="relative bg-gradient-to-r from-yellow-700 to-yellow-500 p-3 rounded-2xl w-72 text-center shadow-lg hover:shadow-yellow-500/70"
//             >
//               <img
//                 src={`/images/award${award}.png`}
//                 alt={`Award${award}`}
//                 className="w-full h-44 object-cover rounded-lg"
//               />
//               <p className="mt-3 text-sm font-medium">
//                 {award === 1 && "Manav Rachna Excellence Award 2017 for 'Life Time Achievement' to Sh. Rajan Nanda"}
//                 {award === 2 && "Manav Rachna Excellence Award 2017 in 'Nation Building' to Shri Ravindra Chandra Bhargava"}
//                 {award === 3 && "Manav Rachna Excellence Award 2017 as the 'Young Leader' to Ms. Shradha Suri Marwah"}
//                 {award === 4 && "Manav Rachna Excellence Award 2017 for 'Corporate and Industry' to Shri Dinesh Kumar Sarraf"}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Icons of Manav Rachna */}
//       <section className="py-14">
//         <h2 className="text-4xl font-bold text-left px-6 mb-8">Icons of Manav Rachna</h2>
//         <div className="flex justify-center items-center gap-8 overflow-x-auto px-6">
//           {[1, 2, 3, 4].map((icon, i) => (
//             <motion.div
//               key={icon}
//               whileHover={{ scale: 1.05, rotate: -1 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 + i * 0.2 }}
//               className="relative bg-gray-900 p-3 rounded-2xl w-72 text-center shadow-lg hover:shadow-red-500/70"
//             >
//               <img
//                 src={`/images/icon${icon}.png`}
//                 alt={`Icon${icon}`}
//                 className="w-full h-44 object-cover rounded-lg"
//               />
//               <p className="mt-3 text-sm font-medium">
//                 {icon === 1 && "Anoushka Lomas - Wing Commander IAF"}
//                 {icon === 2 && "Lalit Sharma - Country Head Polaris India"}
//                 {icon === 3 && "Dr. Mahima Bakshi - Wellness Activist"}
//                 {icon === 4 && "Parents of Tanmay Grover - VP, Bank of America"}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }


import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Alumini() {
  const navigate = useNavigate();
  const [selectedAward, setSelectedAward] = useState(null);

  const awards = [
    {
      id: 1,
      title: "Life Time Achievement",
      person: "Sh. Rajan Nanda",
      img: "award1.png",
      bg: "hero1-bg.png",
      link: "/award/1",
    },
    {
      id: 2,
      title: "Nation Building",
      person: "Shri Ravindra Chandra Bhargava",
      img: "award2.png",
      bg: "hero2-bg.png",
      link: "/award/2",
    },
    {
      id: 3,
      title: "Young Leader",
      person: "Ms. Shradha Suri Marwah",
      img: "award3.png",
      bg: "hero3-bg.png",
      link: "/award/3",
    },
    {
      id: 4,
      title: "Corporate and Industry",
      person: "Shri Dinesh Kumar Sarraf",
      img: "award4.png",
      bg: "hero4-bg.png",
      link: "/award/4",
    },
  ];

  const icons = [
    {
      id: 1,
      name: "Anoushka Lomas",
      img: "icon1.png",
      link: "/icon/1",
    },
    {
      id: 2,
      name: "Lalit Sharma",
      img: "icon2.png",
      link: "/icon/2",
    },
    {
      id: 3,
      name: "Dr. Mahima Bakshi",
      img: "icon3.png",
      link: "/icon/3",
    },
    {
      id: 4,
      name: "Parents of Tanmay Grover",
      img: "icon4.png",
      link: "/icon/4",
    },
  ];

  // Hero background image (default or selected)
  const heroBg = selectedAward?.bg || "hero1-bg.png";

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center">
        {/* Background */}
        <img
          src={heroBg}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

        {/* Play Button (visible only when award selected) */}
        {selectedAward && (
          <motion.div
            whileHover={{ scale: 1.1, rotate: 2 }}
            className="absolute top-10 left-10 z-20 flex items-center gap-3 px-5 py-3 rounded-full bg-red-600 shadow-lg cursor-pointer hover:shadow-red-500/80"
            onClick={() => navigate(`/award/${selectedAward.id}`)}
          >
            <Play size={28} className="text-white" />
            <span className="font-semibold text-lg">PLAY</span>
          </motion.div>
        )}

        {/* Hero Title */}
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold drop-shadow-lg"
          >
            MRU Awards & Icons
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-lg italic opacity-90"
          >
            Celebrating Excellence, Leadership & Achievements
          </motion.p>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-12 bg-black">
        <h2 className="text-3xl font-semibold text-center mb-8">MRU Awards</h2>
        <div className="flex justify-center items-center gap-6 px-6 overflow-x-auto">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotateY: 3 }}
              whileTap={{ scale: 0.97 }}
              className={`relative bg-gradient-to-r from-yellow-600 to-yellow-500 p-3 rounded-md w-72 h-48 flex flex-col items-center justify-center text-center shadow-xl border border-yellow-400/70 hover:shadow-yellow-400/90 hover:border-yellow-300 cursor-pointer ${
                selectedAward?.id === award.id ? "ring-4 ring-red-500" : ""
              }`}
              onClick={() => setSelectedAward(award)} // ✅ set selected award
            >
              <img
                src={award.img}
                alt={award.person}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <p className="font-semibold text-sm">{award.title}</p>
              <span className="text-xs opacity-80">{award.person}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Icons Section */}
      <section className="py-12 bg-black">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Icons of Manav Rachna
        </h2>
        <div className="flex justify-center items-center gap-6 px-6 overflow-x-auto">
          {icons.map((icon, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotateY: -3 }}
              whileTap={{ scale: 0.97 }}
              className="relative bg-gray-900 p-3 rounded-md w-64 h-44 flex flex-col items-center justify-center text-center shadow-xl border border-red-400/70 hover:shadow-red-500/90 hover:border-red-300 cursor-pointer"
              onClick={() => navigate(icon.link)}
            >
              <img
                src={icon.img}
                alt={icon.name}
                className="w-full h-28 object-cover rounded-md mb-2"
              />
              <p className="font-semibold text-sm">{icon.name}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}









// import React from "react";
// import { motion } from "framer-motion";
// import { Play } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function Alumini() {
//   const navigate = useNavigate();

//   const awards = [
//     {
//       id: 1,
//       title: "Life Time Achievement",
//       person: "Sh. Rajan Nanda",
//       img: "award1.png",
//       link: "/award/1",
//     },
//     {
//       id: 2,
//       title: "Nation Building",
//       person: "Shri Ravindra Chandra Bhargava",
//       img: "award2.png",
//       link: "/award/2",
//     },
//     {
//       id: 3,
//       title: "Young Leader",
//       person: "Ms. Shradha Suri Marwah",
//       img: "award3.png",
//       link: "/award/3",
//     },
//     {
//       id: 4,
//       title: "Corporate and Industry",
//       person: "Shri Dinesh Kumar Sarraf",
//       img: "award4.png",
//       link: "/award/4",
//     },
//   ];

//   const icons = [
//     {
//       id: 1,
//       name: "Anoushka Lomas",
//       img: "icon1.png",
//       link: "/icon/1",
//     },
//     {
//       id: 2,
//       name: "Lalit Sharma",
//       img: "icon2.png",
//       link: "/icon/2",
//     },
//     {
//       id: 3,
//       name: "Dr. Mahima Bakshi",
//       img: "icon3.png",
//       link: "/icon/3",
//     },
//     {
//       id: 4,
//       name: "Parents of Tanmay Grover",
//       img: "icon4.png",
//       link: "/icon/4",
//     },
//   ];

//   return (
//     <div className="bg-black text-white min-h-screen">
//       {/* Hero Section */}
//       <section className="relative h-[80vh] w-full flex items-center justify-center">
//         {/* Background */}
//         <img
//           src="hero-bg.png"
//           alt="Hero Background"
//           className="absolute inset-0 w-full h-full object-cover opacity-70"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

//         {/* Play Button */}
//         <motion.div
//           whileHover={{ scale: 1.1, rotate: 2 }}
//           className="absolute top-10 left-10 z-20 flex items-center gap-3 px-5 py-3 rounded-full bg-red-600 shadow-lg cursor-pointer hover:shadow-red-500/80"
//           onClick={() => navigate("/awards")}
//         >
//           <Play size={28} className="text-white" />
//           <span className="font-semibold text-lg">PLAY</span>
//         </motion.div>

//         {/* Hero Title */}
//         <div className="relative z-10 text-center">
//           <motion.h1
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 1 }}
//             className="text-5xl font-extrabold drop-shadow-lg"
//           >
//             MRU Awards & Icons
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 1 }}
//             className="mt-4 text-lg italic opacity-90"
//           >
//             Celebrating Excellence, Leadership & Achievements
//           </motion.p>
//         </div>
//       </section>

//       {/* Awards Section */}
//       <section className="py-12 bg-black">
//         <h2 className="text-3xl font-semibold text-center mb-8">MRU Awards</h2>
//         <div className="flex justify-center items-center gap-6 px-6 overflow-x-auto">
//           {awards.map((award, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05, rotateY: 3 }}
//               whileTap={{ scale: 0.97 }}
//               className="relative bg-gradient-to-r from-yellow-600 to-yellow-500 p-3 rounded-md w-72 h-48 flex flex-col items-center justify-center text-center shadow-xl border border-yellow-400/70 hover:shadow-yellow-400/90 hover:border-yellow-300 cursor-pointer"
//               onClick={() => navigate(award.link)}
//             >
//               <img
//                 src={award.img}
//                 alt={award.person}
//                 className="w-full h-32 object-cover rounded-md mb-2"
//               />
//               <p className="font-semibold text-sm">{award.title}</p>
//               <span className="text-xs opacity-80">{award.person}</span>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Icons Section */}
//       <section className="py-12 bg-black">
//         <h2 className="text-3xl font-semibold text-center mb-8">
//           Icons of Manav Rachna
//         </h2>
//         <div className="flex justify-center items-center gap-6 px-6 overflow-x-auto">
//           {icons.map((icon, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05, rotateY: -3 }}
//               whileTap={{ scale: 0.97 }}
//               className="relative bg-gray-900 p-3 rounded-md w-64 h-44 flex flex-col items-center justify-center text-center shadow-xl border border-red-400/70 hover:shadow-red-500/90 hover:border-red-300 cursor-pointer"
//               onClick={() => navigate(icon.link)}
//             >
//               <img
//                 src={icon.img}
//                 alt={icon.name}
//                 className="w-full h-28 object-cover rounded-md mb-2"
//               />
//               <p className="font-semibold text-sm">{icon.name}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }
