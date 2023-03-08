import { Router } from "express";
import { createUser, login, logout } from "../controllers/index.js";
const router = Router();
router.post("/signup", createUser);
router.post("/signin", login);
router.post("/signout", logout);
export default router;
