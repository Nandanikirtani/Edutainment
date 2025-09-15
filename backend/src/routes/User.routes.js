
import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getUserProfile,
  updateUserProfile,
  changePassword,
  verifyOtp,
} from "../controllers/User.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

// ----------------- Register -----------------
router.post("/register", registerUser);

// ----------------- Login (single route, auto-detect role) -----------------
router.post("/login", loginUser);

// ----------------- Verify OTP -----------------
router.post("/verify-otp", verifyOtp);

// ----------------- Logout -----------------
router.post("/logout", logoutUser);

// ----------------- Refresh Token -----------------
router.post("/refresh-token", refreshAccessToken);

// ----------------- Profile -----------------
router.get("/profile", verifyJWT, getUserProfile);
router.put("/profile", verifyJWT, updateUserProfile);

// ----------------- Change password -----------------
router.put("/change-password", verifyJWT, changePassword);

export default router;
