import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const Home = () => {
  const baseURL = import.meta.env.BASE_URL;

  return (
    <div className="bg-white pt-16 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12">
        {/* Text Content */}
        <motion.div
          className="md:w-1/2 space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
          }}
        >
          <h2 className="text-4xl font-bold leading-snug">
            Unlock Your <span className="text-teal-600">Potential</span>
            <br />
            Learn{" "}
            <span className="text-teal-600">
              Anything, Anytime, Anywhere.
            </span>
          </h2>
          <p className="text-black-700 text-lg">
            Join thousands of learners building their future with top-quality
            content and hands-on experience.
          </p>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700"
            >
              Get Started
            </motion.button>
            <Link to="/courses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="border border-gray-400 px-6 py-3 rounded-full hover:bg-gray-100"
              >
                Browse Courses
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="md:w-1/2 mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={`${baseURL}hero-illustration.png`}
            alt="Learning Illustration"
            className="w-full h-auto"
          />
        </motion.div>
      </section>

      {/* Top Picks */}
      <section className="px-8 md:px-16 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.h3
            className="text-2xl font-bold text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Top Picks Just for You
          </motion.h3>

          <motion.div
            whileHover={{ scale: 1.05 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            variants={fadeUp}
            className="mt-4 md:mt-0"
          >
            <Link
              to="/courses"
              className="border border-gray-400 px-6 py-2 rounded-full hover:bg-gray-100 transition"
            >
              View All Courses
            </Link>
          </motion.div>
        </div>

        <motion.p
          className="text-black-600 mt-2 text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
          variants={fadeUp}
        >
          Unlock the thrill of learning—go big, dive deep, and never lose the spark!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            { title: "AI Meets C Programming", level: "Dr Chandni", image: "ai-c.png" },
            { title: "OOPs Using Java", level: "Dr. Mamta Arora", image: "java.png" },
            { title: "Generative AI", level: "Dr. Ganga", image: "gen-ai.png" }
          ].map((card, index) => (
            <motion.div
              key={index}
              className="border rounded-lg shadow-sm hover:shadow-lg transition flex flex-col items-center p-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index * 0.2}
              variants={fadeUp}
            >
              <img
                src={`${baseURL}${card.image}`}
                alt={card.title}
                className="rounded-t-lg mb-4 w-full h-40 object-cover"
              />
              <p className="font-semibold text-lg text-center">{card.title}</p>
              <span className="text-sm text-gray-500 text-center">{card.level}</span>
              <div className="mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700"
                >
                  Explore now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Robot & Spotlight Sections */}
      <section className="px-8 md:px-16 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <img
            src={`${baseURL}robot-student.png`}
            alt="AI Learning Assistant"
            className="rounded-lg w-full h-80 object-cover"
          />
        </motion.div>
        <div className="flex flex-col gap-4">
          {["Doubt Sessions", "Mentorship", "Placement Assistance"].map((btn, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg text-lg ${
                i === 0
                  ? "bg-teal-700 text-white hover:bg-teal-800"
                  : "border border-teal-700 text-teal-700 hover:bg-teal-50"
              }`}
            >
              {btn}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Student Spotlight */}
      <section className="px-8 md:px-16 py-12 bg-white">
        <h3 className="text-xl font-bold flex items-center gap-2 text-teal-700 mb-8">
          📖 Student Spotlight
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "MAYANK GOEL", img: "mayank.jpg", review: "This app makes studying feel effortless! The interactive content keeps me engaged, and I actually understand topics deeply." },
            { name: "ALOK GUPTA", img: "alok.jpg", review: "Learning with this app is fun, effective, and never boring. My grades have improved, and I feel more confident in my knowledge!" },
            { name: "MANPREET SINGH", img: "manpreet.jpg", review: "The explanations are clear, the quizzes are fun, and I finally feel confident before exams." },
            { name: "SAMMARTH KHURANA", img: "sammarth.jpg", review: "This app has made studying so much easier! The interactive content keeps me motivated every day." },
            { name: "SIMRAN SHARMA", img: "simran.jpg", review: "I used to struggle with staying focused, but now I actually enjoy learning. It's like having a personal tutor with me." },
            { name: "HITESH VERMA", img: "hitesh.jpg", review: "Finally, an app that makes complex subjects simple! The explanations are clear, and the learning feels effortless." }
          ].map((student, idx) => (
            <div key={idx} className="border border-yellow-300 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <img src={`${baseURL}${student.img}`} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-bold">{student.name}</p>
                  <p className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐ 5.0</p>
                </div>
              </div>
              <p className="text-gray-700">{student.review}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
