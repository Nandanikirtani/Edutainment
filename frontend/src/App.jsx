import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FAQS from './pages/FAQS';
import Courses from './pages/Courses';
import About from './pages/About';
import AuthPages from './pages/AuthPages';
import Studentsidebar from './components/Studentsidebar';
import Campuslife from './pages/Campuslife';
import PodcastContent from './components/PodcastContent';
import AwardDetail from './components/AwardDetail';
import Profile from './pages/Profile';
import  Podcast  from './pages/Podcast';
import FacultyDashboard from './pages/FacultyDashboard';
import './App.css';


function AppContent() {
  const location = useLocation();
  const hideLayoutRoutes = ['/student'];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

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
          <Route path="/campus" element={<Campuslife />} /><Route path="/campus" element={<Campuslife />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          {/* <Route path="/profile" element={<Courses />} /> */}

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
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
