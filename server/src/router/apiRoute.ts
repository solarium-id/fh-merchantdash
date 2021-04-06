import express from "express";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { GetApiController } from "../controllers/apiController";
import {
  GetAllCategory,
  GetOneCategory,
} from "../controllers/category/GetCategoryController";
import { PostCategory } from "../controllers/category/PostCategoryController";
import { PatchCategory } from "../controllers/category/PatchCategoryController";

const router = express.Router();

// Middleware that is specific to this router
router.use(verifyTokenMiddleware);

// Get Router
router.get("/", GetApiController);
router.get("/category", GetAllCategory);
router.get("/category/:id", GetOneCategory);
router.post("/category", PostCategory);
router.patch("/category/:id", PatchCategory);

// Post Router

// Put & Patch Router

// Delete Router

export { router as apiRoutes };
