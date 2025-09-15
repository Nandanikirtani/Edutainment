import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/User.routes.js";
import videoRouter from "./routes/Video.routes.js";


import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  req.setTimeout(10 * 60 * 1000); // 10 minutes
  res.setTimeout(10 * 60 * 1000);
  next();
});


// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/videos", videoRouter);


// Health check
app.get("/", (req, res) => res.send("Backend running!"));

// ✅ Global Error Handler (last me hona chahiye)
app.use(errorHandler);

// Start server after DB connect
connectDb()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on PORT: ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection failed:", err));

 