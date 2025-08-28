import { useState } from 'react'
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FAQS from './pages/FAQS'
import Courses from './pages/Courses'
import About from './pages/About'
import './App.css'
import AuthPages from './pages/AuthPages'
import Footer from './components/Footer'
import Studentsidebar from './components/Studentsidebar'
import Dashboard from './pages/Dashboard'
import Campuslife from './pages/Campuslife'
// import Podcast1 from './pages/Podcast1';       // ✅ keep inside pages folder
// import Podcast2 from './pages/Podcast2';
// import Podcast3 from './pages/Podcast3';
// import Podcast4 from './pages/Podcast4';
import PodcastContent from './components/PodcastContent'
import AwardDetail from "./components/AwardDetail";

function AppContent() {
  const location = useLocation()

  // Routes where Navbar and Footer should be hidden
  const hideLayoutRoutes = ['/student']

  const hideLayout = hideLayoutRoutes.includes(location.pathname)

  return (
    <>
      {!hideLayout && <Navbar />}
      <div className={hideLayout ? '' : 'pt-20'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/faqs" element={<FAQS />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<AuthPages />} />
          <Route path="/signup" element={<AuthPages />} />
          <Route path="/student" element={<Studentsidebar />} />
          <Route path="/campus" element={<Campuslife />} />
          {/* <Route path="/podcast1" element={<Podcast1 />} />
          <Route path="/podcast2" element={<Podcast2 />} />
          <Route path="/podcast3" element={<Podcast3 />} />
          <Route path="/podcast4" element={<Podcast4 />} /> */}
          <Route
            path="/podcast"
            element={
              <PodcastContent
                title="The #1 Thing Industry Wants in Engineers"
                speaker="Ft. Dr. Venkatesh Radhakrishnan"
                desc="Learn the key skills and mindset industry demands."
                bgImage="/podcast1.jpg"
              />
            }
          />
          <Route path="/award/:id" element={<AwardDetail />} />
            
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </>
  )
}


export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}