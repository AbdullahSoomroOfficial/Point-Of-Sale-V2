const express = require("express");
const { isLoggedIn, validateItem } = require("../middleware");
// controller
const itemController = require("../controllers/item");
const itemRouter = express.Router();

itemRouter.get("/", isLoggedIn, itemController.get);
itemRouter.post("/", isLoggedIn, validateItem, itemController.post);
itemRouter.get("/manage", isLoggedIn, itemController.manageItem);
itemRouter.get("/:id", isLoggedIn, itemController.getItem);
itemRouter.put("/:id", isLoggedIn, itemController.updateItem);
itemRouter.delete("/:id", isLoggedIn, itemController.deleteItem);

module.exports = itemRouter;
