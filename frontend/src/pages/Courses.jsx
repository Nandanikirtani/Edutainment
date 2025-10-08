import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function Courses() {
  const departments = [
    "All Departments",
    "School of Engineering",
    "School of Sciences",
    "School of Law",
    "School of Management & Commerce",
    "School of Education & Humanities",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [courses, setCourses] = useState([]); // fetched from backend

  const navigate = useNavigate();
  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/videos/courses"
        );
        console.log("Fetched courses:", res.data.data);
        setCourses(res.data.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  // Search handling
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === "") setSuggestions([]);
    else
      setSuggestions(
        courses.filter((c) =>
          c.title.toLowerCase().startsWith(value.toLowerCase())
        )
      );
  };

  // Filtering logic
  // Map sidebar labels to actual course.department values
  const deptMap = {
    "All Departments": null,
    "School of Engineering": "Engineering",
    "School of Sciences": "Sciences",
    "School of Law": "Law",
    "School of Management & Commerce": "Management & Commerce",
    "School of Education & Humanities": "Education & Humanities",
  };

  const filteredCourses = courses.filter((course) => {
    const matchesDept =
      !deptMap[selectedDept] || course.department === deptMap[selectedDept];

    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.facultyName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDept && matchesSearch;
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay },
    }),
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto mb-8 gap-4"
        variants={fadeUp}
        custom={0}
      >
        <h1 className="text-5xl text-center font-bold w-full mt-4 mb-6">
          Courses
        </h1>
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

      {/* Layout */}
      <div className="flex min-h-[calc(100vh-5rem)] bg-gray-50">
        {/* Sidebar */}
        <motion.div
          className="hidden lg:flex flex-col bg-gray-300 border-r shadow-md p-6 w-64 fixed top-20 left-0 bottom-0 z-20"
          variants={fadeUp}
          custom={0.2}
        >
          <h2 className="text-xl font-semibold mb-4">Departments</h2>
          <ul className="space-y-2">
            {departments.map((dept, idx) => (
              <li
                key={idx}
                onClick={() => setSelectedDept(dept)}
                className={`cursor-pointer px-3 py-2 rounded-md transition ${
                  selectedDept === dept
                    ? "bg-teal-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {dept}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Courses grid */}
        <div className="flex-1 lg:ml-64 px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, idx) => (
                <motion.div
                  key={idx}
                  className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                  variants={fadeUp}
                  custom={0.3 + idx * 0.05}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  onClick={() => handleCourseClick(course._id || course.id)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Thumbnail */}
                  <img
                    src={course.thumbnailUrl || "/default-course.jpg"}
                    alt={course.title}
                    className="w-full h-64 object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-end p-4">
                    <h2 className="text-white text-lg font-semibold">
                      {course.title}
                    </h2>
                    <p className="text-gray-200 text-sm">
                      {course.facultyName}
                    </p>
                    {course.rating && (
                      <div className="flex items-center mt-1">
                        {/* Star symbol */}
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-white text-sm">
                          {course.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
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
        </div>
      </div>
    </motion.div>
  );
}

export default Courses;
