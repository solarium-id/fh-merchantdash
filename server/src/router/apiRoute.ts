import express from "express";
import { GetTimeMiddleware } from "../middleware/apiMiddleware";
import { GetApiController } from "../controllers/apiController";

const router = express.Router();

// Middleware that is specific to this router
router.use(GetTimeMiddleware);

// Get Router
router.get("/", GetApiController);

// Post Router

// Put & Patch Router

// Delete Router

export { router as apiRoute };
