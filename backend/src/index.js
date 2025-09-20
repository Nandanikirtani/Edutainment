// import express from "express";
// import dotenv from "dotenv";
// import connectDb from "./db/index.js";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import userRoutes from "./routes/User.routes.js";
// import videoRoutes from "./routes/Video.routes.js";  // 👈 name fix

// import { errorHandler } from "./middlewares/errorHandler.js";

// dotenv.config();
// const app = express();

// // Middlewares
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/videos", videoRoutes);

// // Health check
// app.get("/", (req, res) => res.send("Backend running!"));

// // Global Error Handler
// app.use(errorHandler);

// // Start server after DB connect
// connectDb()
//   .then(() => {
//     app.listen(process.env.PORT || 5000, () => {
//       console.log(`🚀 Server running on PORT: ${process.env.PORT || 5000}`);
//     });
//   })
//   .catch(err => console.error("❌ MongoDB connection failed:", err));

















// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDb from "./db/index.js";
// import videoRoutes from "./routes/Video.routes.js";

// dotenv.config();
// const app = express();

// app.use(cors({ origin: process.env.CORS_ORIGIN?.split(","), credentials: true }));
// app.use(express.json());

// app.use("/api/v1/videos", videoRoutes);

// app.get("/", (req,res)=>res.send("Backend running!"));

// connectDb().then(() => {
//   app.listen(process.env.PORT || 5000, () => console.log("Server running"));
// });







import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import videoRoutes from "./routes/Video.routes.js";
import cors from "cors";

dotenv.config();

// ✅ MongoDB Connect
connectDb();

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN.split(","), // e.g. ["http://localhost:5173"]
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // cookies / tokens allow
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/v1/videos", videoRoutes);

// ✅ Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
