import mongoose, { Schema } from "mongoose";

const rejectedVideoSchema = new Schema(
  {
    facultyId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true },
    rejectionReason: { type: String }, // Optional field for rejection reason
  },
  { timestamps: true }
);

export const RejectedVideo = mongoose.model("RejectedVideo", rejectedVideoSchema);
