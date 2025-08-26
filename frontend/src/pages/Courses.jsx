import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

function Courses() {
  const courses = [
    { id: 1, title: "AI Meets C Programming", level: "Dr Chandni", image: "/ai-c.png" },
    { id: 2, title: "OOPs Using Java", level: "Dr. Mamta Arora", image: "/java.png" },
    { id: 3, title: "Generative AI", level: "Dr. Ganga", image: "/gen-ai.png" },
    { id: 4, title: "Responsible AI", level: "Dr. Manpreet Kaur", image: "/responsible-ai.png" },
    { id: 5, title: "Cyber Security for Everyone", level: "Dr. Pooja", image: "/cyber-security.png" },
    // ... baki courses add kar do with unique IDs
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const userEmail = localStorage.getItem("email"); // logged-in user

  // Load enrolled courses from backend
  useEffect(() => {
    if (!userEmail) return;
    axios.get(`http://localhost:5000/api/enrollments/${userEmail}`)
      .then(res => setEnrolledCourses(res.data))
      .catch(err => console.error(err));
  }, [userEmail]);

  // Search handling
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === "") setSuggestions([]);
    else setSuggestions(courses.filter(c => c.title.toLowerCase().startsWith(value.toLowerCase())));
  };

  const filteredCourses = courses.filter(
    course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Enroll API call
  const handleEnroll = (course) => {
    axios.post("http://localhost:5000/api/enrollments", {
      user_email: userEmail,
      course_id: course.id
    })
    .then(res => {
      setEnrolledCourses(prev => [...prev, course]);
    })
    .catch(err => {
      if (err.response?.status === 409) alert("Already enrolled");
      else console.error(err);
    });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay } }),
  };

  return (
    <motion.div className="min-h-screen bg-gray-50 pt-28 px-6" initial="hidden" animate="visible">
      {/* Header */}
      <motion.div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto mb-8 gap-4"
        variants={fadeUp} custom={0}>
        <h1 className="text-5xl font-bold w-full mt-4 mb-6">Our Courses</h1>
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border rounded-lg shadow-md mt-1 z-10 max-h-48 overflow-y-auto">
              {suggestions.map((course, idx) => (
                <li key={idx} className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => { setSearchTerm(course.title); setSuggestions([]); }}>
                  {course.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>

      {/* Courses Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filteredCourses.length > 0 ? filteredCourses.map((course, idx) => (
          <motion.div key={idx} className="bg-white rounded-xl shadow-md border p-4 flex flex-col items-center hover:shadow-lg transition duration-300"
            variants={fadeUp} custom={0.3 + idx * 0.05} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <img src={import.meta.env.BASE_URL + course.image} alt={course.title}
              className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-lg font-medium text-center mb-2">{course.title}</h2>
            <p className="text-sm text-gray-500 mb-4">{course.level}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`px-6 py-2 rounded-full transition ${
                enrolledCourses.find(c => c.id === course.id)
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-teal-600 text-white hover:bg-teal-700"
              }`}
              onClick={() => handleEnroll(course)}
              disabled={enrolledCourses.find(c => c.id === course.id)}
            >
              {enrolledCourses.find(c => c.id === course.id) ? "Enrolled" : "Enroll"}
            </motion.button>
          </motion.div>
        )) : (
          <motion.p className="text-center text-gray-500 col-span-full" variants={fadeUp} custom={0.2}>No courses found.</motion.p>
        )}
      </div>

      {/* My Enrolled Courses */}
      {enrolledCourses.length > 0 && (
        <div className="max-w-6xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md border p-4 flex flex-col items-center">
                <img src={import.meta.env.BASE_URL + course.image} alt={course.title}
                  className="w-full h-48 object-cover rounded-md mb-4" />
                <h2 className="text-lg font-medium text-center mb-2">{course.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{course.level}</p>
                <button className="bg-gray-400 text-white px-6 py-2 rounded-full cursor-not-allowed">Enrolled</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Courses;
