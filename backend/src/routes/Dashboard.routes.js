import { Router } from "express";
import { 
  getStudentDashboard,
  getStudentAchievements,
  getStudentSchedule,
  getStudentAnnouncements
} from "../controllers/Dashboard.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

// All routes require authentication
router.use(verifyJWT);

// Student dashboard routes
router.route("/student").get(getStudentDashboard);
router.route("/student/achievements").get(getStudentAchievements);
router.route("/student/schedule").get(getStudentSchedule);
router.route("/student/announcements").get(getStudentAnnouncements);

export default router;