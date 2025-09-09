// import { Router } from "express";
// import {
//   registerUser,
//   loginUser,
//   logoutUser,
//   refreshAccessToken,
//   getUserProfile,
//   updateUserProfile,
//   changePassword,
// } from "../controllers/User.controller.js";
// import { verifyJWT } from "../middlewares/verifyJWT.js";

// const router = Router();

// // Auth
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/logout", logoutUser);
// router.post("/refresh-token", refreshAccessToken);

// // Profile
// router.get("/profile", verifyJWT, getUserProfile);
// router.put("/profile", verifyJWT, updateUserProfile);

// // Change password
// router.put("/change-password", verifyJWT, changePassword);

// export default router;





// import { Router } from "express";
// import {
//   registerUser,
//   loginUser,
//   logoutUser,
//   refreshAccessToken,
//   getUserProfile,
//   updateUserProfile,
//   changePassword,
//   verifyOtp,   // ✅ New import
// } from "../controllers/User.controller.js";
// import { verifyJWT } from "../middlewares/verifyJWT.js";

// const router = Router();

// // Auth
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/verify-otp", verifyOtp);   // ✅ New route for OTP verify
// router.post("/logout", logoutUser);
// router.post("/refresh-token", refreshAccessToken);

// // Profile
// router.get("/profile", verifyJWT, getUserProfile);
// router.put("/profile", verifyJWT, updateUserProfile);

// // Change password
// router.put("/change-password", verifyJWT, changePassword);

// export default router;





// import { Router } from "express";
// import {
//   registerUser,
//   loginUser,
//   logoutUser,
//   refreshAccessToken,
//   getUserProfile,
//   updateUserProfile,
//   changePassword,
//   verifyOtp,
// } from "../controllers/User.controller.js";
// import { verifyJWT } from "../middlewares/verifyJWT.js";

// const router = Router();

// // ----------------- Register -----------------
// router.post("/register", registerUser);

// // ----------------- Login with OTP (role based) -----------------
// router.post("/login/student", (req, res, next) => {
//   req.body.role = "student"; // force role
//   loginUser(req, res, next);
// });

// router.post("/login/teacher", (req, res, next) => {
//   req.body.role = "teacher"; // force role
//   loginUser(req, res, next);
// });

// router.post("/login/admin", (req, res, next) => {
//   req.body.role = "admin"; // force role
//   loginUser(req, res, next);
// });

// // ----------------- Verify OTP -----------------
// router.post("/verify-otp", verifyOtp);

// // ----------------- Logout -----------------
// router.post("/logout", logoutUser);

// // ----------------- Refresh Token -----------------
// router.post("/refresh-token", refreshAccessToken);

// // ----------------- Profile -----------------
// router.get("/profile", verifyJWT, getUserProfile);
// router.put("/profile", verifyJWT, updateUserProfile);

// // ----------------- Change password -----------------
// router.put("/change-password", verifyJWT, changePassword);

// export default router;











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
