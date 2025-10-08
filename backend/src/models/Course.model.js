import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  duration: { type: Number }, // in seconds
  order: { type: Number, default: 0 },
  isPreview: { type: Boolean, default: false }, // Free preview video
}, { timestamps: true });

const questionSchema = new Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true, validate: v => Array.isArray(v) && v.length >= 2 },
  correctIndex: { type: Number, required: true },
}, { _id: true });

const quizSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: { type: [questionSchema], default: [] },
  points: { type: Number, default: 20 },
}, { timestamps: true });

const chapterSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 },
  videos: [videoSchema],
  quizzes: { type: [quizSchema], default: [] },
}, { timestamps: true });

const progressSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  completedVideoIds: { type: [Schema.Types.ObjectId], default: [] },
  completedQuizIds: { type: [Schema.Types.ObjectId], default: [] },
  points: { type: Number, default: 0 },
}, { timestamps: true });

const courseSchema = new Schema(
  {
    facultyName: { type: String, required: true }, 
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    thumbnailUrl: { type: String,required:true }, // Course thumbnail
    backgroundImage: { type: String }, // Background image for course detail page
    department: { type: String, enum: ["Engineering", "Science", "Law","Management & Commerce","Education & Humanities"], default: "Engineering" ,required:true},
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    duration: { type: Number, default: 0 }, // Total duration in minutes
    price: { type: Number, default: 0 }, // Course price
    isPublished: { type: Boolean, default: false },
    chapters: [chapterSchema],
    enrolledStudents: [{ type: Schema.Types.ObjectId, ref: "User" }],
    rating: { type: Number, default: 0 },
    progress: { type: [progressSchema], default: [] },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
