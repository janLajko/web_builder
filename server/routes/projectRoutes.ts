import { Router } from "express";
import {
    generateAIWebsite,
    reviseWebsite,
    rollbackVersion,
    deleteProject,
    getPublicProjects,
    getPreviewCode,
    saveManualUpdate
} from "../controllers/projectController";
import {
    createProject,
    getSingleProject,
    togglePublish
} from "../controllers/userController";
import { protect } from "../middlewares/auth";

const router = Router();

// Public routes
router.get("/public", getPublicProjects);
router.get("/preview/:id", getPreviewCode);

// Protected routes
router.use(protect);
router.post("/", createProject);
router.get("/:id", getSingleProject);
router.patch("/:id/publish", togglePublish);

router.post("/generate", generateAIWebsite);
router.post("/revise", reviseWebsite);
router.post("/save", saveManualUpdate);
router.get("/rollback/:versionId", rollbackVersion);
router.delete("/delete/:id", deleteProject);

export default router;
