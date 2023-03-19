const express = require("express");
// controller
const dashboardController = require("../controllers/dashboard");
const dashboardRouter = express.Router();

dashboardRouter.get("/", dashboardController.get);
module.exports = dashboardRouter;
