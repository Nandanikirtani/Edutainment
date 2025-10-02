import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// ✅ Routes
import userRoutes from "./routes/User.routes.js";
import videoRoutes from "./routes/Video.routes.js";

// ✅ Middlewares
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

// ✅ Connect MongoDB first
connectDb();

const app = express();

// ✅ Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",") // supports multiple origins
      : ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "1gb" }));
app.use(express.urlencoded({ limit: "1gb", extended: true }));

app.use(cookieParser());

// ✅ Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/videos", videoRoutes);

// ✅ Health check
app.get("/", (req, res) => res.send("✅ Backend running!"));

// ✅ Global Error Handler
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`🚀 Server running on http://localhost:${PORT}`)
// );

app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`)
);


