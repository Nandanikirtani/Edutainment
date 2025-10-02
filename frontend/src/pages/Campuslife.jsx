// CampusLife.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, User } from "lucide-react";
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
    desc: "We unpack the future of engineering talent in this high-stakes conversation where real-world skills meet evolving industry benchmarks, and students transition into true industry-ready professionals.",
    videoId: "S7IOV-HaVME",
  },
  {
    img: import.meta.env.BASE_URL + "podcast2.jpg",
    title: "Traditional vs Dynamic Pedagogy",
    speaker: "Ft. Dr. Anadajit Goswami",
    desc: "Discover how India is positioning itself as a global semiconductor hub through major government initiatives like the ₹76,000 crore Semicon India Program, rising investments, and the growing startup ecosystem.",
    videoId: "8yMwHkDy6ZU",
  },
  {
    img: import.meta.env.BASE_URL + "podcast3.jpg",
    title: "India's Silicon Leap",
    speaker: "Ft. Dr. Ashwini K. Aggarwal",
    desc: "In a riveting conversation with Dr. Anadajit Goswami — Professor and Director at the School of Behavioural and Social Sciences, Research Director at Manav Rachna International Institute of Research and Studies.",
    videoId: "Gj6XjGR4tU8",
  },
  {
    img: import.meta.env.BASE_URL + "podcast4.jpg",
    title: "Will AI make Engineering Obsolete?",
    speaker: "Ft. Dr. Dipali Bansal",
    desc: "Dr. Dipali Bansal, Professor and Dean, School of Engineering at Manav Rachna University, brings decades of academic and industry experience to the mic.",
    videoId: "0Gz9wP4eCEs",
  },
];

const happenings = [
  { img: import.meta.env.BASE_URL + "mru1.jpg" },
  { img: import.meta.env.BASE_URL + "mru2.jpg" },
  { img: import.meta.env.BASE_URL + "mru3.jpg" },
  { img: import.meta.env.BASE_URL + "mru4.jpg" },
];

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

const courses = [
  { 
    img: import.meta.env.BASE_URL + "course1.png", 
    title: "The #1 Thing Industry Wants in Engineers", 
    tag: "Engineering", 
    videoId: "C2ZFWaHOAaQ", 
    desc: "We unpack the future of engineering talent in this high-stakes conversation where real-world skills meet evolving industry benchmarks, and students transition into true industry-ready professionals." 
  },
  { 
    img: import.meta.env.BASE_URL + "course2.png", 
    title: "Traditional vs Dynamic Pedagogy", 
    tag: "Education", 
    videoId: "FFbCjEAestA", 
    desc: "Discover how India is positioning itself as a global semiconductor hub through major government initiatives like the ₹76,000 crore Semicon India Program." 
  },
  { 
    img: import.meta.env.BASE_URL + "course3.png", 
    title: "India's Silicon Leap", 
    tag: "Technology", 
    videoId: "_bFV-saB2Uk", 
    desc: "Exploring India's journey in the semiconductor industry and its impact on the global tech landscape." 
  },
  { 
    img: import.meta.env.BASE_URL + "course4.png", 
    title: "Will AI make Engineering Obsolete?", 
    tag: "AI & Future", 
    videoId: "XOZhYijcVBY", 
    desc: "A deep dive into how artificial intelligence is reshaping the engineering landscape and what it means for future engineers." 
  },
];

export default function CampusLife() {
  const [activePodcastIndex, setActivePodcastIndex] = useState(0);
  const [podcastIsPlaying, setPodcastIsPlaying] = useState(false);
  const [podcastDetailView, setPodcastDetailView] = useState(false);

  const [programActiveIndex, setProgramActiveIndex] = useState(0);
  const [programIsPlaying, setProgramIsPlaying] = useState(false);
  const [programDetailView, setProgramDetailView] = useState(false);

  const [iconActiveIndex, setIconActiveIndex] = useState(0);
  const [iconIsPlaying, setIconIsPlaying] = useState(false);
  const [iconDetailView, setIconDetailView] = useState(false);

  const activePodcast = podcasts[activePodcastIndex];
  const activeProgram = courses[programActiveIndex];
  const activeIcon = iconsWithVideos[iconActiveIndex];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* ================= Podcast Section ================= */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${activePodcast.img})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold">{activePodcast.title}</h2>
          <button
            onClick={() => setPodcastIsPlaying(true)}
            className="mt-6 px-6 py-3 bg-red-600 rounded-full flex items-center gap-2 hover:bg-red-700 transition"
          >
            <Play className="w-5 h-5" /> Play
          </button>

          <div className="mt-12 flex gap-6 flex-wrap justify-center">
            {podcasts.map((p, idx) => (
              <img
                key={idx}
                src={p.img}
                alt={`podcast-${idx}`}
                onClick={() => {
                  setActivePodcastIndex(idx);
                  setPodcastDetailView(false);
                }}
                className="w-60 h-40 object-cover rounded-xl cursor-pointer border-2 border-transparent hover:border-red-500 transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ================= Mini Player for Podcast ================= */}
      {podcastIsPlaying && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setPodcastIsPlaying(false)}
            className="absolute top-4 right-4 bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:bg-white/30 transition"
          >
            ×
          </button>
          <div className="flex flex-col items-center gap-4 w-full max-w-5xl">
            <h3 className="text-white text-xl font-semibold text-center">
              {activePodcast.title}
            </h3>
            <iframe
              src={`https://www.youtube.com/embed/${activePodcast.videoId}?autoplay=1`}
              title={activePodcast.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[60vh] rounded-lg shadow-[0_0_25px_rgba(255,0,0,0.5)]"
            ></iframe>
          </div>
        </div>
      )}

      {/* ================= Programs Offered Section ================= */}
      <div className="py-12 px-6">
        <h2 className="text-2xl text-center font-bold mb-6">Programs Offered</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, idx) => (
            <img
              key={idx}
              src={course.img}
              alt={`course-${idx}`}
              onClick={() => setProgramIsPlaying(true) || setProgramActiveIndex(idx)}
              className="w-full h-40 object-cover rounded-lg cursor-pointer transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
            />
          ))}
        </div>
      </div>

      {programIsPlaying && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setProgramIsPlaying(false)}
            className="absolute top-4 right-4 bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:bg-white/30 transition"
          >
            ×
          </button>
          <div className="flex flex-col items-center gap-4 w-full max-w-5xl">
            <h3 className="text-white text-xl font-semibold text-center">
              {activeProgram.title}
            </h3>
            <iframe
              src={`https://www.youtube.com/embed/${activeProgram.videoId}?autoplay=1`}
              title={activeProgram.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[60vh] rounded-lg shadow-[0_0_25px_rgba(255,0,0,0.5)]"
            ></iframe>
          </div>
        </div>
      )}

      {/* ================= Icons of MRU Section ================= */}
      <div className="py-12 px-6">
        <h2 className="text-2xl text-center font-bold mb-6">Icons of Manav Rachna</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {iconsWithVideos.map((icon, idx) => (
            <img
              key={idx}
              src={icon.img}
              alt={`icon-${idx}`}
              onClick={() => setIconIsPlaying(true) || setIconActiveIndex(idx)}
              className="w-full h-52 object-cover rounded-md cursor-pointer transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
            />
          ))}
        </div>
      </div>

      {iconIsPlaying && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIconIsPlaying(false)}
            className="absolute top-4 right-4 bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:bg-white/30 transition"
          >
            ×
          </button>
          <div className="flex flex-col items-center gap-4 w-full max-w-5xl">
            <h3 className="text-white text-xl font-semibold text-center">
              {activeIcon.title}
            </h3>
            <iframe
              src={`https://www.youtube.com/embed/${activeIcon.videoId}?autoplay=1`}
              title={activeIcon.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[60vh] rounded-lg shadow-[0_0_25px_rgba(255,0,0,0.5)]"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
