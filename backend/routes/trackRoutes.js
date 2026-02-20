import express from "express";
import { uploadAudio } from "../middleware/upload";
import { uploadTrack } from "../controllers/trackController";
const router = express.Router();

router.post('/upload', uploadAudio.single('audio'), uploadTrack);