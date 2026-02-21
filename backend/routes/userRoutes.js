import express from "express";
import { verifyToken } from "../controllers/Auth/verifyToken.js";
import { getUser } from "../controllers/getUSer.js";
const router = express.Router();
router.get('/', verifyToken, getUser)

export default router;