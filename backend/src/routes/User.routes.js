import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../controllers/User.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshAccessToken);

// Profile
router.get("/profile", verifyJWT, getUserProfile);
router.put("/profile", verifyJWT, updateUserProfile);

// Change password
router.put("/change-password", verifyJWT, changePassword);

export default router;
