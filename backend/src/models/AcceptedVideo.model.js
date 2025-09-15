import mongoose, { Schema } from "mongoose";

const acceptedVideoSchema = new Schema(
  {
    facultyId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const AcceptedVideo = mongoose.model("AcceptedVideo", acceptedVideoSchema);
