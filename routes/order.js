const express = require("express");
const { isLoggedIn } = require("../middleware");
// controller
const orderController = require("../controllers/order");
const orderRouter = express.Router();

orderRouter.get("/", isLoggedIn, orderController.get);
orderRouter.post("/", isLoggedIn, orderController.post);
orderRouter.post("/print", isLoggedIn, orderController.printReceipt);
orderRouter.post("/back", orderController.orderBack);
orderRouter.put("/:id", orderController.orderDelivered);
orderRouter.delete("/:id", orderController.cancelOrder);

module.exports = orderRouter;
