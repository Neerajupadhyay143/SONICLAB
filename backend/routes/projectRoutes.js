import express from "express";
import { createProjects, getProjects, deleteProject } from "../controllers/ProjectController.js";
import { verifyToken } from "../controllers/Auth/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createProjects);
router.get('/', verifyToken, getProjects);
router.delete("/:id", verifyToken, deleteProject);
export default router;
