const express = require("express");
// controller
const loginController = require("../controllers/login");
const loginRouter = express.Router();

loginRouter.get("/", loginController.get);
loginRouter.post("/", loginController.post);

module.exports = loginRouter;
