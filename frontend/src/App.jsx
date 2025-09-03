// import { useState } from 'react'
// import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Home from './pages/Home'
// import FAQS from './pages/FAQS'
// import Courses from './pages/Courses'
// import About from './pages/About'
// import './App.css'
// import AuthPages from './pages/AuthPages'
// import Footer from './components/Footer'
// import Studentsidebar from './components/Studentsidebar'
// import Dashboard from './pages/Dashboard'
// import CampusLife from './pages/Campus life'
// import Podcast1 from './pages/Podcast1';       // ✅ keep inside pages folder
// import Podcast2 from './pages/Podcast2';
// import Podcast3 from './pages/Podcast3';
// import Podcast4 from './pages/Podcast4';
// import Alumini from './pages/Alumini';
// import IconDetail from './pages/IconDetail';
// import AwardDetail from './pages/AwardDetail';

// function AppContent() {
//   const location = useLocation()

//   // Routes where Navbar and Footer should be hidden
//   const hideLayoutRoutes = ['/student']

//   const hideLayout = hideLayoutRoutes.includes(location.pathname)

//   return (
//     <>
//       {!hideLayout && <Navbar />}
//       <div className={hideLayout ? '' : 'pt-20'}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/aboutus" element={<About />} />
//           <Route path="/faqs" element={<FAQS />} />
//           <Route path="/courses" element={<Courses />} />
//           <Route path="/login" element={<AuthPages />} />
//           <Route path="/signup" element={<AuthPages />} />
//           <Route path="/student" element={<Studentsidebar />} />
//           <Route path="/campuslife" element={<CampusLife />} />
//           <Route path="/podcast1" element={<Podcast1 />} />
//           <Route path="/podcast2" element={<Podcast2 />} />
//           <Route path="/podcast3" element={<Podcast3 />} />
//           <Route path="/podcast4" element={<Podcast4 />} />
//           <Route path="/Alumini" element={<Alumini/>} />
//           <Route path="/IconDetail" element={<IconDetail/>} />
//           <Route path="/AwardDetail" element={<AwardDetail/>} />
            
//         </Routes>
//       </div>
//       {!hideLayout && <Footer />}
//     </>
//   )
// }


// export default function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   )
// }



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
import CampusLife from './pages/Campuslife'
import Podcast1 from './pages/Podcast1'
import Podcast2 from './pages/Podcast2'
import Podcast3 from './pages/Podcast3'
import Podcast4 from './pages/Podcast4'
import Alumini from './pages/Alumini'
import IconDetail from './pages/IconDetail'
import AwardDetail from './pages/AwardDetail'

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
          <Route path="/campuslife" element={<CampusLife />} />
          <Route path="/podcast1" element={<Podcast1 />} />
          <Route path="/podcast2" element={<Podcast2 />} />
          <Route path="/podcast3" element={<Podcast3 />} />
          <Route path="/podcast4" element={<Podcast4 />} />

          {/* ✅ Alumni + Detail Pages */}
          <Route path="/alumini" element={<Alumini />} />
          <Route path="/award/:id" element={<AwardDetail />} />
          <Route path="/icon/:id" element={<IconDetail />} />

          <Route path="/alumini/:id" element={<Alumini />} />
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
