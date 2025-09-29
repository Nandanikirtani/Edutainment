import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    facultyId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String }, // Optional thumbnail for the course video
    // You can add more fields here like duration, category, etc.
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
