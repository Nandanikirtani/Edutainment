import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/User.routes.js";
import videoRouter from "./routes/Video.routes.js";
import profileRouter from "./routes/profile.routes.js";
import dashboardRouter from "./routes/Dashboard.routes.js";



const app = express();

const allowedOrigins = process.env.CORS_ORIGIN.split(",");

app.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin (like Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // allow cookies
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

console.log('🔄 Registering routes...');
app.use("/api/v1/user", userRouter);
console.log('✅ User routes registered');
app.use("/api/v1/videos", videoRouter);
console.log('✅ Video routes registered');
app.use("/api/v1/profile", profileRouter);
console.log('✅ Profile routes registered');
app.use("/api/v1/dashboard", dashboardRouter);
console.log('✅ Dashboard routes registered');
app.use("/uploads", express.static("uploads"));
console.log('✅ Static uploads configured');

export { app };