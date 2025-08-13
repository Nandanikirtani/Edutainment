import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FAQS from './pages/FAQS'
import About from './pages/About'
import './App.css'
import AuthPages from './pages/AuthPages'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <div className='pt-20'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/faqs" element={<FAQS />} />
          <Route path="/login" element={<AuthPages />} />
          <Route path="/signup" element={<AuthPages />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App