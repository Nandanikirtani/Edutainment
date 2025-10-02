import { Router } from "express";

const router = Router();

// Simple test route
router.get("/", (req, res) => {
  res.json({ message: "Test profile route working!" });
});

export default router;