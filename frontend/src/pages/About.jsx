import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Award, FileText, MessageCircle, ClipboardList, Laptop, Lightbulb, Users,
   Heart
} from "lucide-react";

const About = () => {
  const [counters, setCounters] = useState({ students: 0, teachers: 0, Badges: 0, Quizes: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: " What is Edutainment?", answer: "Edutainment combines education and entertainment to make learning more engaging and fun. It uses interactive videos, games, quizzes, and storytelling to help learners understand concepts better while enjoying the process." },
    { question: " Who can benefit from Edutainment learning?", answer: "Students of all ages, professionals, and even lifelong learners can benefit from edutainment. It’s especially helpful for children, as it keeps them focused while learning through play." },
    { question: " How is Edutainment different from traditional e-Learning?", answer: "Traditional e-Learning often focuses on lessons and tests, while edutainment uses interactive games, simulations, and stories to make the same content more enjoyable and memorable." },
    { question: " Do I need any special devices or apps to use Edutainment content?", answer: "Usually, a computer, tablet, or smartphone with internet access is enough. Some platforms also offer mobile apps for offline learning." },
    { question: " Will Edutainment help me improve my academic performance?", answer: "Yes. Studies show that learners retain more information when they’re engaged and having fun, which can lead to better understanding, improved memory, and higher grades." },
    { question: " How does gamification help in learning?", answer: "Gamification adds elements like points, badges, and leaderboards to learning activities. This motivates learners to progress, compete healthily, and enjoy the learning journey." },
    { question: " Is Edutainment effective for skill-based learning too?", answer: "Yes. Beyond academics, edutainment can teach coding, public speaking, problem-solving, teamwork, and other life skills through simulations and interactive activities." },
    { question: " How does gamification help in learning?", answer: "Gamification adds elements like points, badges, and leaderboards to learning activities. This motivates learners to progress, compete healthily, and enjoy the learning journey." },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const targets = { students: 1000, teachers: 50, Badges: 10, Quizes: 98 };
      const duration = 2000;
      const increment = 50;

      Object.keys(targets).forEach(key => {
        let current = 0;
        const target = targets[key];
        const step = target / (duration / increment);

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, increment);
      });
    }
  }, [isVisible]);

  const features = [
    { icon: BookOpen, title: "Book Library ", description: "Read and download books from our digital collection.", color: "bg-blue-50 text-blue-600" },
    { icon: Laptop, title: "Online Courses ", description: "Learn anytime with easy access to quality classes.", color: "bg-green-50 text-green-600" },
    { icon: FileText, title: "Resume Builder", description: "Create professional resumes with ready-to-use templates online.", color: "bg-purple-50 text-purple-600" },
    { icon: Award, title: "Badges & Awards", description: "Earn rewards for completing tasks and achieving goals.", color: "bg-orange-50 text-orange-600" },
    { icon: MessageCircle, title: "Doubt Bot ", description: "Ask questions and get instant answers anytime, anywhere.", color: "bg-yellow-50 text-yellow-600" },
    { icon: ClipboardList, title: "Exam Prep", description: "Practice with quizzes, mock tests, and previous papers.", color: "bg-red-50 text-red-600" }
  ];

  const values = [
    { icon: BookOpen, title: "Learn with Joy ", description: "Making education fun, engaging, and full of curiosity.", gradient: "bg-[var(--color-teal-700)]" },
    { icon: Users, title: "Access for All ", description: "Bringing equal learning opportunities to every student.", gradient: "bg-[var(--color-teal-700)]" },
    { icon: Lightbulb, title: "Innovate & Inspire", description: "Using creativity to transform the way we learn.", gradient: "bg-[var(--color-teal-700)]" },
    { icon: Heart, title: "Grow Together ", description: "Achieving success through teamwork and shared learning.", gradient: "bg-[var(--color-teal-700)]" }
  ];

  return (
  <div className="min-h-screen bg-gray-50 overflow-hidden">

  {/* Hero Section */}
  <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center bg-[#0C7489] text-white">
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
      About <span className="text-yellow-300">Edutainment</span>
    </h1>
    <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-6 sm:mb-8">
      "Blending education with entertainment to make learning engaging, interactive, and truly unforgettable for everyone."
    </p>
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
      <button className="px-5 py-2 sm:px-6 sm:py-3 bg-white text-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform duration-200">
        Join Our Community
      </button>
      <button className="px-5 py-2 sm:px-6 sm:py-3 border border-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200">
        Watch Our Story
      </button>
    </div>
  </section>


      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          <Stat value={`${counters.students.toLocaleString()}+`} label="Active Learners" color="text-blue-600" />
          <Stat value={`${counters.teachers}+`} label="Guiding Experts" color="text-purple-600" />
          <Stat value={`${counters.Badges}+`} label="Badges Given" color="text-pink-600" />
          <Stat value={`${counters.Quizes}+`} label="Smart Quizzes" color="text-green-500" />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">Our Mission</h2>
        <p className="text-xl max-w-4xl mx-auto mb-16 text-gray-600">
          "Empowering every learner and teacher with technology-driven tools for seamless, impactful, and accessible education."
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-5xl font-bold mb-6">Our Values</h2>
        <p className="text-xl max-w-3xl mx-auto mb-16 text-gray-600">"We believe in innovation, integrity, and inclusivity as the foundation for lifelong learning success."</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {values.map((v, i) => <ValueCard key={i} {...v} />)}
        </div>
      </section>

      {/* FAQS replacing Testimonials */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold mb-6">Frequently Asked Questions</h2>
        <p className="text-xl max-w-3xl mx-auto mb-16 text-gray-600">"Get answers to common questions about our platform and services."</p>
        <div className="max-w-4xl mx-auto space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                className="w-full flex justify-between items-center py-3 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-black hover:text-blue-600 hover:underline transition-colors duration-200">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
  {openIndex === index && (
    <motion.div
      id={`faq-answer-${index}`}
      role="region"
      aria-labelledby={`faq-question-${index}`}
      className="text-gray-700"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="pb-4">{faq.answer}</div>
    </motion.div>
  )}
</AnimatePresence>

            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {/* Call to Action Section */}
  <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0C7489] text-center text-white">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
      Ready to Transform Education?
    </h2>
    <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
      "Join us in shaping the future of digital learning—where ideas grow and minds excel every day."
    </p>
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
      <button className="px-5 py-2 sm:px-6 sm:py-3 bg-white text-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform duration-200">
        Start Learning Today
      </button>
      <button className="px-5 py-2 sm:px-6 sm:py-3 border border-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200">
        Become a Teacher
      </button>
    </div>
  </section>

</div>
  );
};

const Stat = ({ value, label, color }) => (
  <div className="text-center">
    <div className={`text-5xl font-bold mb-2 ${color}`}>{value}</div>
    <div className="text-gray-500 font-medium">{label}</div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all text-center">
    <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

const ValueCard = ({ icon: Icon, title, description, gradient }) => (
  <div className="text-center">
    <div className={`w-24 h-24 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center mx-auto mb-6`}>
      <Icon className="w-12 h-12 text-white" />
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

export default About;
