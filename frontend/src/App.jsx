import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './pages/About'
import Home from './pages/Home'
import FAQS from './pages/FAQS'
import './App.css'
import AuthPages from './pages/AuthPages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <div className='pt-20'>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/faqs" element={<FAQS />} />
          <Route path="/login" element={<AuthPages />} />
          <Route path="/signup" element={<AuthPages />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
