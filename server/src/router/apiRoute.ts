import express from "express";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { GetApiController } from "../controllers/apiController";

const router = express.Router();

// Middleware that is specific to this router
router.use(verifyTokenMiddleware);

// Get Router
router.get("/", GetApiController);

// Post Router

// Put & Patch Router

// Delete Router

export { router as apiRoutes };
