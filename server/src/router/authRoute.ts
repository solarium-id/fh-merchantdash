import express from "express";
// import { loginMiddleware } from "../middleware/loginMiddleware";
import loginController from "../controllers/auth/loginController";

const router = express.Router();

router.post("/login", loginController);
// router.post("/logout", logoutController);

export { router as authRoutes };
