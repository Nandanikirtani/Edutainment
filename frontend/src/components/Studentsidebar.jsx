import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBook,
  FaMedal,
  FaTasks,
  FaUser,
  FaSignOutAlt,
  FaChevronLeft,
} from "react-icons/fa";

// Example Dashboard Component
const Dashboard = () => (
  <>
    <h1 className="text-2xl font-bold mb-4" style={{ color: "#0C7489" }}>
      Dashboard
    </h1>
    <p className="text-gray-700">Welcome to your dashboard!</p>
  </>
);

export default function SidebarLayout() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_ITEMS = [
    { key: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { key: "courses", label: "My Courses", icon: <FaBook /> },
    { key: "achievements", label: "Achievements", icon: <FaMedal /> },
    { key: "assignments", label: "Assignments", icon: <FaTasks /> },
  ];

  const NAV_BOTTOM = [
    { key: "home", label: "Back to Home", icon: <FaChevronLeft /> }, // 👈 Added
    { key: "profile", label: "Profile", icon: <FaUser /> },
    { key: "logout", label: "Logout", icon: <FaSignOutAlt /> },
  ];

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <Dashboard />;
      case "courses":
        return (
          <>
            <h1 className="text-2xl font-bold mb-4" style={{ color: "#0C7489" }}>
              My Courses
            </h1>
            <p className="text-gray-700">
              All your enrolled courses appear here.
            </p>
          </>
        );
      case "achievements":
        return (
          <>
            <h1 className="text-2xl font-bold mb-4" style={{ color: "#0C7489" }}>
              Achievements
            </h1>
            <p className="text-gray-700">
              Badges, certificates, and milestones.
            </p>
          </>
        );
      case "assignments":
        return (
          <>
            <h1 className="text-2xl font-bold mb-4" style={{ color: "#0C7489" }}>
              Assignments
            </h1>
            <p className="text-gray-700">
              View and submit your pending assignments here.
            </p>
          </>
        );
      case "profile":
        return (
          <>
            <h1 className="text-2xl font-bold mb-4" style={{ color: "#0C7489" }}>
              Profile
            </h1>
            <p className="text-gray-700">Manage your personal details.</p>
          </>
        );
      case "home":
        window.location.href = "/"; // 👈 Redirect to homepage
        return null;
      default:
        return null;
    }
  };

  const NavButton = ({ item }) => (
    <button
      onClick={() => {
        if (item.key === "logout") {
          alert("Logged out!");
        } else if (item.key === "home") {
          window.location.href = "/"; // Redirect to homepage
        } else {
          setActive(item.key);
        }
        setMobileOpen(false);
      }}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition w-full text-left
        ${
          active === item.key
            ? "text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      style={active === item.key ? { backgroundColor: "#0C7489" } : {}}
    >
      <span className="text-lg">{item.icon}</span>
      {!collapsed && <span>{item.label}</span>}
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-16" : "w-64"
        } bg-white border-r border-gray-200 flex flex-col justify-between p-4 transition-all duration-300
        ${mobileOpen ? "fixed inset-0 z-50" : "hidden md:flex"}`}
      >
        {/* Top */}
        <div>
          <h1
            className={`font-bold text-xl mb-6 ${
              collapsed ? "hidden" : "block"
            }`}
            style={{ color: "#0C7489" }}
          >
            Student Portal
          </h1>
          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <NavButton key={item.key} item={item} />
            ))}
          </nav>
        </div>

        {/* Bottom */}
        <div className="space-y-2">
          {NAV_BOTTOM.map((item) => (
            <NavButton key={item.key} item={item} />
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>
    </div>
  );
}
