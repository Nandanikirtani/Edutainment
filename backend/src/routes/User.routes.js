import { Router } from "express";
import {
  sendRegistrationOTP,
  verifyOTPAndRegister,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../controllers/User.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

// ----------------- Register with OTP -----------------
router.post("/send-otp", sendRegistrationOTP);
router.post("/verify-otp", verifyOTPAndRegister);

// ----------------- Login -----------------
router.post("/login", loginUser);

// ----------------- Logout -----------------
router.post("/logout", logoutUser);

// ----------------- Refresh Token -----------------
router.post("/refresh-token", refreshAccessToken);

// ----------------- Profile -----------------
router.get("/profile", verifyJWT, getUserProfile);
router.get("/me", verifyJWT, getUserProfile); // Alias for profile
router.put("/profile", verifyJWT, updateUserProfile);

// ----------------- Change password -----------------
router.put("/change-password", verifyJWT, changePassword);

export default router;
