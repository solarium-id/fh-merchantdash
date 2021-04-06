import express from "express";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { GetApiController } from "../controllers/apiController";
import {
  GetAllCategory,
  GetOneCategory,
} from "../controllers/category/GetCategoryController";
import { PostCategory } from "../controllers/category/PostCategoryController";
import { PatchCategory } from "../controllers/category/PatchCategoryController";
import { DeleteCategory } from "../controllers/category/DeleteCategoryController";

const router = express.Router();

// Middleware that is specific to this router
router.use(verifyTokenMiddleware);
router.get("/", GetApiController);

// Get Router
router.get("/category", GetAllCategory);
router.get("/category/:id", GetOneCategory);
// Post Router
router.post("/category", PostCategory);
// Patch Router
router.patch("/category/:id", PatchCategory);
// Delete Router
router.delete("/category/:id", DeleteCategory);

export { router as apiRoutes };
