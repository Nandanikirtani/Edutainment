import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FAQS from './pages/FAQS'
import About from './pages/About'
import Courses from './pages/Courses'                                   
import './App.css'
import AuthPages from './pages/AuthPages'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Courses/>
 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          {/* <Route path="/courses" element={<Courses />} /> */}
          <Route path="/login" element={<AuthPages />} />
          <Route path="/signup" element={<AuthPages />} />
        </Routes>
      {/* </div> */}
      <Footer />
    </Router>
  )
}

export default App