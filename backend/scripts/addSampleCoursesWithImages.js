import mongoose from "mongoose";
import { Course } from "../src/models/Course.model.js";

// MongoDB connection
const MONGODB_URI = "mongodb+srv://jaykumar0305:Jashank123@edu1.lhuqetm.mongodb.net/edtube?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const addSampleCourses = async () => {
  try {
    // Clear existing courses
    await Course.deleteMany({});
    console.log("🗑️ Cleared existing courses");

    // Sample courses with images
    const sampleCourses = [
      {
        facultyId: "68da0de6d05d2cd205f0e764", // Use existing faculty ID
        title: "AR/VR COURSES",
        description: "Learn Augmented Reality and Virtual Reality development with hands-on projects and real-world applications.",
        thumbnailUrl: "/AR.jpeg",
        backgroundImage: "/AR.jpeg",
        category: "Technology",
        level: "Intermediate",
        duration: 120, // 2 hours
        price: 0, // Free
        isPublished: true,
        chapters: [],
        enrolledStudents: [],
        rating: 4.8,
        totalRatings: 150
      },
      {
        facultyId: "68da0de6d05d2cd205f0e764",
        title: "Machine Learning",
        description: "Master machine learning algorithms, neural networks, and AI applications with Python and TensorFlow.",
        thumbnailUrl: "/Machine_LEARNING.jpeg",
        backgroundImage: "/Machine_LEARNING.jpeg",
        category: "AI/ML",
        level: "Advanced",
        duration: 180, // 3 hours
        price: 299,
        isPublished: true,
        chapters: [],
        enrolledStudents: [],
        rating: 4.9,
        totalRatings: 200
      },
      {
        facultyId: "68da0de6d05d2cd205f0e764",
        title: "AI Tutorial",
        description: "Comprehensive AI course covering artificial intelligence fundamentals, machine learning, and deep learning.",
        thumbnailUrl: "AI.jpeg",
        backgroundImage: "AI.jpeg",
        category: "AI/ML",
        level: "Beginner",
        duration: 150, // 2.5 hours
        price: 199,
        isPublished: true,
        chapters: [],
        enrolledStudents: [],
        rating: 4.7,
        totalRatings: 180
      },
      {
        facultyId: "68da0de6d05d2cd205f0e764",
        title: "Java Programming",
        description: "Learn Java programming from basics to advanced concepts including OOP, collections, and frameworks.",
        thumbnailUrl: "/java.png",
        backgroundImage: "/java.png",
        category: "Programming",
        level: "Beginner",
        duration: 200, // 3.3 hours
        price: 149,
        isPublished: true,
        chapters: [],
        enrolledStudents: [],
        rating: 4.6,
        totalRatings: 120
      }
    ];

    // Add courses to database
    const createdCourses = await Course.insertMany(sampleCourses);
    console.log(`✅ Added ${createdCourses.length} courses to database`);

    // Display course details
    createdCourses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.title}`);
      console.log(`   - ID: ${course._id}`);
      console.log(`   - Thumbnail: ${course.thumbnailUrl}`);
      console.log(`   - Background: ${course.backgroundImage}`);
      console.log(`   - Price: ₹${course.price}`);
      console.log(`   - Level: ${course.level}`);
      console.log("");
    });

  } catch (error) {
    console.error("❌ Error adding courses:", error);
  }
};

const main = async () => {
  await connectDB();
  await addSampleCourses();
  console.log("🎉 Sample courses added successfully!");
  process.exit(0);
};

main();
