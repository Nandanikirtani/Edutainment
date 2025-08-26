import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const podcasts = [
  {
    img: import.meta.env.BASE_URL + "podcast1.jpg",
    path: "/podcast1",
  },
  {
    img: import.meta.env.BASE_URL + "podcast2.jpg",
    path: "/podcast2",
  },
  {
    img: import.meta.env.BASE_URL + "podcast3.jpg",
    path: "/podcast3",
  },
  {
    img: import.meta.env.BASE_URL + "podcast4.jpg",
    path: "/podcast4",
  },
];

export default function CampusLife() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePodcast = podcasts[activeIndex];
  const navigate = useNavigate();

  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">
      {/* 🔹 Background Image */}
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

      {/* 🔹 Foreground */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center p-6">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Play button -> Navigate to page */}
          <button
            onClick={() => navigate(activePodcast.path)}
            className="mt-6 px-6 py-3 bg-red-600 rounded-full flex items-center gap-2 hover:bg-red-700 transition"
          >
            <Play className="w-5 h-5" /> Play
          </button>
        </motion.div>

        {/* 🔹 Thumbnail Selector */}
        <div className="mt-12 flex gap-4 flex-wrap justify-center">
          {podcasts.map((p, idx) => (
            <motion.img
              key={idx}
              src={p.img}
              alt={`podcast-${idx}`}
              onClick={() => setActiveIndex(idx)}
              className={`w-28 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                idx === activeIndex
                  ? "border-red-500 scale-110"
                  : "border-white/30"
              }`}
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
