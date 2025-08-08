import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section with Background Video */}
      <section className="relative h-[90vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/public/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center bg-black/40 backdrop-blur-sm">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold mb-4"
          >
            Welcome to <span className="text-blue-400">Edu</span>
            <span className="text-orange-400">Navigator</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="max-w-xl text-lg mb-6"
          >
            Empowering students and teachers with interactive learning experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="space-x-4"
          >
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Get Started
            </button>
            <button className="border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-blue-600">
              Explore Courses
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-gray-100 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">About EduNavigator</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            EduNavigator is a powerful e-learning platform designed to bridge the gap between educators and learners. With personalized dashboards, real-time feedback, and community collaboration, learning has never been this effective and engaging.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <p className="text-5xl font-bold text-blue-600">50K+</p>
              <p className="text-gray-600">Active Students</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-orange-500">1K+</p>
              <p className="text-gray-600">Expert Instructors</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-green-500">95%</p>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;
