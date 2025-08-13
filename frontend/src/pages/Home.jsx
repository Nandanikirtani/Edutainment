import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const Home = () => {
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="border border-gray-400 px-6 py-3 rounded-full hover:bg-gray-100"
            >
              Browse Courses
            </motion.button>
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
            src="/public/hero-illustration.png"
            alt="Learning Illustration"
            className="w-full h-auto"
          />
        </motion.div>
      </section>
      

      {/* Top Picks Section */}
      <section className="px-8 md:px-16 py-12 text-center">
        <motion.h3
          className="text-2xl font-bold"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Top Picks Just for You
        </motion.h3>
        <motion.p
          className="text-black-600 mt-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
          variants={fadeUp}
        >
          Unlock the thrill of learning—go big, dive deep, and never lose the spark!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[ // Card data
            { img: "cpp.png", title: "C++ programming online course [complete beginning to advance]" },
            { img: "java.png", title: "Java Programming Online Course [Complete Beginner to Advanced]" },
            { img: "html.png", title: "HTML online course [Complete Beginner to Advanced]" }
          ].map((card, index) => (
            <motion.div
              key={index}
              className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index * 0.2}
              variants={fadeUp}
            >
              <img
                src={`/public/${card.img}`}
                alt={card.title}
                className="rounded-lg mb-4 w-full h-40 object-cover"
              />
              <p className="mb-2">{card.title}</p>
              <span className="text-sm text-gray-500">Beginner to Advance</span>
              <div className="mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700"
                >
                  Explore now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-6"
          whileHover={{ scale: 1.05 }}
        >
          <button className="border border-gray-400 px-6 py-3 rounded-full hover:bg-gray-100">
            Explore All Programs
          </button>
        </motion.div>
      </section>
      {/* What Makes Us Different */}
      <section className="px-8 md:px-16 py-12">
        <h3 className="text-2xl font-bold mb-8">What Makes Us Different?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-teal-700 text-white p-6 rounded-lg">
            <h4 className="font-bold">Expert-Led, Industry Relevant Content</h4>
            <p className="mt-2 text-sm">
              Get taught by professionals with real-world experience, ensuring
              you learn what actually matters in today's job market.
            </p>
          </div>
          <div className="border p-6 rounded-lg">
            <h4 className="font-bold">Learn at Your Own Pace</h4>
            <p className="mt-2 text-sm">
              Flexible, self-paced courses designed to fit your schedule – no
              deadlines, just progress at your comfort.
            </p>
          </div>
          <div className="border p-6 rounded-lg">
            <h4 className="font-bold">Interactive & Practical Learning</h4>
            <p className="mt-2 text-sm">
              Engage with hands-on projects, quizzes, and real-world case
              studies that make learning stick – not just watch and forget.
            </p>
          </div>
        </div>
      </section>

      {/* Robot & Feature Buttons Section */}
      <section className="px-8 md:px-16 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <img
            src="/public/robot-student.png"
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
   {/* Student Spotlight Section */}
<section className="px-8 md:px-16 py-12 bg-white">
  <h3 className="text-xl font-bold flex items-center gap-2 text-teal-700 mb-8">
    📖 Student Spotlight
  </h3>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Card 1 */}
    <div className="border border-yellow-300 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <img src="/public/mayank.jpg" alt="Mayank Goel" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-bold">MAYANK GOEL</p>
          <p className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐ 5.0</p>
        </div>
      </div>
      <p className="text-gray-700">
        This app makes studying feel effortless! The interactive content keeps me engaged, and I actually understand topics deeply.
      </p>
    </div>

    {/* Card 2 */}
    <div className="border border-yellow-300 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <img src="/public/alok.jpg" alt="Alok Gupta" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-bold">ALOK GUPTA</p>
          <p className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐ 5.0</p>
        </div>
      </div>
      <p className="text-gray-700">
        Learning with this app is fun, effective, and never boring. My grades have improved, and I feel more confident in my knowledge!
      </p>
    </div>

    {/* Card 3 */}
    <div className="border border-yellow-300 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <img src="/public/manpreet.jpg" alt="Manpreet Singh" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-bold">MANPREET SINGH</p>
          <p className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐ 5.0</p>
        </div>
      </div>
      <p className="text-gray-700">
        The explanations are clear, the quizzes are fun, and I finally feel confident before exams.
      </p>
    </div>

    {/* Card 4 */}
    <div className="border border-yellow-300 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <img src="/public/sammarth.jpg" alt="Sammarth Khurana" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-bold">SAMMARTH KHURANA</p>
          <p className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐ 5.0</p>
        </div>
      </div>
      <p className="text-gray-700">
        This app has made studying so much easier! The interactive content keeps me motivated every day.
      </p>
    </div>

    {/* Card 5 */}
    <div className="border border-yellow-300 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <img src="/public/simran.jpg" alt="Simran Sharma" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-bold">SIMRAN SHARMA</p>
          <p className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐ 5.0</p>
        </div>
      </div>
      <p className="text-gray-700">
        I used to struggle with staying focused, but now I actually enjoy learning. It's like having a personal tutor with me.
      </p>
    </div>

    {/* Card 6 */}
    <div className="border border-yellow-300 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <img src="/public/hitesh.jpg" alt="Hitesh Verma" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-bold">HITESH VERMA</p>
          <p className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐ 5.0</p>
        </div>
      </div>
      <p className="text-gray-700">
        Finally, an app that makes complex subjects simple! The explanations are clear, and the learning feels effortless.
      </p>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
