// CampusLife.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowLeft, Clock, User } from "lucide-react";
import PodcastContent from "../components/PodcastContent";

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
    desc: "We unpack the future of engineering talent in this high-stakes conversation where real-world skills meet evolving industry benchmarks, and students transition into true industry-ready professionals. ",
  },
  {
    img: import.meta.env.BASE_URL + "podcast2.jpg",
    title: "Traditional vs Dynamic Pedagogy",
    speaker: "Ft. Dr. Anadajit Goswami",
    desc: "Discover how India is positioning itself as a global semiconductor hub through major government initiatives like the ₹76,000 crore Semicon India Program, rising investments, and the growing startup ecosystem. Learn about the critical talent pipeline for advanced chip design, fabrication, and packaging, and hear actionable insights on how industry-academia collaborations are shaping the future workforce for the deep-tech hardware revolution.",
  },
  {
    img: import.meta.env.BASE_URL + "podcast3.jpg",
    title: "India’s Silicon Leap",
    speaker: "Ft. Dr. Ashwini K. Aggarwal",
    desc: "In a riveting conversation with Dr. Anadajit Goswami — Professor and Director at the School of Behavioural and Social Sciences, Research Director at Manav Rachna International Institute of Research and Studies, and a leading voice across institutions like IMPRI, Ashoka University, and J-PAL — we unravel the transformative state of education in the age of interdisciplinarity.  ",
  },
  {
    img: import.meta.env.BASE_URL + "podcast4.jpg",
    title: "Will AI make Engineering Obsolete?",
    speaker: "Ft. Dr. Dipali Bansal",
    desc: "Our guest for this episode, Dr. Dipali Bansal, Professor and Dean, School of Engineering at Manav Rachna University, brings decades of academic and industry experience to the mic. With her deep expertise in AI, signal processing, and emerging tech trends, Dr. Bansal breaks down the myths, realities, and future pathways of engineering in the age of AI. ",
  },
];

// 🔹 Happenings
const happenings = [
  { img: import.meta.env.BASE_URL + "mru1.jpg" },
  { img: import.meta.env.BASE_URL + "mru2.jpg" },
  { img: import.meta.env.BASE_URL + "mru3.jpg" },
  { img: import.meta.env.BASE_URL + "mru4.jpg" },
];

// 🔹 Icons
const icons = [
  { img: import.meta.env.BASE_URL + "icon1.jpg" },
  { img: import.meta.env.BASE_URL + "icon2.jpg" },
  { img: import.meta.env.BASE_URL + "icon3.jpg" },
  { img: import.meta.env.BASE_URL + "icon4.jpg" },
];

// 🔹 Awards
const awards = [
  { img: import.meta.env.BASE_URL + "award1.png" },
  { img: import.meta.env.BASE_URL + "award2.png" },
  { img: import.meta.env.BASE_URL + "award3.png" },
  { img: import.meta.env.BASE_URL + "award4.png" },
];

// 🔹 Courses
const courses = [
  { 
    img: import.meta.env.BASE_URL + "course1.png", 
    title: "B.Tech Automobile", 
    tag: "Engineering", 
    videoId: "C2ZFWaHOAaQ", 
    desc: "Explore the world of automotive engineering with cutting-edge technology and hands-on learning experiences." 
  },
  { 
    img: import.meta.env.BASE_URL + "course2.png", 
    title: "MBA Programs", 
    tag: "Business", 
    videoId: "FFbCjEAestA", 
    desc: "Transform your career with our comprehensive MBA programs designed for future business leaders." 
  },
  { 
    img: import.meta.env.BASE_URL + "course3.png", 
    title: "Psychology", 
    tag: "Behavioral Science", 
    videoId: "_bFV-saB2Uk", 
    desc: "Understand human behavior and mental processes through our advanced psychology curriculum." 
  },
  { 
    img: import.meta.env.BASE_URL + "course4.png", 
    title: "Mass Comm.", 
    tag: "Media", 
    videoId: "XOZhYijcVBY", 
    desc: "Master the art of communication and media with our industry-focused mass communication program." 
  },
];

// 🔹 Icons of Manav Rachna with video data
const iconsWithVideos = [
  { 
    img: import.meta.env.BASE_URL + "icon1.jpg", 
    title: "Anoushka Lomas", 
    tag: "Alumni Success Story", 
    videoId: "3o6Tze3o43k", 
    desc: "Discover the inspiring journey of Anoushka Lomas and her achievements at Manav Rachna." 
  },
  { 
    img: import.meta.env.BASE_URL + "icon2.jpg", 
    title: "Lalit Sharma", 
    tag: "Industry Leader", 
    videoId: "rL5tVESPJs8", 
    desc: "Learn about Lalit Sharma's remarkable career path and contributions to the industry." 
  },
  { 
    img: import.meta.env.BASE_URL + "icon3.jpg", 
    title: "Dr. Mahima Bakshi", 
    tag: "Academic Excellence", 
    videoId: "1XnvvvJew3I", 
    desc: "Explore Dr. Mahima Bakshi's academic achievements and research contributions." 
  },
  { 
    img: import.meta.env.BASE_URL + "icon4.jpg", 
    title: "Parents of Tanmay Grover", 
    tag: "Family Testimonial", 
    videoId: "DtfhT5KiCLA", 
    desc: "Hear from the parents of Tanmay Grover about their experience with Manav Rachna." 
  },
];

export default function CampusLife() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [awardIndex, setAwardIndex] = useState(0);
  const [showPodcast, setShowPodcast] = useState(false);
  
  // Video states for Programs Offered
  const [programActiveIndex, setProgramActiveIndex] = useState(0);
  const [programIsPlaying, setProgramIsPlaying] = useState(false);
  const [programShowDetailView, setProgramShowDetailView] = useState(false);
  
  // Video states for Icons of Manav Rachna
  const [iconActiveIndex, setIconActiveIndex] = useState(0);
  const [iconIsPlaying, setIconIsPlaying] = useState(false);
  const [iconShowDetailView, setIconShowDetailView] = useState(false);

  const activePodcast = podcasts[activeIndex];
  const activeProgram = courses[programActiveIndex];
  const activeIcon = iconsWithVideos[iconActiveIndex];

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      {/* 🔹 Podcast Section with Background */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-6">
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

        <div className="relative z-10">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button
              onClick={() => setShowPodcast(true)}
              className="mt-6 px-6 py-3 bg-red-600 rounded-full flex items-center gap-2 hover:bg-red-700 transition"
            >
              <Play className="w-5 h-5" /> Play
            </button>
          </motion.div>

          {/* 🔹 Podcast Thumbnails */}
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
                  setShowPodcast(false);
                }}
                className="w-60 h-40 object-cover rounded-xl cursor-pointer border-2 border-transparent hover:border-red-500 transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {showPodcast && (
        <div className="fixed inset-0 z-50">
          <PodcastContent
            title={activePodcast.title}
            speaker={activePodcast.speaker}
            desc={activePodcast.desc}
            bgImage={activePodcast.img}
          />
          <button
            onClick={() => setShowPodcast(false)}
            className="absolute top-5 right-5 z-60 bg-red-600 px-4 py-2 rounded-lg text-white font-semibold"
          >
            ✕ Close
          </button>
        </div>
      )}

      {/* 🔹 What's happening @MRU */}
      <div className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">What's happening @MRU</h2>
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {happenings.map((item, idx) => (
            <motion.img
              key={idx}
              variants={cardVariant}
              src={item.img}
              alt={`happening-${idx}`}
              className="w-full h-40 object-cover rounded-lg cursor-pointer transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </motion.div>
      </div>

      {/* 🔹 Icons of Manav Rachna */}
      <div className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">Icons of Manav Rachna</h2>
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {iconsWithVideos.map((icon, idx) => (
            <motion.img
              key={idx}
              variants={cardVariant}
              src={icon.img}
              alt={`icon-${idx}`}
              onClick={() => {
                setIconActiveIndex(idx);
                setIconShowDetailView(true);
              }}
              className="w-full h-52 object-cover rounded-md cursor-pointer transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </motion.div>
      </div>

      {/* 🔹 MRE Awards */}
      <div className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">MRE Awards</h2>
        <div className="max-w-6xl mx-auto flex items-center justify-between relative">
          {/* Left Button */}
          <button
            onClick={() =>
              setAwardIndex((prev) => (prev === 0 ? awards.length - 1 : prev - 1))
            }
            className="absolute -left-10 bg-yellow-500 text-black px-3 py-2 rounded-full z-10"
          >
            ◀
          </button>

          {/* Card Layout */}
          <motion.div
            key={awardIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-6 border-2 border-yellow-500 rounded-2xl p-6 w-full"
          >
            {/* Left Text */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2 text-gray-300">
                Lifetime Achievement Award to Shri Rajan Nanda
              </h3>
              <p className="text-gray-400 text-sm">
                Honored for his exemplary contribution to society and leadership
                excellence.
              </p>
            </div>

            {/* Right Image */}
            <motion.img
              src={awards[awardIndex].img}
              alt={`award-${awardIndex}`}
              className="flex-1 w-full md:w-80 h-60 object-cover rounded-lg transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,215,0,0.7)]"
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>

          {/* Right Button */}
          <button
            onClick={() =>
              setAwardIndex((prev) => (prev === awards.length - 1 ? 0 : prev + 1))
            }
            className="absolute -right-10 bg-yellow-500 text-black px-3 py-2 rounded-full z-10"
          >
            ▶
          </button>
        </div>
      </div>

      {/* 🔹 Programs Offered */}
      <div className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">Programs Offered</h2>
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {courses.map((course, idx) => (
            <motion.img
              key={idx}
              variants={cardVariant}
              src={course.img}
              alt={`course-${idx}`}
              onClick={() => {
                setProgramActiveIndex(idx);
                setProgramShowDetailView(true);
              }}
              className="w-full h-40 object-cover rounded-lg cursor-pointer transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </motion.div>
      </div>

      {/* 🔹 Programs Offered Video Player */}
      {programIsPlaying && (
        <div className="fixed inset-0 w-full h-full bg-black z-50">
          {/* <button
            onClick={() => {
              setProgramIsPlaying(false);
              setProgramShowDetailView(true);
            }}
            className="absolute top-4 left-4 z-50 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button> */}
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${activeProgram.videoId}?autoplay=1`}
            title={activeProgram.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* 🔹 Programs Offered Detail View */}
      {programShowDetailView && (
        <div className="fixed inset-0 w-full h-full bg-black z-40">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${activeProgram.img})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
          </motion.div>

          {/* <button
            onClick={() => setProgramShowDetailView(false)}
            className="absolute top-6 left-6 z-50 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/70 transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button> */}

          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {activeProgram.title}
              </h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <User className="w-5 h-5 text-red-500" />
                <p className="text-xl text-gray-200">{activeProgram.tag}</p>
              </div>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                {activeProgram.desc}
              </p>
              <motion.button
                onClick={() => {
                  setProgramShowDetailView(false);
                  setProgramIsPlaying(true);
                }}
                className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all duration-300">
                    <Play className="w-6 h-6 fill-white" />
                  </div>
                  <span>Watch Program</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"></div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      )}

      {/* 🔹 Icons Video Player */}
      {iconIsPlaying && (
        <div className="fixed inset-0 w-full h-full bg-black z-50">
          {/* <button
            onClick={() => {
              setIconIsPlaying(false);
              setIconShowDetailView(true);
            }}
            className="absolute top-4 left-4 z-50 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button> */}
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${activeIcon.videoId}?autoplay=1`}
            title={activeIcon.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
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

          {/* <button
            onClick={() => setIconShowDetailView(false)}
            className="absolute top-6 left-6 z-50 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/70 transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button> */}

          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {activeIcon.title}
              </h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <User className="w-5 h-5 text-red-500" />
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
                className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all duration-300">
                    <Play className="w-6 h-6 fill-white" />
                  </div>
                  <span>Watch Story</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"></div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
