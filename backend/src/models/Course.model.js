import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  duration: { type: Number }, // in seconds
  order: { type: Number, default: 0 },
  isPreview: { type: Boolean, default: false }, // Free preview video
}, { timestamps: true });

const chapterSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 },
  videos: [videoSchema],
}, { timestamps: true });

const courseSchema = new Schema(
  {
    facultyId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    thumbnailUrl: { type: String }, // Course thumbnail
    backgroundImage: { type: String }, // Background image for course detail page
    category: { type: String, default: "General" },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    duration: { type: Number, default: 0 }, // Total duration in minutes
    price: { type: Number, default: 0 }, // Course price
    isPublished: { type: Boolean, default: false },
    chapters: [chapterSchema],
    enrolledStudents: [{ type: Schema.Types.ObjectId, ref: "User" }],
    rating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
