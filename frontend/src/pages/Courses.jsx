import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

function Courses() {
  const courses = [
    { title: "AI Meets C Programming", level: "Dr Chandni", image: "/ai-c.png" },
    { title: "OOPs Using Java", level: "Dr. Mamta Arora", image: "/java.png" },
    { title: "Generative AI", level: "Dr. Ganga", image: "/gen-ai.png" },
    { title: "Responsible AI", level: "Dr. Manpreet Kaur", image: "/responsible-ai.png" },
    { title: "Cyber Security for Everyone", level: "Dr. Pooja", image: "/cyber-security.png" },
    { title: "Understanding the Self", level: "Dr. Savita Sharma", image: "/self.png" },
    { title: "Drafting, Pleading & Conveyancing", level: "Dr. Superna Venaik", image: "/drafting.png" },
    { title: "AI in Legal Practice", level: "Dr. Superna Venaik", image: "/ai-legal.png" },
    { title: "Data Analysis", level: "Dr. Tarundeep Kaur", image: "/data-analysis.png" },
    { title: "Sociology-1", level: "Dr. Tarundeep Kaur", image: "/sociology.png" },
    { title: "FOEE", level: "Dr. Neha Chaudhary", image: "/foee.png" },
    { title: "Material Science", level: "Dr. Jimmy Mehta", image: "/material-science.png" },
    { title: "BOEE", level: "Dr. K. Deepa", image: "/boee.png" },
    { title: "Analog Electronics", level: "Dr. Shruti Vashist", image: "/analog.png" },
    { title: "Wireless Sensor Network", level: "Dr. Mohit Kumar Singh", image: "/wsn.png" },
    { title: "Control System", level: "Dr. Richa Adlakha", image: "/control-system.png" },
    { title: "Entrepreneurship and Startups", level: "Dr. Gurpreet", image: "/entrepreneurship.png" },
    { title: "Real Estate Governance in India", level: "Dr. Ruchi", image: "/real-estate.png" },
    { title: "Innovation, Creativity & Entrepreneurship", level: "Dr. Pragati", image: "/innovation.png" }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      setSuggestions(
        courses.filter((c) =>
          c.title.toLowerCase().startsWith(value.toLowerCase())
        )
      );
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variant
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay }
    }),
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pt-28 px-6"
      initial="hidden"
      animate="visible"
    >
      {/* Header with Title + Search */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto mb-8 gap-4"
        variants={fadeUp}
        custom={0}
      >
        <h1 className="text-3xl font-bold">Our Courses</h1>

        {/* Search Bar with Suggestions */}
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border rounded-lg shadow-md mt-1 z-10 max-h-48 overflow-y-auto">
              {suggestions.map((course, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(course.title);
                    setSuggestions([]);
                  }}
                >
                  {course.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>

      <motion.p
        className="text-center text-gray-600 mb-10"
        variants={fadeUp}
        custom={0.2}
      >
        Unlock the thrill of learning—go big, dive deep, and never lose the spark!
      </motion.p>

      {/* Course Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow-md border p-4 flex flex-col items-center hover:shadow-lg transition duration-300"
              variants={fadeUp}
              custom={0.3 + idx * 0.05}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-medium text-center mb-2">{course.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{course.level}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition"
              >
                Explore now
              </motion.button>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-center text-gray-500 col-span-full"
            variants={fadeUp}
            custom={0.2}
          >
            No courses found.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default Courses;
