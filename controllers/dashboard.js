const Order = require("../models/order");
const dashboardController = {
  get: async function (req, res) {
    try {
      const pendingOrders = await Order.find().where({
        orderStatus: "pending",
      });
      res.render("dashboard", {
        title: "Dashboard",
        heading: "Dashboard",
        page_name: "dashboard",
        pendingOrders: pendingOrders,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = dashboardController;
