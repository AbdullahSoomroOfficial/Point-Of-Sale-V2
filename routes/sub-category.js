const express = require("express");
const { isLoggedIn, validateSubCategory } = require("../middleware");
// controller
const subCategoryController = require("../controllers/sub-category");
const subCategoryRouter = express.Router();

subCategoryRouter.get("/", isLoggedIn, subCategoryController.get);
subCategoryRouter.post(
  "/",
  isLoggedIn,
  validateSubCategory,
  subCategoryController.post
);
subCategoryRouter.get(
  "/manage",
  isLoggedIn,
  subCategoryController.manageSubCategory
);
subCategoryRouter.get("/:id", isLoggedIn, subCategoryController.getSubCategory);
subCategoryRouter.put(
  "/:id",
  isLoggedIn,
  subCategoryController.updateSubCategory
);
subCategoryRouter.delete(
  "/:id",
  isLoggedIn,
  subCategoryController.deleteSubCategory
);

module.exports = subCategoryRouter;
