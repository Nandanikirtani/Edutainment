// CampusLife.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import PodcastContent from "../components/PodcastContent";


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
  { img: import.meta.env.BASE_URL + "course1.png" },
  { img: import.meta.env.BASE_URL + "course2.png" },
  { img: import.meta.env.BASE_URL + "course3.png" },
  { img: import.meta.env.BASE_URL + "course4.png" },
];

export default function CampusLife() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [awardIndex, setAwardIndex] = useState(0);
  const [showPodcast, setShowPodcast] = useState(false);

  const activePodcast = podcasts[activeIndex];

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
          <div className="mt-12 flex gap-6 flex-wrap justify-center">
            {podcasts.map((p, idx) => (
              <motion.img
                key={idx}
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
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {happenings.map((item, idx) => (
            <motion.img
              key={idx}
              src={item.img}
              alt={`happening-${idx}`}
              className="w-full h-40 object-cover rounded-lg cursor-pointer transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
      </div>

      {/* 🔹 Icons of Manav Rachna */}
      <div className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">Icons of Manav Rachna</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {icons.map((icon, idx) => (
            <motion.img
              key={idx}
              src={icon.img}
              alt={`icon-${idx}`}
              className="w-full h-52 object-cover rounded-md cursor-pointer transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
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


      {/* 🔹 Courses Offered */}
      <div className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">Courses Offered</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, idx) => (
            <motion.img
              key={idx}
              src={course.img}
              alt={`course-${idx}`}
              className="w-full h-40 object-cover rounded-lg cursor-pointer transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
