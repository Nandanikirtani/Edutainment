import { Router } from "express";
import { 
  getUserProfile, 
  updateUserProfile, 
  updateAvatar, 
  removeAvatar 
} from "../controllers/Profile.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// All routes are protected
router.use(verifyJWT);

// Profile routes
router.route("/").get(getUserProfile);
router.route("/update").patch(updateUserProfile);
router.route("/avatar").patch(upload.single("avatar"), updateAvatar);
router.route("/avatar/remove").patch(removeAvatar);

export default router;