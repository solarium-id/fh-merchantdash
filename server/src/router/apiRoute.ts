import express from "express";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { GetApiController } from "../controllers/apiController";
// category controllers
import {
  GetAllCategory,
  GetOneCategory,
} from "../controllers/category/GetCategoryController";
import { PostCategory } from "../controllers/category/PostCategoryController";
import { PatchCategory } from "../controllers/category/PatchCategoryController";
import { DeleteCategory } from "../controllers/category/DeleteCategoryController";
// merchant controllers
import {
  GetAllMerchant,
  GetOneMerchant,
} from "../controllers/merchant/GetMerchantController";
import { PostMerchant } from "../controllers/merchant/PostMerchantController";
import { PatchMerchant } from "../controllers/merchant/PatchMerchantController";

// init express router
const router = express.Router();

// Middleware that is specific to this router
router.use(verifyTokenMiddleware);
router.get("/", GetApiController);

// CATEGORY API

// Get Route
router.get("/category", GetAllCategory);
router.get("/category/:id", GetOneCategory);
// Post Route
router.post("/category", PostCategory);
// Patch Route
router.patch("/category/:id", PatchCategory);
// Delete Route
router.delete("/category/:id", DeleteCategory);

// MERCHANT API
// Get Route
router.get("/merchant", GetAllMerchant);
router.get("/merchant/:id", GetOneMerchant);
// Post Route
router.post("/merchant", PostMerchant);
// Patch Route
router.patch("/merchant/:id", PatchMerchant);
// Delete Route
router.delete("/merchant/:id", DeleteCategory);

export { router as apiRoutes };
