import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

router.get("/signup", authController.showSignup);
router.post("/signup", authController.signup);
router.get("/login", authController.showLogin);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;