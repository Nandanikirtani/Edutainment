import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
// import Navbar from './components/Navbar'
import Home from './pages/Home';
import FAQS from "./pages/FAQS";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Home/>
       <FAQS />
    </>
  )
}

export default App
