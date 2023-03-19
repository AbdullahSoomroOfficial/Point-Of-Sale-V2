const express = require("express");
const { isLoggedIn } = require("../middleware");
// controller
const dashboardController = require("../controllers/dashboard");
const dashboardRouter = express.Router();

dashboardRouter.get("/", isLoggedIn, dashboardController.get);
module.exports = dashboardRouter;
