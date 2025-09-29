import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import FAQS from "./pages/FAQS";
import Courses from "./pages/Courses";
import About from "./pages/About";
import AuthPages from "./pages/AuthPages";
import Studentsidebar from "./components/Studentsidebar";
import Campuslife from "./pages/Campuslife";
import AwardDetail from "./pages/AwardDetail";
import Profile from "./pages/Profile";
import Podcast from "./pages/Podcast";
import IconDetail from "./pages/IconDetail";
import Alumini from "./pages/Alumini";
import FacultyDashboard from "./pages/FacultyDashboard";
import Reels from "./pages/Reels";
import AdminDashboard from "./pages/AdminDashboard";

import "./App.css";

function AppContent() {
  const location = useLocation();

  // Routes where Navbar and Footer should be hidden
  const hideLayoutRoutes = ["/student"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <div className={hideLayout ? "" : "pt-20"}>
        <Routes>
          {/* Core Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/faqs" element={<FAQS />} />
          <Route path="/courses" element={<Courses />} />

          {/* Auth */}
          <Route path="/login" element={<AuthPages />} />
          <Route path="/signup" element={<AuthPages />} />

          {/* Student */}
          <Route path="/student" element={<Studentsidebar />} />
          <Route path="/profile" element={<Profile />} />

          {/* Campus Life */}
          <Route path="/campus" element={<Campuslife />} />

          {/* Podcasts */}
          <Route path="/podcast" element={<Podcast />} />

          {/* Faculty Dashboard */}
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />


          {/* Alumni + Detail Pages */}
          <Route path="/alumini" element={<Alumini />} />
          <Route path="/alumini/:id" element={<Alumini />} />
          <Route path="/award/:id" element={<AwardDetail />} />
          <Route path="/icon/:id" element={<IconDetail />} />

          {/* 🎥 Reels */}
          <Route path="/reels" element={<Reels />} />
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
