import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import styled from "styled-components";

const CourseGrid = styled.div`
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  justify-content: center;
`;

const CourseCard = styled(motion.div)`
  position: relative;
  width: 380px;
  height: 220px;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  background-color: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease-in-out;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #ff0000;
    box-shadow: 0px 15px 40px rgba(255, 0, 0, 0.5);
  }
`;

const CourseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Fills the card fully without leaving margins */
  object-position: center;
  transition: transform 0.3s ease;

  ${CourseCard}:hover & {
    transform: scale(1.02);
  }
`;

const CourseOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  color: white;
  transform: translateY(0);
  transition: all 0.3s ease;
`;

const CourseTitle = styled.h3`
  font-size: 20px;
  margin: 0;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const CourseFaculty = styled.p`
  font-size: 14px;
  color: #ccc;
  margin-top: 4px;
`;

function Courses() {
  const departments = [
    "All Departments",
    "School of Engineering",
    "School of Sciences",
    "School of Law",
    "School of Management & Commerce",
    "School of Education & Humanities",
  ];

  const deptMap = {
    "All Departments": null,
    "School of Engineering": "Engineering",
    "School of Sciences": "Sciences",
    "School of Law": "Law",
    "School of Management & Commerce": "Management & Commerce",
    "School of Education & Humanities": "Education & Humanities",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const departmentFromURL = searchParams.get("department");

  useEffect(() => {
    if (departmentFromURL) setSelectedDept(departmentFromURL);
  }, [departmentFromURL]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/videos/courses"
        );
        setCourses(res.data.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

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

  const filteredCourses = courses.filter((course) => {
    const matchesDept =
      !deptMap[selectedDept] || course.department === deptMap[selectedDept];
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.facultyName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <motion.div className="min-h-screen bg-black p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-center items-center max-w-6xl mx-auto mb-8 gap-4">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-white" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-red-500 text-white rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Layout */}
      <div className="flex min-h-[calc(100vh-5rem)] bg-black">
        {/* Sidebar */}
        <div className="hidden lg:flex flex-col bg-gray-900 border-r shadow-md p-6 w-72 fixed top-20 left-0 bottom-0 z-20">
          <h2 className="text-xl font-semibold text-white mb-4">Departments</h2>
          <ul className="space-y-2">
            {departments.map((dept, idx) => (
              <li
                key={idx}
                onClick={() => setSelectedDept(dept)}
                className={`cursor-pointer px-3 py-2 text-white rounded-md transition ${
                  selectedDept === dept
                    ? "bg-red-600 text-white"
                    : "hover:bg-red-500 hover:text-black"
                }`}
              >
                {dept}
              </li>
            ))}
          </ul>
        </div>

        {/* Courses Grid */}
        <div className="flex-1 lg:ml-64 px-6 py-6">
          <CourseGrid>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, idx) => (
                <CourseCard
                  key={course._id}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0px 15px 40px rgba(255,0,0,0.5)",
                  }}
                  onClick={() => handleCourseClick(course._id)}
                >
                  <CourseImage
                    src={course.thumbnailUrl || "/default-course.jpg"}
                    alt={course.title}
                  />
                  <CourseOverlay>
                    <CourseTitle>{course.title}</CourseTitle>
                    <CourseFaculty>{course.facultyName}</CourseFaculty>
                    {course.rating && (
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-white text-sm">
                          {course.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </CourseOverlay>
                </CourseCard>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No courses found.
              </p>
            )}
          </CourseGrid>
        </div>
      </div>
    </motion.div>
  );
}

export default Courses;
