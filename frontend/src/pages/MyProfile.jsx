import React, { useState } from "react";

function MyProfile() {
  const [editMode, setEditMode] = useState(false); // Header Edit Profile toggle
  const [openSections, setOpenSections] = useState({ basicInfo: true });
  const [headerDropdownOpen, setHeaderDropdownOpen] = useState(false);

  // Separate edit modes for specific sections
  const [sectionEditModes, setSectionEditModes] = useState({
    skills: false,
    internships: false,
    feedback: false,
  });

  const [student, setStudent] = useState({
    profilePicture: "",
    name: "Khushi Rajpal",
    email: "khushi@example.com",
    phone: "9876543210",
    dob: "2004-06-07",
    gender: "Female",
    address: "Gurgaon, Haryana, India",
    enrollment: "BT23CSE123",
    program: "B.Tech CSE (Cloud & Full Stack)",
    semester: "7th",
    batch: "2023-2026",
    gpa: "8.5",
    coursesBySemester: {
      "1st Semester": ["C Programming", "Mathematics I", "Physics"],
      "2nd Semester": ["Java OOPs", "Mathematics II", "Electronics"],
      "3rd Semester": ["Database Systems", "Operating Systems"],
      "4th Semester": ["Computer Networks", "Data Structures"],
      "5th Semester": ["Full Stack Development"],
      "6th Semester": ["Cloud DevOps"],
      "7th Semester": ["AI & Machine Learning", "Generative AI"],
    },
    achievements: ["AI Hackathon Winner", "Top 5 in Coding Contest"],
    goals: [
      "Complete DSA practice by September",
      "Prepare for GATE 2026",
      "Improve Web Development projects",
    ],
    savedCourses: ["Machine Learning", "Cloud DevOps Basics"],
    certificates: ["Java Basics", "AWS Cloud Foundations"],
    deadlines: [
      "AI Assignment - 20th Aug",
      "DBMS Project - 25th Aug",
      "Cloud DevOps Quiz - 30th Aug",
    ],
    progress: 65,
    skills: ["React", "Node.js", "Python", "Public Speaking"],
    extracurriculars: [
      "Member - Coding Club",
      "Volunteer - NGO Education Drive",
    ],
    internships: [
      "Web Development Intern @ ABC Corp (2024)",
      "AI Research Assistant @ XYZ Labs (2025)",
    ],
    feedback: [
      "Excellent problem-solving skills",
      "Great teamwork and leadership",
    ],
  });

  // Handle input changes for basic info
  const handleChange = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  // Handle section-specific changes (skills, internships, feedback)
  const handleSectionChange = (section, index, value) => {
    const updated = [...student[section]];
    updated[index] = value;
    setStudent({ ...student, [section]: updated });
  };

  // Handle adding new item in a section
  const handleAddItem = (section) => {
    setStudent({ ...student, [section]: [...student[section], ""] });
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setStudent({ ...student, profilePicture: url });
    }
  };

  // Save basic profile
  const handleSave = () => {
    setEditMode(false);
    console.log("Saved student profile:", student);
  };

  // Save section changes
  const handleSectionSave = (section) => {
    setSectionEditModes((prev) => ({ ...prev, [section]: false }));
    console.log(`Saved ${section}:`, student[section]);
  };

  // Toggle section open/close
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle Edit Profile click
  const handleEditClick = () => {
    setEditMode(!editMode);
    setOpenSections((prev) => ({ ...prev, basicInfo: true }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-5xl p-10">
        {/* Header */}
        <div className="flex items-center gap-8 border-b pb-6 relative">
          <div className="w-28 h-28 rounded-full border-4 border-teal-600 flex items-center justify-center overflow-hidden bg-gray-100 relative">
            {student.profilePicture ? (
              <img
                src={student.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">Profile</span>
            )}
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">{student.name}</h1>
            <p className="text-gray-600">{student.program}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={handleEditClick}
                className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </button>

              <button
                onClick={() => setHeaderDropdownOpen(!headerDropdownOpen)}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                More ⬇
              </button>
            </div>

            {headerDropdownOpen && (
              <div className="absolute mt-2 bg-white border shadow-lg rounded-lg p-3 w-48 z-10">
                <ul className="space-y-2 text-gray-700">
                  <li className="cursor-pointer hover:text-teal-600">
                    Change Password
                  </li>
                  <li className="cursor-pointer hover:text-teal-600">
                    Update Resume
                  </li>
                  <li className="cursor-pointer hover:text-teal-600">
                    Download Report
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Basic Information Section */}
        <Section
          title="Basic Information"
          section="basicInfo"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <div className="grid grid-cols-2 gap-8">
            {["name", "email", "phone", "dob", "gender", "address"].map(
              (f) => (
                <div key={f}>
                  <label className="text-sm text-gray-500 capitalize">{f}</label>
                  {editMode ? (
                    <input
                      type="text"
                      name={f}
                      value={student[f]}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
                    />
                  ) : (
                    <p className="mt-1 font-medium text-gray-700">{student[f]}</p>
                  )}
                </div>
              )
            )}
          </div>
        </Section>

        {/* Semester-wise Courses */}
        <Section
          title="Semester-wise Courses"
          section="courses"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(student.coursesBySemester).map(([sem, courses]) => (
              <div
                key={sem}
                className="bg-gray-50 border rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <p className="font-semibold text-teal-700">{sem}</p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  {courses.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Achievements */}
        <Section
          title="Achievements"
          section="achievements"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <ul className="flex flex-wrap gap-3">
            {student.achievements.map((a, i) => (
              <li
                key={i}
                className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm shadow-sm"
              >
                🏅 {a}
              </li>
            ))}
          </ul>
        </Section>

        {/* Learning Goals */}
        <Section
          title="Learning Goals"
          section="goals"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <ul className="list-disc list-inside text-gray-700">
            {student.goals.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </Section>

        {/* Saved Courses */}
        <Section
          title="Saved Courses"
          section="savedCourses"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <ul className="list-disc list-inside text-gray-700">
            {student.savedCourses.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </Section>

        {/* Certificates */}
        <Section
          title="Certificates"
          section="certificates"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <ul className="list-disc list-inside text-gray-700">
            {student.certificates.map((c, i) => (
              <li key={i}>📜 {c}</li>
            ))}
          </ul>
        </Section>

        {/* Upcoming Deadlines */}
        <Section
          title="Upcoming Deadlines"
          section="deadlines"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <ul className="list-disc list-inside text-gray-700">
            {student.deadlines.map((d, i) => (
              <li key={i}>📅 {d}</li>
            ))}
          </ul>
        </Section>

        {/* Skills & Extracurriculars */}
        <Section
          title="Skills & Extracurriculars"
          section="skills"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <div className="flex justify-end mb-2">
            <button
              onClick={() =>
                setSectionEditModes((prev) => ({
                  ...prev,
                  skills: !prev.skills,
                }))
              }
              className="px-3 py-1 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              {sectionEditModes.skills ? "Cancel" : "Edit"}
            </button>
          </div>
          <ul className="flex flex-wrap gap-3">
            {["skills", "extracurriculars"].map((section) =>
              student[section].map((item, idx) =>
                sectionEditModes.skills ? (
                  <input
                    key={section + idx}
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleSectionChange(section, idx, e.target.value)
                    }
                    className="border px-2 py-1 rounded text-sm"
                  />
                ) : (
                  <li
                    key={section + idx}
                    className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm shadow-sm"
                  >
                    {section === "skills" ? "💡 " : "✨ "}
                    {item}
                  </li>
                )
              )
            )}
            {sectionEditModes.skills && (
              <button
                onClick={() => handleAddItem("skills")}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                + Add
              </button>
            )}
          </ul>
          {sectionEditModes.skills && (
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => handleSectionSave("skills")}
                className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          )}
        </Section>

        {/* Internships Section */}
        <Section
          title="Internships"
          section="internships"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <div className="flex justify-end mb-2">
            <button
              onClick={() =>
                setSectionEditModes((prev) => ({
                  ...prev,
                  internships: !prev.internships,
                }))
              }
              className="px-3 py-1 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              {sectionEditModes.internships ? "Cancel" : "Edit"}
            </button>
          </div>
          <ul className="list-disc list-inside text-gray-700">
            {student.internships.map((i, idx) =>
              sectionEditModes.internships ? (
                <input
                  key={idx}
                  type="text"
                  value={i}
                  onChange={(e) => handleSectionChange("internships", idx, e.target.value)}
                  className="border px-2 py-1 rounded text-sm mb-1 block"
                />
              ) : (
                <li key={idx}>💼 {i}</li>
              )
            )}
          </ul>
          {sectionEditModes.internships && (
            <div className="mt-2 flex gap-2 justify-end">
              <button
                onClick={() => handleAddItem("internships")}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                + Add
              </button>
              <button
                onClick={() => handleSectionSave("internships")}
                className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          )}
        </Section>

        {/* Feedback Section */}
        <Section
          title="Feedback"
          section="feedback"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <div className="flex justify-end mb-2">
            <button
              onClick={() =>
                setSectionEditModes((prev) => ({
                  ...prev,
                  feedback: !prev.feedback,
                }))
              }
              className="px-3 py-1 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              {sectionEditModes.feedback ? "Cancel" : "Edit"}
            </button>
          </div>
          <ul className="list-inside text-gray-700 space-y-2">
            {student.feedback.map((f, idx) =>
              sectionEditModes.feedback ? (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={f.text}
                    onChange={(e) =>
                      handleSectionChange("feedback", idx, { ...f, text: e.target.value })
                    }
                    className="border px-2 py-1 rounded text-sm flex-1"
                  />
                  <select
                    value={f.rating}
                    onChange={(e) =>
                      handleSectionChange("feedback", idx, { ...f, rating: Number(e.target.value) })
                    }
                    className="border px-2 py-1 rounded text-sm"
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <option key={star} value={star}>
                        {star} ⭐
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <li key={idx} className="flex items-center gap-2">
                  <span>⭐</span>
                  <span>{f.text}</span>
                  <span className="text-yellow-500">
                    {"★".repeat(f.rating) + "☆".repeat(5 - f.rating)}
                  </span>
                </li>
              )
            )}
          </ul>
          {sectionEditModes.feedback && (
            <div className="mt-2 flex gap-2 justify-end">
              <button
                onClick={() =>
                  setStudent({
                    ...student,
                    feedback: [...student.feedback, { text: "", rating: 0 }],
                  })
                }
                className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                + Add
              </button>
              <button
                onClick={() => handleSectionSave("feedback")}
                className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          )}
        </Section>


        {/* Save button only visible in edit mode for basic info */}
        {editMode && (
          <div className="mt-10 flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Section Component
function Section({ title, section, openSections, toggleSection, children }) {
  return (
    <section className="mt-10">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex justify-between items-center text-xl font-semibold text-gray-800 mb-5 border-l-4 border-teal-600 pl-3"
      >
        {title} <span>{openSections[section] ? "▲" : "▼"}</span>
      </button>
      {openSections[section] && children}
    </section>
  );
}

export default MyProfile;
