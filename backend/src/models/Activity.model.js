import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', default: null },
  // Day bucket in YYYY-MM-DD format for fast grouping
  day: { type: String, required: true, index: true },
  secondsSpent: { type: Number, default: 0 },
}, { timestamps: true });

// Ensure uniqueness per user+day+course to allow atomic increments
activitySchema.index({ userId: 1, day: 1, courseId: 1 }, { unique: true });

export const Activity = mongoose.model('Activity', activitySchema);