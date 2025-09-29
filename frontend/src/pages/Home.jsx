// HomePage.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Play, ArrowLeft, Clock, User } from "lucide-react";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  img {
    display: block;
  }
`;

/* ================= HeroSlider Styles ================= */
const SliderContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  font-family: "Arial", sans-serif;
  background: black;
`;

const MainImage = styled(motion.img)`
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.35);
`;

const PlayButton = styled(motion.button)`
  position: absolute;
  top: 25%;
  left: 10%;
  background: linear-gradient(135deg, #ff078, #ff4d4d);
  color: white;
  font-size: 22px;
  font-weight: bold;
  padding: 16px 32px;
  border-radius: 50px;
  border: none;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.4);

  &:hover {
    background: linear-gradient(135deg, #e60000, #ff6666);
    transform: scale(1.08);
  }
`;

const PreviewContainer = styled.div`
  position: absolute;
  bottom: 100px;
  display: flex;
  gap: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const PreviewImage = styled(motion.img)`
  width: 250px;
  height: 150px;
  border-radius: 14px;
  object-fit: cover;
  border: 3px solid transparent;
  cursor: pointer;
`;

// ============ CHANGE 1: ADDED THIS CONTAINER AND UPDATED THE BANNER STYLE ============
const CareerContainer = styled.div`
  background-color: #000; /* Match the theme background */
  padding: 25px 20px; /* Top/Bottom 25px, Left/Right 20px. Adjust as you like. */
`;

const CareerBanner = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px; /* Optional: gives the image soft corners */
`;

/* ================= CoursesSection Styles ================= */
const SectionContainer = styled.div`
  padding: 50px 20px;
  background-color: #000;
  color: white;
  font-family: "Arial", sans-serif;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CoursesGrid = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const CourseCard = styled(motion.div)`
  position: relative;
  width: 300px;
  height: 180px;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  background-color: #111;
  transition: transform 0.3s, box-shadow 0.3s;
  perspective: 1000px;
`;

const Rank = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 28px;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.9);
  z-index: 5;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const CardTag = styled.span`
  font-size: 12px;
  color: yellow;
  margin-right: 10px;
`;

/* ================= Arts & Humanities Section Styles ================= */
const ArtsContainer = styled.div`
  padding: 50px 20px;
  background: #111;
  color: white;
  font-family: "Arial", sans-serif;
  text-align: center;
`;

const ArtsTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const ArtsGrid = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;


const ArtsCard = styled(motion.div)`
  position: relative;
  width: 280px;
  height: 170px;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  background-color: #222;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.4);
`;

const ArtsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArtsOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
`;

const ArtsText = styled.h3`
  margin: 0;
  font-size: 18px;
`;

/* ================= ExtraSection Styles ================= */
const ExtraSectionContainer = styled.div`
  padding: 50px 20px;
  background-color: #000;
  color: white;
  font-family: "Arial", sans-serif;
`;

const ExtraSectionTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ExtraGrid = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ExtraCard = styled(motion.div)`
  position: relative;
  width: 300px;
  height: 180px;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  background-color: #111;
  transition: all 0.3s ease-in-out;
  perspective: 1000px;
  border: 1px solid transparent; /* Default border */
`;

const ExtraCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ExtraCardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
`;

const ExtraCardTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const ExtraCardTag = styled.span`
  font-size: 12px;
  color: #ffcc00;
  margin-right: 10px;
`;
const BackTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 5px;
  color: #fff;
`;

const BackTag = styled.span`
  font-size: 14px;
  color: #ffd700;
  margin-bottom: 10px;
`;

const BackDesc = styled.p`
  font-size: 14px;
  color: #ccc;
  line-height: 1.4;
`;

/* ================= Data ================= */
const sliderImages = [
  { 
    id: 1, 
    url: "1.png",
    videoId: "rHWQm-dsJ8g",
    title: "Campus Tour",
    description: "Experience our world-class campus facilities and infrastructure"
  },
  { 
    id: 2, 
    url: "2.png",
    videoId: "2HeLWFWPhaw",
    title: "Student Life",
    description: "Discover the vibrant student community and activities"
  },
  { 
    id: 3, 
    url: "3.png",
    videoId: "s0rQ4wn8Ir8",
    title: "Academic Excellence",
    description: "Learn about our cutting-edge academic programs and research"
  },
];

const coursesData = [
  { id: 1, title: "AR/VR COURSES", tag: "New / Free", img: "AR.jpeg" },
  { id: 2, title: "Machine Learning", tag: "Everybody", img: "Machine_LEARNING.jpeg" },
  { id: 3, title: "AI Tutorial", tag: "Simplilearn", img: "AI.jpeg" },
  { id: 4, title: "Java", tag: "Pay per view", img: "java.png" },
];

const artsData = [
  { id: 1, title: "Entrepreneurship AND Startup", img: "A1.png", videoId: "fmycIrIn9Pk"},
  { id: 2, title: "Sources of Business Ideas", img: "A2.png" , videoId: "9kMY1Amf1CA" },
  { id: 3, title: "Literature", img: "A3.png" },
  { id: 4, title: "Sociology", img: "A4.png" },
];

const extraData = [
  { id: 1, title: "B.Tech Automobile", tag: "Engineering", img: "C1.jpeg", videoId: "C2ZFWaHOAaQ", desc: "Explore the world of automotive engineering with cutting-edge technology and hands-on learning experiences." },
  { id: 2, title: "MBA Programs", tag: "Business", img: "C2.jpeg", videoId: "FFbCjEAestA", desc: "Transform your career with our comprehensive MBA programs designed for future business leaders." },
  { id: 3, title: "Psychology", tag: "Behavioral Science", img: "C3.jpeg", videoId: "_bFV-saB2Uk", desc: "Understand human behavior and mental processes through our advanced psychology curriculum." },
  { id: 4, title: "Mass Comm.", tag: "Media", img: "C4.jpeg", videoId: "XOZhYijcVBY", desc: "Master the art of communication and media with our industry-focused mass communication program." },
];

/* ================= Motion Variants ================= */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, when: "beforeChildren" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: -40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const MotionCoursesGrid = motion(CoursesGrid);
const MotionArtsGrid = motion(ArtsGrid);
const MotionExtraGrid = motion(ExtraGrid);

/* ================= Components ================= */
const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayClick = (videoId) => {
    if (!videoId) return;
    setCurrentVideo({
      id: videoId,
      title: sliderImages[current].title || 'Video Player'
    });
    setIsPlaying(true);
  };

  return (
    <SliderContainer>
      <AnimatePresence mode="wait">
        <MainImage
          key={sliderImages[current].id}
          src={sliderImages[current].url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          onClick={() => handlePlayClick(sliderImages[current].videoId)}
          style={{ cursor: 'pointer' }}
        />
      </AnimatePresence>
      <Overlay />
      <PlayButton 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          handlePlayClick(sliderImages[current].videoId);
        }}
      >
        <Play size={22} /> Play
      </PlayButton>
      <PreviewContainer>
        {sliderImages.map((img, index) => (
          <PreviewImage
            key={img.id}
            src={img.url}
            whileHover={{ scale: 1.1 }}
            animate={{ borderColor: index === current ? "red" : "transparent", scale: index === current ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
            onClick={() => setCurrent(index)}
          />
        ))}
      </PreviewContainer>

      {isPlaying && currentVideo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            position: 'relative',
            width: '90%',
            maxWidth: '1000px',
            paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
          }}>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentVideo(null);
              }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                border: '2px solid white',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1001,
                fontSize: '24px',
                fontWeight: 'bold',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)'
              }}
            >
              ×
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1`}
              title={currentVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)'
              }}
            ></iframe>
          </div>
        </div>
      )}
    </SliderContainer>
  );
};

// Custom Modal Component
const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '2rem',
        borderRadius: '12px',
        maxWidth: '450px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 4px 25px rgba(220, 38, 38, 0.3)',
        border: '1px solid #dc2626',
        color: '#ffffff'
      }}>
        <h3 style={{ 
          color: '#ffffff',
          marginBottom: '1.5rem',
          fontSize: '1.5rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>Redirecting to Application Portal</h3>
        
        <p style={{
          color: '#e5e7eb',
          marginBottom: '2rem',
          lineHeight: '1.6',
          fontSize: '1.1rem'
        }}>
          You are being redirected to the application portal. Do you want to continue?
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '1.5rem'
        }}>
          <button 
            onClick={onCancel}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '6px',
              border: '1px solid #333',
              backgroundColor: '#333',
              color: '#ffffff',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              ':hover': {
                backgroundColor: '#444',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#dc2626',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              ':hover': {
                backgroundColor: '#b91c1c',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)'
              }
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// ============ UPDATED CAREER SECTION WITH CUSTOM MODAL ============
const CareerSection = () => {
  const [showModal, setShowModal] = useState(false);

  const handleBannerClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    window.open('https://apply.manavrachna.edu.in/mru', '_blank');
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <CareerContainer>
        <CareerBanner 
          src="carrer.png" 
          alt="Career Banner" 
          onClick={handleBannerClick}
          style={{ cursor: 'pointer' }}
        />
      </CareerContainer>
      
      <ConfirmationModal 
        isOpen={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};

const CoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/videos/courses');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch courses');
        setCourses(data.data);
      } catch (err) {
        setMessage(`Error: ${err.message}`);
      }
    };
    fetchCourses();
  }, []);

  const handlePlayVideo = (videoUrl, title) => {
    setCurrentVideo({ url: videoUrl, title });
    setIsPlaying(true);
  };

  return (
    <SectionContainer>
      <SectionTitle>Trending Courses</SectionTitle>
      {message && (
        <div className="max-w-4xl mx-auto mt-6 p-3 bg-red-100 text-red-800 rounded shadow text-center">
          {message}
        </div>
      )}
      {courses.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#ccc' }}>No courses available yet.</p>
      ) : (
        <MotionCoursesGrid variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          {courses.map((course) => (
            <CourseCard 
              key={course._id} 
              variants={cardVariant} 
              whileHover={{ scale: 1.08, rotateX: -5, rotateY: 5, boxShadow: "0px 20px 40px rgba(255,0,0,0.5)" }}
              onClick={() => handlePlayVideo(course.videoUrl, course.title)}
            >
              {course.thumbnailUrl ? (
                <CardImage src={course.thumbnailUrl} alt={course.title} />
              ) : (
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  backgroundColor: '#333', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'white', 
                  fontSize: '1.2em' 
                }}>
                  No Thumbnail
                </div>
              )}
              <CardOverlay>
                <CardTitle>{course.title}</CardTitle>
                <p style={{ fontSize: '12px', color: '#aaa' }}>Faculty: {course.facultyId?.fullName || 'Unknown'}</p>
                <p style={{ fontSize: '10px', color: '#bbb' }}>{course.description}</p>
              </CardOverlay>
            </CourseCard>
          ))}
        </MotionCoursesGrid>
      )}

      {isPlaying && currentVideo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <button
            onClick={() => setIsPlaying(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
          <h3 style={{ color: 'white', marginBottom: '20px' }}>{currentVideo.title}</h3>
          <video
            controls
            src={currentVideo.url}
            width="80%"
            height="70%"
            style={{
              borderRadius: '10px',
              boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
              maxWidth: '1000px',
            }}
          />
        </div>
      )}
    </SectionContainer>
  );
};

const ArtsSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const handlePlayVideo = (videoId, title) => {
    setCurrentVideo({ id: videoId, title });
    setIsPlaying(true);
  };

  return (
    <ArtsContainer>
      <ArtsTitle>Arts & Humanities</ArtsTitle>
      <MotionArtsGrid variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {artsData.map((item) => (
          <ArtsCard 
            key={item.id} 
            variants={cardVariant} 
            whileHover={{ 
              scale: 1.05, 
              y: -5, 
              boxShadow: "0px 15px 30px rgba(0,0,0,0.6)"
            }}
            onClick={() => item.videoId && handlePlayVideo(item.videoId, item.title)}
            style={{ cursor: item.videoId ? 'pointer' : 'default' }}
          >
            <ArtsImage src={item.img} alt={item.title} />
            {item.videoId && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                ':hover': {
                  transform: 'translate(-50%, -50%) scale(1.1)',
                  background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.3), rgba(220, 38, 38, 0.4))',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  borderColor: 'rgba(255, 0, 0, 0.4)',
                  boxShadow: '0 6px 25px rgba(220, 38, 38, 0.25)'
                }
              }}>
                <Play size={24} color="#fff" fill="#fff" style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                  transition: 'transform 0.2s ease',
                  ':hover': {
                    transform: 'scale(1.1)'
                  }
                }} />
              </div>
            )}
            <ArtsOverlay>
              <ArtsText>{item.title}</ArtsText>
            </ArtsOverlay>
          </ArtsCard>
        ))}
      </MotionArtsGrid>

      {isPlaying && currentVideo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <button 
            onClick={() => setIsPlaying(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
          <h3 style={{ color: 'white', marginBottom: '20px' }}>{currentVideo.title}</h3>
          <iframe
            width="80%"
            height="70%"
            src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1`}
            title={currentVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              borderRadius: '10px',
              boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)'
            }}
          ></iframe>
        </div>
      )}
    </ArtsContainer>
  );
};

/* ================= ExtraSection Component ================= */
const ExtraSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);

  const activeProgram = extraData[activeIndex];

  return (
    <>
      {isPlaying ? (
        // ✅ Fullscreen Video Player
        <div className="fixed inset-0 w-full h-full bg-black z-50">
          {/* Back Button */}
          {/* <button
            onClick={() => {
              setIsPlaying(false);
              setShowDetailView(true);
            }}
            className="absolute top-4 left-4 z-50 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button> */}

          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${activeProgram.videoId}?autoplay=1`}
            title={activeProgram.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      ) : showDetailView ? (
        // ✅ Detailed View with Background Image and Content
        <div className="fixed inset-0 w-full h-full bg-black z-40">
          {/* Background Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${activeProgram.img})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
          </motion.div>

          {/* Back Button
          <button
            onClick={() => setShowDetailView(false)}
            className="absolute top-6 left-6 z-50 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/70 transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button> */}

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {activeProgram.title}
              </h1>

              {/* Tag */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <User className="w-5 h-5 text-red-500" />
                <p className="text-xl text-gray-200">{activeProgram.tag}</p>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                {activeProgram.desc}
              </p>

              {/* Enhanced Play Button */}
              <motion.button
                onClick={() => {
                  setShowDetailView(false);
                  setIsPlaying(true);
                }}
                className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all duration-300">
                    <Play className="w-6 h-6 fill-white" />
                  </div>
                  <span>Watch Program</span>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"></div>
              </motion.button>

              {/* Additional Info */}
              <div className="mt-8 flex items-center justify-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Full Program Details</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>HD Quality</span>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <ExtraSectionContainer>
          <ExtraSectionTitle>Programs Offered</ExtraSectionTitle>
          <MotionExtraGrid
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {extraData.map((item, index) => (
              <ExtraCard
                key={item.id}
                variants={cardVariant}
                onClick={() => {
                  setActiveIndex(index);
                  setShowDetailView(true);
                }}
                whileHover={{
                  scale: 1.1, // Zoom
                  rotateX: -5, // 3D tilt
                  rotateY: 5,
                  boxShadow: "0 0 25px 8px rgba(245, 26, 26, 0.8)", // Glow
                  border: "3px solid #ff0000"
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                }}
                whileTap={{ scale: 1.05 }} // Slight shrink on click/tap
              >
                <ExtraCardImage src={item.img} alt={item.title} />
                <ExtraCardOverlay>
                  <ExtraCardTag>{item.tag}</ExtraCardTag>
                  <ExtraCardTitle>{item.title}</ExtraCardTitle>
                </ExtraCardOverlay>
              </ExtraCard>
            ))}
          </MotionExtraGrid>
        </ExtraSectionContainer>
      )}
    </>
  );
};
const HomePage = () => {
  return (
    <>
      <GlobalStyle /> 
      <HeroSlider />
      <CareerSection /> 
      <CoursesSection />
      <ArtsSection />
      <ExtraSection />
    </>
  );
};

export default HomePage;