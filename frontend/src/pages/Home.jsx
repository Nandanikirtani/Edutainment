// HomePage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Play, Clock, User, Volume2, VolumeX } from "lucide-react";
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

/* ================= Hero Video Styles ================= */
const AnimatedBackground = styled.div`
  position: absolute;
  inset: 0;
  background: #000000;
  z-index: 0;
`;

const FloatingParticle = styled.div`
  position: absolute;
  width: ${props => props.size || 4}px;
  height: ${props => props.size || 4}px;
  background: ${props => props.color || 'rgba(77, 179, 167, 0.6)'};
  border-radius: 50%;
  filter: blur(1px);
  animation: float ${props => props.duration || 20}s linear infinite;
  animation-delay: ${props => props.delay || 0}s;
  left: ${props => props.left || 0}%;
  bottom: 0;
  box-shadow: 0 0 ${props => props.size * 2 || 8}px ${props => props.color || 'rgba(77, 179, 167, 0.4)'};
  
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) translateX(${props => props.drift || 50}px) scale(0);
      opacity: 0;
    }
  }
`;

const VideoContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  font-family: "Arial", sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 80px 40px 80px;
  gap: 60px;
  
  @media (max-width: 1024px) {
    padding: 100px 40px 40px 40px;
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    padding: 120px 20px 60px 20px;
    gap: 40px;
  }
`;

const VideoWrapper = styled.div`
  width: 52%;
  max-width: 850px;
  aspect-ratio: 16 / 10;
  position: relative;
  flex-shrink: 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.1);
  
  @media (max-width: 1024px) {
    width: 48%;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    aspect-ratio: 16 / 9;
  }
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  pointer-events: none;
`;

const WhyChooseSection = styled.div`
  flex: 1;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const WhyTitle = styled(motion.h1)`
  font-size: 64px;
  font-weight: 800;
  margin-bottom: 40px;
  color: white;
  line-height: 1.1;
  letter-spacing: -2px;
  
  @media (max-width: 1024px) {
    font-size: 48px;
    margin-bottom: 35px;
  }
  
  @media (max-width: 768px) {
    font-size: 40px;
    margin-bottom: 30px;
  }
`;

const FeatureCard = styled(motion.div)`
  display: flex;
  gap: 16px;
  margin-bottom: 18px;
  align-items: center;
  padding: 20px 24px;
  background: rgba(57, 112, 104, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(57, 112, 104, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(57, 112, 104, 0.15) 0%, rgba(77, 179, 167, 0.15) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateX(10px) scale(1.02);
    background: rgba(57, 112, 104, 0.15);
    border-color: rgba(77, 179, 167, 0.5);
    box-shadow: 0 8px 32px rgba(57, 112, 104, 0.3),
                0 0 0 1px rgba(77, 179, 167, 0.5);
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 14px;
    padding: 16px 20px;
  }
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: linear-gradient(135deg, rgba(57, 112, 104, 0.3) 0%, rgba(77, 179, 167, 0.3) 100%);
  border-radius: 12px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, #397068 0%, #4DB3A7 100%);
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }
  
  ${FeatureCard}:hover & {
    transform: rotate(12deg) scale(1.1);
    box-shadow: 0 0 20px rgba(77, 179, 167, 0.6);
  }
  
  ${FeatureCard}:hover &::before {
    opacity: 1;
  }
`;

const FeatureContent = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
`;

const FeatureTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: white;
  letter-spacing: -0.2px;
  transition: all 0.3s ease;
  
  ${FeatureCard}:hover & {
    color: #4DB3A7;
    transform: translateX(4px);
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FeatureNumber = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(57, 112, 104, 0.4) 0%, rgba(77, 179, 167, 0.4) 100%);
  border: 2px solid rgba(77, 179, 167, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #4DB3A7;
  transition: all 0.4s ease;
  
  ${FeatureCard}:hover & {
    background: linear-gradient(135deg, #397068 0%, #4DB3A7 100%);
    color: white;
    transform: translateY(-50%) scale(1.15) rotate(360deg);
    box-shadow: 0 0 16px rgba(77, 179, 167, 0.8);
  }
`;


const VolumeButton = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  right: 30px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: #397068;
    border-color: rgba(255, 255, 255, 0.6);
    transform: scale(1.1);
  }
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
  padding: 50px 0px;
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
    e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(
      e.target.alt || "Image"
    )}`;
    e.target.style.objectFit = "contain";
    e.target.style.backgroundColor = "#f0f0f0";
  },
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

/* ================= Department Section Styles ================= */
const DepartmentContainer = styled.div`
  padding: 50px 20px;
  background: linear-gradient(135deg, #000 0%, #1a0000 100%);
  color: white;
  font-family: "Arial", sans-serif;
  text-align: center;
`;

const DepartmentTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const DepartmentGrid = styled.div`
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const DepartmentCard = styled(motion.div)`
  position: relative;
  width: 380px;
  height: 220px;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  background-color: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease-in-out;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: #397068;
    box-shadow: 0px 15px 40px rgba(24, 79, 81, 0.5);
  }
`;

const DepartmentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 0.3s ease;
  
  ${DepartmentCard}:hover & {
    transform: scale(1.02);
  }
`;

const DepartmentOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  color: white;
  transform: translateY(0);
  transition: all 0.3s ease;
`;

const DepartmentName = styled.h3`
  font-size: 20px;
  margin: 0;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
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

const coursesData = [
  {
    id: "1",
    title: "AR/VR COURSES",
    tag: "New / Free",
    img: `${import.meta.env.BASE_URL}AR.jpeg`,
  },
  {
    id: "2",
    title: "Machine Learning",
    tag: "Everybody",
    img: `${import.meta.env.BASE_URL}Machine_LEARNING.jpeg`,
  },
  {
    id: "3",
    title: "AI Tutorial",
    tag: "Simplilearn",
    img: `${import.meta.env.BASE_URL}AI.jpeg`,
  },
  {
    id: "4",
    title: "Java",
    tag: "Pay per view",
    img: `${import.meta.env.BASE_URL}java.png`,
  },
];

const artsData = [
  {
    id: 1,
    title: "Entrepreneurship AND Startup",
    img: `${import.meta.env.BASE_URL}A1.png`,
    videoId: "fmycIrIn9Pk",
  },
  {
    id: 2,
    title: "Sources of Business Ideas",
    img: `${import.meta.env.BASE_URL}A2.png`,
    videoId: "9kMY1Amf1CA",
  },
  { id: 3, title: "Literature", img: `${import.meta.env.BASE_URL}A3.png` },
  { id: 4, title: "Sociology", img: `${import.meta.env.BASE_URL}A4.png` },
];

const extraData = [
  {
    id: 1,
    title: "B.Tech Automobile",
    tag: "Engineering",
    img: `${import.meta.env.BASE_URL}C1.jpeg`,
    videoId: "C2ZFWaHOAaQ",
    desc: "Explore the world of automotive engineering with cutting-edge technology and hands-on learning experiences.",
  },
  {
    id: 2,
    title: "MBA Programs",
    tag: "Business",
    img: `${import.meta.env.BASE_URL}C2.jpeg`,
    videoId: "FFbCjEAestA",
    desc: "Transform your career with our comprehensive MBA programs designed for future business leaders.",
  },
  {
    id: 3,
    title: "Psychology",
    tag: "Behavioral Science",
    img: `${import.meta.env.BASE_URL}C3.jpeg`,
    videoId: "_bFV-saB2Uk",
    desc: "Understand human behavior and mental processes through our advanced psychology curriculum.",
  },
  {
    id: 4,
    title: "Mass Comm.",
    tag: "Media",
    img: `${import.meta.env.BASE_URL}C4.jpeg`,
    videoId: "XOZhYijcVBY",
    desc: "Master the art of communication and media with our industry-focused mass communication program.",
  },
];

const departmentData = [
  {
    id: 1,
    name: "School of Engineering",
    img: `${import.meta.env.BASE_URL}Department1.jpg`,
  },
  {
    id: 2,
    name: "School of Law",
    img: `${import.meta.env.BASE_URL}Department2.jpg`,
  },
  {
    id: 3,
    name: "School of Education and Humanities",
    img: `${import.meta.env.BASE_URL}Department3.jpg`,
  },
  {
    id: 4,
    name: "School of Management & Commerce",
    img: `${import.meta.env.BASE_URL}Department4.jpg`,
  },
  {
    id: 5,
    name: "School of Sciences",
    img: `${import.meta.env.BASE_URL}Department5.jpg`,
  },
];

/* ================= Motion Variants ================= */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, when: "beforeChildren" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: -40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const MotionCoursesGrid = motion(CoursesGrid);
const MotionArtsGrid = motion(ArtsGrid);
const MotionExtraGrid = motion(ExtraGrid);
const MotionDepartmentGrid = motion(DepartmentGrid);

/* ================= Components ================= */
const HeroVideo = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = React.useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const features = [
    { icon: "🎯", title: "Interactive Learning" },
    { icon: "🚀", title: "Industry-Aligned Curriculum" },
    { icon: "👨‍🎓", title: "Expert Instructors" },
    { icon: "📱", title: "Learn Anytime, Anywhere" },
    { icon: "🏆", title: "Recognized Certifications" }
  ];

  // Generate particles
  const particles = React.useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 100,
      color: i % 3 === 0 
        ? 'rgba(77, 179, 167, 0.6)' 
        : i % 3 === 1 
        ? 'rgba(57, 112, 104, 0.5)' 
        : 'rgba(255, 255, 255, 0.3)'
    }));
  }, []);

  return (
    <VideoContainer>
      {/* Animated Background */}
      <AnimatedBackground>
        {particles.map((particle) => (
          <FloatingParticle
            key={particle.id}
            size={particle.size}
            left={particle.left}
            duration={particle.duration}
            delay={particle.delay}
            drift={particle.drift}
            color={particle.color}
          />
        ))}
      </AnimatedBackground>
      
      {/* Left Section - Why Choose Edutainment */}
      <WhyChooseSection>
        <WhyTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Why Choose Edutainment?
        </WhyTitle>
        
        <motion.div>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                delay: 0.3 + index * 0.12, 
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureContent>
                <FeatureTitle>{feature.title}</FeatureTitle>
              </FeatureContent>
              <FeatureNumber>{index + 1}</FeatureNumber>
            </FeatureCard>
          ))}
        </motion.div>
      </WhyChooseSection>
      
      {/* Right Section - Video */}
      <VideoWrapper onClick={toggleMute}>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{ width: '100%', height: '100%' }}
        >
        <VideoElement
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={`${import.meta.env.BASE_URL}Home.MP4`} type="video/mp4" />
          Your browser does not support the video tag.
        </VideoElement>
        <VideoOverlay />
        
        <VolumeButton
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMuted ? (
            <VolumeX size={28} color="white" />
          ) : (
            <Volume2 size={28} color="white" />
          )}
        </VolumeButton>
        </motion.div>
      </VideoWrapper>
    </VideoContainer>
  );
};

// ============ CHANGE 2: UPDATED THIS COMPONENT TO USE THE WRAPPER ============
const CareerSection = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCareerClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    window.open("https://apply.manavrachna.edu.in/mru", "_blank");
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
      <CareerContainer
        onClick={handleCareerClick}
        style={{ cursor: "pointer" }}
      >
        <CareerBanner
          src={`${import.meta.env.BASE_URL}carrer.png`}
          alt="Career Banner"
          style={{ width: "100%", height: "auto" }}
        />
      </CareerContainer>

      {/* Custom Modal */}
      {showModal && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#000000",
              borderRadius: "24px",
              overflow: "hidden",
              width: "100%",
              maxWidth: "420px",
              boxShadow: "0 10px 30px rgba(255, 0, 0, 0.3)",
              fontFamily: "Arial, sans-serif",
              border: "1px solid #FF0000",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #397068, #274E48)",
                color: "white",
                padding: "20px",
                textAlign: "center",
                position: "relative",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16H12.01"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Confirmation
              </h3>
              <button
                onClick={handleCancel}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: "rgba(0, 0, 0, 0.3)",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "30px 25px" }}>
              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  margin: "0 0 25px",
                  textAlign: "center",
                }}
              >
                Are you sure you want to be redirected to Manav Rachna
                University application page?
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={handleCancel}
                  style={{
                    padding: "12px 28px",
                    borderRadius: "8px",
                    border: "1px solid #397068",
                    background: "#000000",
                    color: "#FFFFFF",
                    fontSize: "15px",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#1a1a1a";
                    e.target.style.color = "#397068";
                    e.target.style.borderColor = "#397068";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#000000";
                    e.target.style.color = "#397068";
                    e.target.style.borderColor = "#397068";
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  style={{
                    padding: "12px 28px",
                    borderRadius: "8px",
                    border: "none",
                    background: "linear-gradient(135deg, #397068, #274E48)",
                    color: "#FFFFFF",
                    fontSize: "15px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    minWidth: "120px",
                  }}
                  onMouseOver={(e) => (e.target.style.opacity = "0.9")}
                  onMouseOut={(e) => (e.target.style.opacity = "1")}
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
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5001/api/v1"
        }/videos/courses`
      );
      const data = await response.json();

      if (response.ok) {
        console.log("✅ Courses fetched from API:", data.data);

        // Debug: Log first course structure
        if (data.data && data.data.length > 0) {
          console.log("First course structure:", {
            title: data.data[0].title,
            img: data.data[0].img,
            thumbnailUrl: data.data[0].thumbnailUrl,
            backgroundImage: data.data[0].backgroundImage,
          });
        }

        // If API returns empty array or no data, use fallback
        if (data.data && data.data.length > 0) {
          setCourses(data.data);
        } else {
          console.log("⚠️ API returned empty data, using fallback");
          setCourses(coursesData);
        }
      } else {
        console.log("⚠️ API failed, using fallback data");
        // Fallback to hardcoded data if API fails
        setCourses(coursesData);
      }
    } catch (error) {
      console.error("❌ Error fetching courses:", error);
      console.log("⚠️ Using fallback hardcoded data");
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
      <SectionTitle className="text-center">Trending Courses</SectionTitle>
      <MotionCoursesGrid
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {courses.slice(0, 4).map((course, index) => (
          <CourseCard
            key={course._id || course.id}
            variants={cardVariant}
            whileHover={{
              scale: 1.08,
              rotateX: -5,
              rotateY: 5,
              boxShadow: "0px 20px 40px rgba(39, 78, 72, 1)",
            }}
            onClick={() => handleCourseClick(course._id || course.id)}
            style={{ cursor: "pointer" }}
          >
            <Rank>{index + 1}</Rank>
            <CardImage
              src={
                course.thumbnailUrl?.startsWith("http")
                  ? course.thumbnailUrl
                  : course.thumbnailUrl
                  ? `${import.meta.env.BASE_URL}${course.thumbnailUrl.replace(
                      /^\//,
                      ""
                    )}`
                  : course.img?.startsWith("http")
                  ? course.img
                  : course.img
                  ? `${import.meta.env.BASE_URL}${course.img.replace(
                      /^\//,
                      ""
                    )}`
                  : `${import.meta.env.BASE_URL}course${index + 1}.png`
              }
              alt={course.title}
            />
            <CardOverlay>
              <CardTitle>{course.title}</CardTitle>
              {course.facultyName && (
                <p className="text-sm text-gray-300 mt-1">
                  {course.facultyName}
                </p>
              )}
              {course.rating && (
                <p className="text-sm text-yellow-400 mt-1">
                  ⭐ {course.rating.toFixed(1)}
                </p>
              )}
            </CardOverlay>
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
      <MotionArtsGrid
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {artsData.map((item) => (
          <ArtsCard
            key={item.id}
            variants={cardVariant}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: "0px 15px 30px rgba(39, 78, 72, 1",
            }}
            onClick={() =>
              item.videoId && handlePlayVideo(item.videoId, item.title)
            }
            style={{ cursor: item.videoId ? "pointer" : "default" }}
          >
            <ArtsImage src={item.img} alt={item.title} />
            {item.videoId && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "rgba(0, 0, 0, 0.7)",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                }}
              >
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
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setIsPlaying(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "white",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
          <h3 style={{ color: "white", marginBottom: "20px" }}>
            {currentVideo.title}
          </h3>
          <iframe
            width="80%"
            height="70%"
            src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1`}
            title={currentVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(255, 0, 0, 0.5)",
            }}
          ></iframe>
        </div>
      )}
    </ArtsContainer>
  );
};

/* ================= Department Section Component ================= */
const DepartmentSection = () => {
  const deptNameMap = {
    "School of Engineering": "Engineering",
    "School of Sciences": "Science",
    "School of Law": "Law",
    "School of Management & Commerce": "Management & Commerce",
    "School of Education and Humanities": "Education & Humanities",
  };
  const navigate = useNavigate();
  const handleDepartmentClick = (deptName) => {
    // Navigate to courses page and pass the department name
    const mappedName = deptNameMap[deptName] || deptName;
    navigate(`/courses?department=${encodeURIComponent(mappedName)}`);
  };
  return (
    <DepartmentContainer>
      <DepartmentTitle>Our Departments</DepartmentTitle>
      <MotionDepartmentGrid
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {departmentData.map((dept) => (
          <DepartmentCard
            key={dept.id}
            variants={cardVariant}
            whileHover={{
              scale: 1.08,
              y: -8,
              rotateY: 5,
              boxShadow: "0px 20px 40px #274E48",
              borderColor: "#397068",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            onClick={() => handleDepartmentClick(dept.name)}
          >
            <DepartmentImage src={dept.img} alt={dept.name} />
            <DepartmentOverlay>
              <DepartmentName>{dept.name}</DepartmentName>
            </DepartmentOverlay>
          </DepartmentCard>
        ))}
      </MotionDepartmentGrid>
    </DepartmentContainer>
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
        // ✅ Mini-Screen Video Player (like Arts section)
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-4 right-4 bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:bg-white/30 transition"
          >
            ×
          </button>

          <div className="flex flex-col items-center gap-4">
            <h3 className="text-white text-xl font-semibold">
              {activeProgram.title}
            </h3>
            <iframe
              src={`https://www.youtube.com/embed/${activeProgram.videoId}?autoplay=1`}
              title={activeProgram.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-[90vw] h-[70vh] max-w-5xl rounded-lg shadow-[0_0_25px_rgba(255,0,0,0.5)]"
            ></iframe>
          </div>
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
          <ExtraSectionTitle className="text-center">
            Programs Offered
          </ExtraSectionTitle>
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
                  boxShadow: "0 0 25px 8px #274E48", // Glow
                  border: "3px solid #397068",
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
      <HeroVideo />
      <CareerSection />
      <DepartmentSection />
      <CoursesSection />
      <ArtsSection />
      <ExtraSection />
    </>
  );
};

export default HomePage;
