import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import styled from "styled-components";

// Styled components
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
    border-color: #4DB3A7;
    box-shadow: 0px 15px 40px rgba(77, 179, 167, 0.5);
  }
`;

const CourseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  transition: all 0.3s ease;
`;

const CourseTitle = styled.h3`
  font-size: 20px;
  margin: 0;
  font-weight: 600;
`;

const CourseFaculty = styled.p`
  font-size: 14px;
  color: #ccc;
  margin-top: 4px;
`;

function Courses() {
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar Data
  const departments = [
    "All Departments",
    "School of Engineering",
    "School of Sciences",
    "School of Law",
    "School of Management & Commerce",
    "School of Education & Humanities",
  ];

  const deptMap = {
    "School of Engineering": "Engineering",
    "School of Sciences": "Science",
    "School of Law": "Law",
    "School of Management & Commerce": "Management & Commerce",
    "School of Education & Humanities": "Education & Humanities",
    "All Departments": null
  };

  const studyLevels = ["UG", "PG", "PhD"];

  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);

  const searchParams = new URLSearchParams(location.search);
  const departmentFromURL = searchParams.get("department");

  // Pick Department from URL
  useEffect(() => {
    if (departmentFromURL) {
      const matchingDept = Object.keys(deptMap).find(
        key => deptMap[key] === departmentFromURL
      );
      if (matchingDept) {
        setSelectedDept(matchingDept);
      }
    }
  }, [departmentFromURL]);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1'}/videos/courses`
        );
        setCourses(res.data.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  // Filter logic
  const filteredCourses = courses.filter((course) => {
    const matchesDept =
      !departmentFromURL || course.department === departmentFromURL;

    const matchesLevel =
      !selectedLevel || course.level === selectedLevel;

    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.facultyName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDept && matchesLevel && matchesSearch;
  });

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <motion.div className="min-h-screen bg-black p-6">
      {/* Search Bar */}
      <div className="flex justify-center items-center max-w-4xl mx-auto mb-8">
        <div className="relative w-full sm:w-96">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-white" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#4DB3A7] text-white rounded-full bg-transparent focus:ring-2 focus:ring-[#4DB3A7]"
          />
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-6rem)]">
        {/* Sidebar */}
        <div className="hidden lg:flex flex-col bg-gray-900 border-r p-6 w-72 fixed top-20 left-0 bottom-0">
          <h2 className="text-xl font-semibold text-white mb-4">
            {departmentFromURL ? `${selectedDept} ` : "Departments"}
          </h2>

          <ul className="space-y-2">
            {departmentFromURL
              ? studyLevels.map((level, idx) => (
                  <li
                    key={idx}
                    onClick={() => setSelectedLevel(level)}
                    className={`cursor-pointer px-3 py-2 text-white rounded-md transition ${
                      selectedLevel === level
                        ? "bg-[#4DB3A7]"
                        : "hover:bg-[#4DB3A7] hover:text-black"
                    }`}
                  >
                    {level}
                  </li>
                ))
              : departments.map((dept, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelectedDept(dept);
                      setSelectedLevel(null);
                      navigate(`/courses`);
                    }}
                    className={`cursor-pointer px-3 py-2 text-white rounded-md transition ${
                      selectedDept === dept
                        ? "bg-[#4DB3A7]"
                        : "hover:bg-[#4DB3A7] hover:text-black"
                    }`}
                  >
                    {dept}
                  </li>
                ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-72 px-6 py-6">
          <h1 className="text-2xl font-bold text-center text-white mb-6">
            {departmentFromURL
              ? `${departmentFromURL} Courses`
              : "All Courses"}
          </h1>

          <CourseGrid>
            {filteredCourses.length ? (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => handleCourseClick(course._id)}
                >
                  <CourseImage
                    src={course.thumbnailUrl || "/default-course.jpg"}
                    alt={course.title}
                  />
                  <CourseOverlay>
                    <CourseTitle>{course.title}</CourseTitle>
                    <CourseFaculty>{course.facultyName}</CourseFaculty>
                  </CourseOverlay>
                </CourseCard>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
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
