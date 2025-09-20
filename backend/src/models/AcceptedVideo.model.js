// import mongoose, { Schema } from "mongoose";

// const acceptedVideoSchema = new Schema(
//   {
//     facultyId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     title: { type: String, required: true },
//     description: { type: String },
//     videoUrl: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export const AcceptedVideo = mongoose.model("AcceptedVideo", acceptedVideoSchema);







// import mongoose, { Schema } from "mongoose";

// const commentSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   text: { type: String, required: true },
// }, { timestamps: true });

// const acceptedVideoSchema = new Schema({
//   facultyId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   title: { type: String, required: true },
//   description: { type: String },
//   videoUrl: { type: String, required: true },
//   accepted: { type: Boolean, default: true },
//   likes: { type: Number, default: 0 },
//   likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
//   comments: [commentSchema],
//   savedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
//   shareCount: { type: Number, default: 0 },
// }, { timestamps: true });

// export const AcceptedVideo = mongoose.model("AcceptedVideo", acceptedVideoSchema);












import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
}, { timestamps: true });

const acceptedVideoSchema = new Schema({
  facultyId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  accepted: { type: Boolean, default: true },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [commentSchema],
  savedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  shareCount: { type: Number, default: 0 },
}, { timestamps: true });

export const AcceptedVideo = mongoose.model("AcceptedVideo", acceptedVideoSchema);
