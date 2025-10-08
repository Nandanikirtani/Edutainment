import { useState } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import ActivityTracker from "./components/ActivityTracker";
import SplashScreen from "./components/SplashScreen";

import Home from "./pages/Home";
import FAQS from "./pages/FAQS";
import Courses from "./pages/Courses";
import About from "./pages/About";
import AuthPages from "./pages/AuthPages";
import Campuslife from "./pages/Campuslife";
import AwardDetail from "./pages/AwardDetail";
import Profile from "./pages/Profile";
import Podcast from "./pages/Podcast";
import IconDetail from "./pages/IconDetail";
import Alumini from "./pages/Alumini";
import FacultyDashboard from "./pages/FacultyDashboard";
import Reels from "./pages/Reels";
import AdminDashboard from "./pages/AdminDashboard";
import CourseDetail from "./pages/CourseDetail";
import Dashboard from "./pages/Dashboard";
import Achievement from "./pages/Achievement";
import SavedReels from "./pages/SavedReels";

import "./App.css";

function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    // Show splash screen on initial app load, then reveal app
    return (
      <SplashScreen
        onFinished={() => setShowSplash(false)}
        showDurationMs={2200}
        exitDurationMs={700}
        beamsIntensity="high"
        enableSound={true}
        soundSrc={`${import.meta.env.BASE_URL}splash.mp3`}
      />
    );
  }

  // Routes where Navbar and Footer should be hidden
  const hideLayoutRoutes = ["/student"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {/* Global activity tracker runs on all pages to record active, visible time */}
      <ActivityTracker />
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
          <Route path="/student" element={<Dashboard />} />
          <Route path="/achievements" element={<Achievement />} />
          <Route path="/profile" element={<Profile />} />

          {/* Campus Life */}
          <Route path="/campus" element={<Campuslife />} />

          {/* Podcasts */}
          <Route path="/podcast" element={<Podcast />} />

          {/* Faculty Dashboard */}
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />


          {/* Admin Dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Alumni + Detail Pages */}
          <Route path="/alumini" element={<Alumini />} />
          <Route path="/alumini/:id" element={<Alumini />} />
          <Route path="/award/:id" element={<AwardDetail />} />
          <Route path="/icon/:id" element={<IconDetail />} />

          {/* 🎥 Reels */}
          <Route path="/reels" element={<Reels />} />

          {/* 📚 Course Detail */}
          <Route path="/course/:courseId" element={<CourseDetail />} />

          {/* 💾 Saved Reels */}
          <Route path="/saved-reels" element={<SavedReels />} />
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
