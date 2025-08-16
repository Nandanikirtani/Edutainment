import express from "express";
import { registerUser } from "../controllers/User.controller.js";
import { loginUser } from "../controllers/User.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
