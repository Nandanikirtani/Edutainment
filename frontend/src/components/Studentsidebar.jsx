import { useState } from "react";
import Dashboard from "../pages/Dashboard";
import {
  FaTachometerAlt,
  FaBook,
  FaMedal,
  FaTasks,
  FaUser,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function Studentsidebar() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_TOP = [
    { key: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { key: "courses", label: "My Courses", icon: <FaBook /> },
    { key: "achievements", label: "Achievements", icon: <FaMedal /> },
    { key: "assignments", label: "Assignments", icon: <FaTasks /> },
  ];

  const NAV_BOTTOM = [
    { key: "profile", label: "Profile", icon: <FaUser /> },
    { key: "logout", label: "Logout", icon: <FaSignOutAlt /> },
  ];

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return (
          <>
            <Dashboard/>
          </>
        );
      case "courses":
        return (
          <>
            <h1 className="text-2xl font-bold mb-4" style={{ color: "#0C7489" }}>
              My Courses
            </h1>
            <p className="text-gray-700">All your enrolled courses appear here.</p>
          </>
        );
      case "achievements":
        return (
          <>
            <h1 className="text-2xl font-bold mb-4" style={{ color: "#0C7489" }}>
              Achievements
            </h1>
            <p className="text-gray-700">Badges, certificates, and milestones.</p>
          </>
        );
      case "assignments":
        return (
          <>
            <h1 className="text-2xl font-bold mb-4" style={{ color: "#0C7489" }}>
              Assignments
            </h1>
            <p className="text-gray-700">View and submit your pending assignments here.</p>
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
      default:
        return null;
    }
  };

  const NavButton = ({ item }) => (
    <button
      onClick={() => {
        if (item.key === "logout") {
          alert("Logged out!");
        } else {
          setActive(item.key);
        }
        setMobileOpen(false);
      }}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition w-full text-left
        ${active === item.key ? "text-white" : "text-gray-700 hover:bg-gray-100"}`}
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
        className={`fixed md:static z-50 top-0 left-0 h-full bg-white border-r flex flex-col justify-between transition-all duration-300
        ${collapsed ? "w-16" : "w-64"} ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div>
          {/* Header + Collapse */}
          <div className="flex items-center justify-between h-14 px-3 border-b">
            {!collapsed && <span className="font-bold">Student Portal</span>}
            <button
              className="p-1 border rounded"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          </div>

          {/* Nav Top */}
          <div className="flex flex-col gap-1 mt-3">
            {NAV_TOP.map((item) => (
              <NavButton key={item.key} item={item} />
            ))}
          </div>
        </div>

        {/* Nav Bottom */}
        <div className="flex flex-col gap-1 mb-3">
          {NAV_BOTTOM.map((item) => (
            <NavButton key={item.key} item={item} />
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden mb-4 px-3 py-2 border rounded"
          onClick={() => setMobileOpen(true)}
        >
          ☰ Menu
        </button>

        {renderContent()}
      </div>
    </div>
  );
}
