import { Router } from "express";
import { getUserCredits, getUserProjects } from "../controllers/userController";
import { protect } from "../middlewares/auth";

const router = Router();

router.get("/credits", protect, getUserCredits);
router.get("/projects", protect, getUserProjects);

export default router;
