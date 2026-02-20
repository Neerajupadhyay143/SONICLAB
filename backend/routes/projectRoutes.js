import express from "express";
import { createProjects, getProjects } from "../controllers/ProjectController.js";
import { verifyToken } from "../controllers/Auth/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createProjects);
router.get('/', verifyToken, getProjects);
export default router;
