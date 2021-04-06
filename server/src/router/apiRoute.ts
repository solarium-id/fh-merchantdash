import express from "express";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { GetApiController } from "../controllers/apiController";
import {
  GetAllCategory,
  GetOneCategory,
} from "../controllers/category/GetCategoryController";
import { PostCategory } from "../controllers/category/PostCategoryController";

const router = express.Router();

// Middleware that is specific to this router
router.use(verifyTokenMiddleware);

// Get Router
router.get("/", GetApiController);
router.get("/category", GetAllCategory);
router.get("/category/:id", GetOneCategory);
router.post("/category", PostCategory);

// Post Router

// Put & Patch Router

// Delete Router

export { router as apiRoutes };
