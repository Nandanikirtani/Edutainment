import mongoose from "mongoose";
import { Course } from "../src/models/Course.model.js";
import { User } from "../src/models/User.model.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = "mongodb+srv://jaykumar0305:Jashank123@edu1.lhuqetm.mongodb.net/edtube?retryWrites=true&w=majority";

const sampleCourses = [
  {
    title: "AR/VR COURSES",
    description: "Learn the fundamentals of Augmented Reality and Virtual Reality development. This comprehensive course covers AR/VR technologies, development tools, and hands-on projects to build immersive experiences.",
    category: "Technology",
    level: "Beginner",
    price: 0,
    thumbnailUrl: "https://res.cloudinary.com/dk2idz5gp/image/upload/v1703000000/AR.jpeg",
    backgroundImage: "https://res.cloudinary.com/dk2idz5gp/image/upload/v1703000000/AR.jpeg",
    chapters: [
      {
        title: "Introduction to AR/VR",
        description: "Understanding the basics of Augmented and Virtual Reality",
        order: 0,
        videos: [
          {
            title: "What is AR/VR?",
            description: "Introduction to AR and VR concepts",
            videoUrl: "https://res.cloudinary.com/dk2idz5gp/video/upload/v1703000000/sample_video_1.mp4",
            duration: 300,
            order: 0,
            isPreview: true
          },
          {
            title: "AR vs VR Differences",
            description: "Understanding the key differences between AR and VR",
            videoUrl: "https://res.cloudinary.com/dk2idz5gp/video/upload/v1703000000/sample_video_2.mp4",
            duration: 450,
            order: 1,
            isPreview: false
          }
        ]
      },
      {
        title: "Development Tools",
        description: "Essential tools for AR/VR development",
        order: 1,
        videos: [
          {
            title: "Unity for AR/VR",
            description: "Getting started with Unity for AR/VR development",
            videoUrl: "https://res.cloudinary.com/dk2idz5gp/video/upload/v1703000000/sample_video_3.mp4",
            duration: 600,
            order: 0,
            isPreview: false
          }
        ]
      }
    ]
  },
  {
    title: "Machine Learning",
    description: "Master Machine Learning algorithms and techniques. From basic concepts to advanced implementations, this course covers everything you need to become a Machine Learning expert.",
    category: "AI/ML",
    level: "Intermediate",
    price: 99,
    thumbnailUrl: "https://res.cloudinary.com/dk2idz5gp/image/upload/v1703000000/Machine_LEARNING.jpeg",
    backgroundImage: "https://res.cloudinary.com/dk2idz5gp/image/upload/v1703000000/Machine_LEARNING.jpeg",
    chapters: [
      {
        title: "ML Fundamentals",
        description: "Core concepts of Machine Learning",
        order: 0,
        videos: [
          {
            title: "Introduction to ML",
            description: "What is Machine Learning and why it matters",
            videoUrl: "https://res.cloudinary.com/dk2idz5gp/video/upload/v1703000000/sample_video_4.mp4",
            duration: 400,
            order: 0,
            isPreview: true
          },
          {
            title: "Types of Learning",
            description: "Supervised, Unsupervised, and Reinforcement Learning",
            videoUrl: "https://res.cloudinary.com/dk2idz5gp/video/upload/v1703000000/sample_video_5.mp4",
            duration: 500,
            order: 1,
            isPreview: false
          }
        ]
      },
      {
        title: "Algorithms Deep Dive",
        description: "Understanding various ML algorithms",
        order: 1,
        videos: [
          {
            title: "Linear Regression",
            description: "Understanding and implementing Linear Regression",
            videoUrl: "https://res.cloudinary.com/dk2idz5gp/video/upload/v1703000000/sample_video_6.mp4",
            duration: 700,
            order: 0,
            isPreview: false
          }
        ]
      }
    ]
  },
  {
    title: "AI Tutorial",
    description: "Comprehensive Artificial Intelligence course covering AI fundamentals, neural networks, deep learning, and practical AI applications. Perfect for beginners and intermediate learners.",
    category: "AI/ML",
    level: "Beginner",
    price: 149,
    thumbnailUrl: "https://res.cloudinary.com/dk2idz5gp/image/upload/v1703000000/AI.jpeg",
    backgroundImage: "https://res.cloudinary.com/dk2idz5gp/image/upload/v1703000000/AI.jpeg",
    chapters: [
      {
        title: "AI Basics",
        description: "Introduction to Artificial Intelligence",
        order: 0,
        videos: [
          {
            title: "What is AI?",
            description: "Understanding Artificial Intelligence",
            videoUrl: "https://res.cloudinary.com/dk2idz5gp/video/upload/v1703000000/sample_video_7.mp4",
            duration: 350,
            order: 0,
            isPreview: true
          },
          {
            title: "AI History",
            description: "The evolution of Artificial Intelligence",
            videoUrl: "https://res.cloudinary.com/dk2idz5gp/video/upload/v1703000000/sample_video_8.mp4",
            duration: 400,
            order: 1,
            isPreview: false
          }
        ]
      },
      {
        title: "Neural Networks",
        description: "Understanding Neural Networks",
        order: 1,
        videos: [
          {
            title: "Introduction to Neural Networks",
            description: "How neural networks work",
            videoUrl: "https://res.cloudinary.com/dk2idz5gp/video/upload/v1703000000/sample_video_9.mp4",
            duration: 600,
            order: 0,
            isPreview: false
          }
        ]
      }
    ]
  },
  {
    title: "Java Programming",
    description: "Master Java programming from basics to advanced concepts. Learn object-oriented programming, data structures, algorithms, and build real-world applications with Java.",
    category: "Programming",
    level: "Beginner",
    price: 79,
    thumbnailUrl: "https://res.cloudinary.com/dk2idz5gp/image/upload/v1703000000/java.png",
    backgroundImage: "https://res.cloudinary.com/dk2idz5gp/image/upload/v1703000000/java.png",
    chapters: [
      {
        title: "Java Fundamentals",
        description: "Core Java concepts and syntax",
        order: 0,
        videos: [
          {
            title: "Java Introduction",
            description: "Getting started with Java programming",
            videoUrl: "https://res.cloudinary.com/dk2idz5gp/video/upload/v1703000000/sample_video_10.mp4",
            duration: 300,
            order: 0,
            isPreview: true
          },
          {
            title: "Variables and Data Types",
            description: "Understanding Java variables and data types",
            videoUrl: "https://res.cloudinary.com/dk2idz5gp/video/upload/v1703000000/sample_video_11.mp4",
            duration: 450,
            order: 1,
            isPreview: false
          }
        ]
      },
      {
        title: "Object-Oriented Programming",
        description: "OOP concepts in Java",
        order: 1,
        videos: [
          {
            title: "Classes and Objects",
            description: "Understanding classes and objects in Java",
            videoUrl: "https://res.cloudinary.com/dk2idz5gp/video/upload/v1703000000/sample_video_12.mp4",
            duration: 550,
            order: 0,
            isPreview: false
          }
        ]
      }
    ]
  }
];

async function addSampleCourses() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      dbName: "edtube",
    });
    console.log("✅ Connected to MongoDB");

    // Find or create an admin user
    let adminUser = await User.findOne({ role: "admin" });
    if (!adminUser) {
      console.log("Creating admin user...");
      adminUser = await User.create({
        fullName: "Admin User",
        email: "admin@edutainment.com",
        password: "admin123",
        role: "admin",
        isVerified: true
      });
    }

    // Clear existing courses
    await Course.deleteMany({});
    console.log("🗑️ Cleared existing courses");

    // Add sample courses
    for (const courseData of sampleCourses) {
      const course = await Course.create({
        ...courseData,
        facultyId: adminUser._id,
        duration: courseData.chapters.reduce((total, chapter) => 
          total + chapter.videos.reduce((chapterTotal, video) => chapterTotal + video.duration, 0), 0
        ) / 60, // Convert to minutes
        isPublished: true,
        enrolledStudents: [],
        rating: 4.5,
        totalRatings: 120
      });
      console.log(`✅ Added course: ${course.title}`);
    }

    console.log("🎉 All sample courses added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding sample courses:", error);
    process.exit(1);
  }
}

addSampleCourses();
