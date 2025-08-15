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

function AppContent() {
  const location = useLocation()

  // Routes where Navbar and Footer should be hidden
  const hideLayoutRoutes = ['/student/sidebar']

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