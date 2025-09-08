import mongoose, { Schema } from "mongoose";

const pendingVideoSchema = new Schema(
  {
    facultyId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export const PendingVideo = mongoose.model("PendingVideo", pendingVideoSchema);
