import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowLeft, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Alumini() {
  const navigate = useNavigate();
  const [selectedAward, setSelectedAward] = useState(null);
  
  // Video states for MRU Awards
  const [awardActiveIndex, setAwardActiveIndex] = useState(0);
  const [awardIsPlaying, setAwardIsPlaying] = useState(false);
  const [awardShowDetailView, setAwardShowDetailView] = useState(false);
  
  // Video states for Icons
  const [iconActiveIndex, setIconActiveIndex] = useState(0);
  const [iconIsPlaying, setIconIsPlaying] = useState(false);
  const [iconShowDetailView, setIconShowDetailView] = useState(false);

  const awards = [
    {
      id: 1,
      title: "Life Time Achievement",
      person: "Sh. Rajan Nanda",
      img: "award1.png",
      bg: "hero1-bg.png",
      link: "/award/1",
      videoId: "qjG6PU4IrYs",
      desc: "Celebrating the lifetime achievements and contributions of Sh. Rajan Nanda to society and industry excellence.",
    },
    {
      id: 2,
      title: "Nation Building",
      person: "Shri Ravindra Chandra Bhargava",
      img: "award2.png",
      bg: "hero2-bg.png",
      link: "/award/2",
      videoId: "WBl0I7WaACA",
      desc: "Honoring Shri Ravindra Chandra Bhargava's exceptional contributions to nation building and industrial development.",
    },
    {
      id: 3,
      title: "Young Leader",
      person: "Ms. Shradha Suri Marwah",
      img: "award3.png",
      bg: "hero3-bg.png",
      link: "/award/3",
      videoId: "pGmBsWEFrtU",
      desc: "Recognizing Ms. Shradha Suri Marwah's outstanding leadership qualities and achievements as a young leader.",
    },
    {
      id: 4,
      title: "Corporate and Industry",
      person: "Shri Dinesh Kumar Sarraf",
      img: "award4.png",
      bg: "hero4-bg.png",
      link: "/award/4",
      videoId: "AjQ-qntkWRY",
      desc: "Acknowledging Shri Dinesh Kumar Sarraf's remarkable contributions to corporate excellence and industry leadership.",
    },
  ];

  const icons = [
    {
      id: 1,
      name: "Anoushka Lomas",
      img: "icon1.png",
      link: "/icon/1",
      videoId: "3o6Tze3o43k",
      desc: "Discover the inspiring journey of Anoushka Lomas and her achievements at Manav Rachna.",
      tag: "Alumni Success Story",
    },
    {
      id: 2,
      name: "Lalit Sharma",
      img: "icon2.png",
      link: "/icon/2",
      videoId: "rL5tVESPJs8",
      desc: "Learn about Lalit Sharma's remarkable career path and contributions to the industry.",
      tag: "Industry Leader",
    },
    {
      id: 3,
      name: "Dr. Mahima Bakshi",
      img: "icon3.png",
      link: "/icon/3",
      videoId: "1XnvvvJew3I",
      desc: "Explore Dr. Mahima Bakshi's academic achievements and research contributions.",
      tag: "Academic Excellence",
    },
    {
      id: 4,
      name: "Parents of Tanmay Grover",
      img: "icon4.png",
      link: "/icon/4",
      videoId: "DtfhT5KiCLA",
      desc: "Hear from the parents of Tanmay Grover about their experience with Manav Rachna.",
      tag: "Family Testimonial",
    },
  ];

  // Hero background image (default or selected)
  const heroBg = selectedAward?.bg || "hero1-bg.png";
  
  // Active items for video functionality
  const activeAward = awards[awardActiveIndex];
  const activeIcon = icons[iconActiveIndex];

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
            className="absolute top-10 left-10 z-20 flex items-center gap-3 px-5 py-3 rounded-full bg-[#4DB3A7] shadow-lg cursor-pointer hover:shadow-[#4DB3A7]/80"
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
                selectedAward?.id === award.id ? "ring-4 ring-[#4DB3A7]" : ""
              }`}
              onClick={() => {
                setSelectedAward(award);
                setAwardActiveIndex(i);
                setAwardShowDetailView(true);
              }}
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
              className="relative bg-gray-900 p-3 rounded-md w-64 h-44 flex flex-col items-center justify-center text-center shadow-xl border border-[#4DB3A7]/70 hover:shadow-[#4DB3A7]/90 hover:border-[#4DB3A7]/70 cursor-pointer"
              onClick={() => {
                setIconActiveIndex(i);
                setIconShowDetailView(true);
              }}
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

      {/* 🔹 MRU Awards Video Player */}
      {awardIsPlaying && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setAwardIsPlaying(false)}
            className="absolute top-4 right-4 bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:bg-white/30 transition"
          >
            ×
          </button>

          <div className="flex flex-col items-center gap-4">
            <h3 className="text-white text-xl font-semibold">
              {activeAward.title}
            </h3>
            <iframe
              src={`https://www.youtube.com/embed/${activeAward.videoId}?autoplay=1`}
              title={activeAward.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-[90vw] h-[70vh] max-w-5xl rounded-lg shadow-[0_0_25px_rgba(255,165,0,0.5)]"
            ></iframe>
          </div>
        </div>
      )}

      {/* 🔹 Icons Video Player */}
      {iconIsPlaying && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setIconIsPlaying(false)}
            className="absolute top-4 right-4 bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:bg-white/30 transition"
          >
            ×
          </button>

          <div className="flex flex-col items-center gap-4">
            <h3 className="text-white text-xl font-semibold">
              {activeIcon.name}
            </h3>
            <iframe
              src={`https://www.youtube.com/embed/${activeIcon.videoId}?autoplay=1`}
              title={activeIcon.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-[90vw] h-[70vh] max-w-5xl rounded-lg shadow-[0_0_25px_rgba(77,179,167,0.5)]"
            ></iframe>
          </div>
        </div>
      )}

      {/* 🔹 MRU Awards Detail View */}
      {awardShowDetailView && (
        <div className="fixed inset-0 w-full h-full bg-black z-40">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${activeAward.bg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
          </motion.div>

          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {activeAward.title}
              </h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <User className="w-5 h-5 text-yellow-500" />
                <p className="text-xl text-gray-200">{activeAward.person}</p>
              </div>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                {activeAward.desc}
              </p>
              <motion.button
                onClick={() => {
                  setAwardShowDetailView(false);
                  setAwardIsPlaying(true);
                }}
                className="group relative bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all duration-300">
                    <Play className="w-6 h-6 fill-white" />
                  </div>
                  <span>Watch Award Story</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-700 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"></div>
              </motion.button>
              <div className="mt-8 flex items-center justify-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Award Ceremony</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>HD Quality</span>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* 🔹 Icons Detail View */}
      {iconShowDetailView && (
        <div className="fixed inset-0 w-full h-full bg-black z-40">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${activeIcon.img})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
          </motion.div>

          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {activeIcon.name}
              </h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <User className="w-5 h-5 text-[#4DB3A7]" />
                <p className="text-xl text-gray-200">{activeIcon.tag}</p>
              </div>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                {activeIcon.desc}
              </p>
              <motion.button
                onClick={() => {
                  setIconShowDetailView(false);
                  setIconIsPlaying(true);
                }}
                className="group relative bg-gradient-to-r from-[#4DB3A7] to-[#3AA79D] hover:from-[#3AA79D] hover:to-[#2D8B82] text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-[#4DB3A7]/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all duration-300">
                    <Play className="w-6 h-6 fill-white" />
                  </div>
                  <span>Watch Story</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4DB3A7] to-[#3AA79D] opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"></div>
              </motion.button>
              <div className="mt-8 flex items-center justify-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Success Story</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>HD Quality</span>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
