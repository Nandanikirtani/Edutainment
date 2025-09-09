import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/User.routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => res.send("Backend running!"));

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on PORT: ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error("MongoDB connection failed:", err));