// HomePage.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Play, ArrowLeft, Clock, User } from "lucide-react";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
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

const CardImage = styled.img.attrs({
  onError: (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(e.target.alt || 'Image')}`;
    e.target.style.objectFit = 'contain';
    e.target.style.backgroundColor = '#f0f0f0';
  }
})`
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
  { id: 1, url: "1.png", videoId: "rHWQm-dsJ8g" },
  { id: 2, url: "2.png", videoId: "2HeLWFWPhaw" },
  { id: 3, url: "3.png", videoId: "s0rQ4wn8Ir8" },
];

const coursesData = [
  { id: "1", title: "AR/VR COURSES", tag: "New / Free", img: "/AR.jpeg" },
  { id: "2", title: "Machine Learning", tag: "Everybody", img: "/Machine_LEARNING.jpeg" },
  { id: "3", title: "AI Tutorial", tag: "Simplilearn", img: "/AI.jpeg" },
  { id: "4", title: "Java", tag: "Pay per view", img: "/java.png" },
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
  const [showVideo, setShowVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (!showVideo) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % sliderImages.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [showVideo]);

  const handlePlayClick = () => {
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
  };

  const handleThumbnailClick = (index) => {
    setCurrent(index);
    setShowVideo(false);
  };

  return (
    <SliderContainer>
      <AnimatePresence mode="wait">
        <div 
          style={{ position: 'relative', width: '100%', height: '100%' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <MainImage
            key={sliderImages[current].id}
            src={sliderImages[current].url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
          <Overlay />
          <PlayButton 
            onClick={handlePlayClick}
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }}
            style={{
              opacity: isHovered ? 1 : 0.8,
              transition: 'opacity 0.3s ease',
            }}
          >
            <Play size={22} /> Play
          </PlayButton>
        </div>
      </AnimatePresence>

      {/* Video Modal */}
      {showVideo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <button 
            onClick={closeVideo}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '20px',
              cursor: 'pointer',
              zIndex: 1001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
          <div style={{
            width: '90%',
            maxWidth: '1200px',
            aspectRatio: '16/9',
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${sliderImages[current].videoId}?autoplay=1&modestbranding=1&rel=0`}
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            ></iframe>
          </div>
        </div>
      )}

      <PreviewContainer>
        {sliderImages.map((img, index) => (
          <div key={img.id} style={{ position: 'relative' }}>
            <PreviewImage
              src={img.url}
              whileHover={{ scale: 1.1 }}
              animate={{ 
                borderColor: index === current ? "#ff4d4d" : "transparent", 
                scale: index === current ? 1.05 : 1 
              }}
              transition={{ duration: 0.3 }}
              onClick={() => handleThumbnailClick(index)}
            />
            {index === current && showVideo && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                pointerEvents: 'none',
              }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  background: '#ff4d4d',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulse 1.5s infinite',
                }}>
                  <Play size={16} color="white" />
                </div>
              </div>
            )}
          </div>
        ))}
      </PreviewContainer>

      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </SliderContainer>
  );
};

// ============ CHANGE 2: UPDATED THIS COMPONENT TO USE THE WRAPPER ============
const CareerSection = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCareerClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    window.open('https://apply.manavrachna.edu.in/mru', '_blank');
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <>
      <CareerContainer onClick={handleCareerClick} style={{ cursor: 'pointer' }}>
        <CareerBanner 
          src="carrer.png" 
          alt="Career Banner" 
          style={{ width: '100%', height: 'auto' }}
        />
      </CareerContainer>

      {/* Custom Modal */}
      {showModal && (
        <div 
          onClick={handleOverlayClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div style={{
            background: '#000000',
            borderRadius: '24px',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 10px 30px rgba(255, 0, 0, 0.3)',
            fontFamily: 'Arial, sans-serif',
            border: '1px solid #FF0000',
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #FF0000, #990000)',
              color: 'white',
              padding: '20px',
              textAlign: 'center',
              position: 'relative',
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Confirmation
              </h3>
              <button
                onClick={handleCancel}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white',
                }}
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '30px 25px' }}>
              <p style={{
                color: '#FFFFFF',
                fontSize: '16px',
                lineHeight: '1.6',
                margin: '0 0 25px',
                textAlign: 'center'
              }}>
                Are you sure you want to be redirected to Manav Rachna University application page?
              </p>

              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '8px',
                    border: '1px solid #FF0000',
                    background: '#000000',
                    color: '#FFFFFF',
                    fontSize: '15px',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#1a1a1a';
                    e.target.style.color = '#FF0000';
                    e.target.style.borderColor = '#FF0000';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#000000';
                    e.target.style.color = '#FF0000';
                    e.target.style.borderColor = '#FF0000';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #FF0000, #990000)',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    minWidth: '120px',
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '0.9'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const CoursesSection = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/videos/courses`);
      const data = await response.json();
      
      if (response.ok) {
        setCourses(data.data || []);
      } else {
        // Fallback to hardcoded data if API fails
        setCourses(coursesData);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      // Fallback to hardcoded data
      setCourses(coursesData);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <SectionContainer>
        <SectionTitle>Trending Courses</SectionTitle>
        <div className="text-center text-white">Loading courses...</div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionTitle>Trending Courses</SectionTitle>
      <MotionCoursesGrid variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
        {courses.map((course, index) => (
          <CourseCard 
            key={course._id || course.id} 
            variants={cardVariant} 
            whileHover={{ scale: 1.08, rotateX: -5, rotateY: 5, boxShadow: "0px 20px 40px rgba(255,0,0,0.5)" }}
            onClick={() => handleCourseClick(course._id || course.id)}
            style={{ cursor: 'pointer' }}
          >
            <Rank>{index + 1}</Rank>
            <CardImage 
              src={course.img} 
              alt={course.title}
            />
          </CourseCard>
        ))}
      </MotionCoursesGrid>
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
                background: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
              }}>
                <Play size={24} color="#fff" />
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