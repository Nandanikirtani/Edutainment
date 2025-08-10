import React, { useState, useEffect } from "react";
import {
  BookOpen, Users, Target, Award, Lightbulb, Heart, Zap, Star,
  TrendingUp, Globe
} from "lucide-react";

const About = () => {
  const [counters, setCounters] = useState({ students: 0, teachers: 0, courses: 0, success: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const targets = { students: 10000, teachers: 500, courses: 1000, success: 98 };
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
    { icon: BookOpen, title: "Interactive Courses", description: "Engaging multimedia content that makes learning fun and effective", color: "bg-blue-50 text-blue-600" },
    { icon: Users, title: "Live Classes", description: "Real-time interaction between students and teachers worldwide", color: "bg-green-50 text-green-600" },
    { icon: Target, title: "Personalized Learning", description: "Customized education paths for every individual learner", color: "bg-purple-50 text-purple-600" },
    { icon: Award, title: "Skill Building", description: "Practical skills development for real-world success", color: "bg-orange-50 text-orange-600" },
    { icon: Lightbulb, title: "Innovation", description: "Cutting-edge technology enhancing the learning experience", color: "bg-yellow-50 text-yellow-600" },
    { icon: Heart, title: "Community", description: "Building connections that foster collaborative learning", color: "bg-red-50 text-red-600" }
  ];

  const values = [
    { icon: Zap, title: "Accessibility", description: "Education should be available to everyone, everywhere", gradient: "from-blue-500 to-purple-600" },
    { icon: Star, title: "Engagement", description: "Learning becomes powerful when it's enjoyable and interactive", gradient: "from-green-500 to-blue-600" },
    { icon: TrendingUp, title: "Excellence", description: "We strive for the highest quality in everything we do", gradient: "from-purple-500 to-pink-600" },
    { icon: Globe, title: "Innovation", description: "Continuously evolving to meet tomorrow's educational needs", gradient: "from-orange-500 to-red-600" }
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "High School Teacher", content: "Edutainment has revolutionized how I teach. My students are more engaged than ever!", rating: 5 },
    { name: "Michael Chen", role: "College Student", content: "The interactive courses made complex topics so much easier to understand.", rating: 5 },
    { name: "Dr. Emily Rodriguez", role: "Education Director", content: "This platform bridges the gap between traditional and modern education perfectly.", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 text-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <h1 className="text-6xl font-bold mb-6">About <span className="text-yellow-300">Edutainment</span></h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">Transforming education through innovation, collaboration, and personalized learning experiences.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold">Join Our Community</button>
          <button className="px-6 py-3 border border-white rounded-lg font-semibold">Watch Our Story</button>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          <Stat value={`${counters.students.toLocaleString()}+`} label="Active Students" color="text-blue-600" />
          <Stat value={`${counters.teachers}+`} label="Expert Teachers" color="text-purple-600" />
          <Stat value={`${counters.courses}+`} label="Courses Available" color="text-pink-600" />
          <Stat value={`${counters.success}%`} label="Success Rate" color="text-green-500" />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">Our Mission</h2>
        <p className="text-xl max-w-4xl mx-auto mb-16 text-gray-600">
          Edutainment connects students and teachers through interactive courses, live classes, and engaging resources.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-5xl font-bold mb-6">Our Values</h2>
        <p className="text-xl max-w-3xl mx-auto mb-16 text-gray-600">These core principles guide everything we do at Edutainment</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {values.map((v, i) => <ValueCard key={i} {...v} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">What People Say</h2>
        <p className="text-xl max-w-3xl mx-auto mb-16 text-gray-600">Hear from our community of learners and educators</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {testimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-center text-white">
        <h2 className="text-5xl font-bold mb-6">Ready to Transform Education?</h2>
        <p className="text-xl mb-8">Join thousands of students and teachers already learning with us</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold">Start Learning Today</button>
          <button className="px-6 py-3 border border-white rounded-lg font-semibold">Become a Teacher</button>
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

const TestimonialCard = ({ name, role, content, rating }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
    <div className="flex mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-500 mb-4 italic">"{content}"</p>
    <p className="font-semibold">{name}</p>
    <p className="text-sm text-gray-400">{role}</p>
  </div>
);

export default About;
