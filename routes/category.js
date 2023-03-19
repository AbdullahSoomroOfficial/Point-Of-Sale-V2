const express = require("express");
const { isLoggedIn, validateCategory } = require("../middleware");
// controller
const categoryController = require("../controllers/category");
const categoryRouter = express.Router();

categoryRouter.get("/", isLoggedIn, categoryController.get);

categoryRouter.post("/", isLoggedIn, validateCategory, categoryController.post);

categoryRouter.get("/manage", isLoggedIn, categoryController.manageCategory);

categoryRouter.get("/:id", isLoggedIn, categoryController.getCategory);

categoryRouter.put(
  "/:id",
  isLoggedIn,
  validateCategory,
  categoryController.updateCategory
);

categoryRouter.delete("/:id", isLoggedIn, categoryController.deleteCategory);

module.exports = categoryRouter;
