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
  background: linear-gradient(135deg, #ff0000, #ff4d4d);
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
  { id: 1, url: "1.png" },
  { id: 2, url: "2.png" },
  { id: 3, url: "3.png" },
];

const coursesData = [
  { id: 1, title: "AR/VR COURSES", tag: "New / Free", img: "AR.jpeg" },
  { id: 2, title: "Machine Learning", tag: "Everybody", img: "Machine_LEARNING.jpeg" },
  { id: 3, title: "AI Tutorial", tag: "Simplilearn", img: "AI.jpeg" },
  { id: 4, title: "Java", tag: "Pay per view", img: "java.png" },
];

const artsData = [
  { id: 1, title: "Philosophy", img: "A1.png" },
  { id: 2, title: "History", img: "A2.png" },
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
        />
      </AnimatePresence>
      <Overlay />
      <PlayButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
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
    </SliderContainer>
  );
};

// ============ CHANGE 2: UPDATED THIS COMPONENT TO USE THE WRAPPER ============
const CareerSection = () => {
  return (
    <CareerContainer>
      <CareerBanner src="carrer.png" alt="Career Banner" />
    </CareerContainer>
  );
};

const CoursesSection = () => {
  return (
    <SectionContainer>
      <SectionTitle>Trending Courses</SectionTitle>
      <MotionCoursesGrid variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
        {coursesData.map((course, index) => (
          <CourseCard key={course.id} variants={cardVariant} whileHover={{ scale: 1.08, rotateX: -5, rotateY: 5, boxShadow: "0px 20px 40px rgba(255,0,0,0.5)" }}>
            <Rank>{index + 1}</Rank>
            <CardImage src={course.img} alt={course.title} />
            <CardOverlay>
              <CardTag>{course.tag}</CardTag>
              <CardTitle>{course.title}</CardTitle>
            </CardOverlay>
          </CourseCard>
        ))}
      </MotionCoursesGrid>
    </SectionContainer>
  );
};

const ArtsSection = () => {
  return (
    <ArtsContainer>
      <ArtsTitle>Arts & Humanities</ArtsTitle>
      <MotionArtsGrid variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {artsData.map((item, index) => (
          <ArtsCard key={item.id} variants={cardVariant} whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 15px 30px rgba(0,0,0,0.6)" }}>
            <ArtsImage src={item.img} alt={item.title} />
            <ArtsOverlay>
              <ArtsText>{item.title}</ArtsText>
            </ArtsOverlay>
          </ArtsCard>
        ))}
      </MotionArtsGrid>
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