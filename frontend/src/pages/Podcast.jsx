// Podcast.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowLeft, Clock, User } from "lucide-react";

// ================= Motion Variants =================
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, when: "beforeChildren" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ================= Data =================
const podcasts = [
  {
    img: import.meta.env.BASE_URL + "podcast1.jpg",
    title: "The #1 Thing Industry Wants in Engineers",
    speaker: "Ft. Dr. Venkatesh Radhakrishnan",
    desc: "We unpack the future of engineering talent in this high-stakes conversation where real-world skills meet evolving industry benchmarks, and students transition into true industry-ready professionals.",
    videoId: "S7IOV-HaVME",
  },
  {
    img: import.meta.env.BASE_URL + "podcast2.jpg",
    title: "Traditional vs Dynamic Pedagogy",
    speaker: "Ft. Dr. Anadajit Goswami",
    desc: "Discover how India is positioning itself as a global semiconductor hub...",
    videoId: "8yMwHkDy6ZU",
  },
  {
    img: import.meta.env.BASE_URL + "podcast3.jpg",
    title: "India’s Silicon Leap",
    speaker: "Ft. Dr. Ashwini K. Aggarwal",
    desc: "In a riveting conversation with Dr. Anadajit Goswami...",
    videoId: "Gj6XjGR4tU8",
  },
  {
    img: import.meta.env.BASE_URL + "podcast4.jpg",
    title: "Will AI make Engineering Obsolete?",
    speaker: "Ft. Dr. Dipali Bansal",
    desc: "Our guest for this episode, Dr. Dipali Bansal...",
    videoId: "0Gz9wP4eCEs",
  },
];

// 🔹 Categories
const weeklyPodcasts = [podcasts[3], podcasts[1]];
const dailyPodcasts = [podcasts[2], podcasts[0], podcasts[3]];

export default function Podcast() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);

  const activePodcast = podcasts[activeIndex];

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      {isPlaying ? (
        // ✅ Fullscreen Video Player
        <div className="fixed inset-0 w-full h-full bg-black z-50">
          {/* Back Button */}
          {/* <button
            onClick={() => {
              setIsPlaying(false);
              setShowDetailView(true);
            }}
            className="absolute top-4 left-4 z-50 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button> */}

          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${activePodcast.videoId}?autoplay=1`}
            title={activePodcast.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      ) : showDetailView ? (
        // ✅ Detailed View with Background Image and Content
        <div className="fixed inset-0 w-full h-full bg-black z-40">
          {/* Background Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${activePodcast.img})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
          </motion.div>

          {/* Back Button
          <button
            onClick={() => setShowDetailView(false)}
            className="absolute top-6 left-6 z-50 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/70 transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button> */}

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {activePodcast.title}
              </h1>

              {/* Speaker */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <User className="w-5 h-5 text-red-500" />
                <p className="text-xl text-gray-200">{activePodcast.speaker}</p>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                {activePodcast.desc}
              </p>

              {/* Enhanced Play Button */}
              <motion.button
                onClick={() => {
                  setShowDetailView(false);
                  setIsPlaying(true);
                }}
                className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all duration-300">
                    <Play className="w-6 h-6 fill-white" />
                  </div>
                  <span>Play Episode</span>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"></div>
              </motion.button>

              {/* Additional Info */}
              <div className="mt-8 flex items-center justify-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Full Episode</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>HD Quality</span>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <>
          {/* 🔹 Featured Podcast Section */}
          <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-6">
            {/* Background */}
            <motion.div
              key={activeIndex}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${activePodcast.img})` }}
            >
              <div className="absolute inset-0 bg-black/60" />
            </motion.div>

            {/* Foreground */}
            <div className="relative z-10">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="text-4xl font-bold mb-4">{activePodcast.title}</h1>
                <p className="mb-2 text-lg">🎙️ {activePodcast.speaker}</p>
                <p className="mb-6 text-gray-300 max-w-2xl mx-auto">
                  {activePodcast.desc}
                </p>
                <motion.button
                  onClick={() => setShowDetailView(true)}
                  className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-red-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all duration-300">
                      <Play className="w-5 h-5 fill-white" />
                    </div>
                    <span>Watch Now</span>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"></div>
                </motion.button>
              </motion.div>

              {/* Thumbnails */}
              <motion.div
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="mt-12 flex gap-6 flex-wrap justify-center"
              >
                {podcasts.map((p, idx) => (
                  <motion.img
                    key={idx}
                    variants={cardVariant}
                    src={p.img}
                    alt={`podcast-${idx}`}
                    onClick={() => {
                      setActiveIndex(idx);
                      setShowDetailView(true);
                    }}
                    className="w-60 h-40 object-cover rounded-xl cursor-pointer border-2 border-transparent hover:border-red-500 transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* 🔹 Additional Sections */}
          <div className="px-8 py-12 space-y-12">
            {/* Manav Rachna Podcast */}
            <div>
              <h2 className="text-3xl font-bold mb-6">The Manav Rachna Podcast</h2>
              <motion.div
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="flex gap-6 flex-wrap justify-center"
              >
                {podcasts.map((p, idx) => (
                  <motion.img
                    key={idx}
                    variants={cardVariant}
                    src={p.img}
                    alt={`manav-${idx}`}
                    onClick={() => {
                      setActiveIndex(idx);
                      setShowDetailView(true);
                    }}
                    className="w-72 h-44 object-cover rounded-xl cursor-pointer border-2 border-transparent hover:border-red-500 transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Weekly */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Weekly Podcast</h2>
              <motion.div
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="flex gap-6 flex-wrap justify-center"
              >
                {weeklyPodcasts.map((p, idx) => (
                  <motion.img
                    key={idx}
                    variants={cardVariant}
                    src={p.img}
                    alt={`weekly-${idx}`}
                    onClick={() => {
                      setActiveIndex(podcasts.indexOf(p));
                      setShowDetailView(true);
                    }}
                    className="w-72 h-44 object-cover rounded-xl cursor-pointer border-2 border-transparent hover:border-red-500 transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Daily */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Daily Podcast | MRU</h2>
              <motion.div
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="flex gap-6 flex-wrap justify-center"
              >
                {dailyPodcasts.map((p, idx) => (
                  <motion.img
                    key={idx}
                    variants={cardVariant}
                    src={p.img}
                    alt={`daily-${idx}`}
                    onClick={() => {
                      setActiveIndex(podcasts.indexOf(p));
                      setShowDetailView(true);
                    }}
                    className="w-72 h-44 object-cover rounded-xl cursor-pointer border-2 border-transparent hover:border-red-500 transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
