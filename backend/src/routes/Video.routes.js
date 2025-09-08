import express from "express";
import multer from "multer";
import fs from "fs";
import { uploadVideo } from "../controllers/Video.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Route with JWT authentication + file upload
router.post("/upload", verifyJWT, upload.single("video"), uploadVideo);

export default router;  