const Item = require("../models/item");
const Order = require("../models/order");
const orderController = {
  // Take Order [Render Form To Take Order]
  get: async function (req, res) {
    try {
      const items = await Item.find().populate(["category", "sub-category"]);
      res.render("order/show", {
        title: "Take Order",
        heading: "Take Order",
        page_name: "order",
        items: items,
        // backData: null
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Add order [generate slip]
  post: async function (req, res) {
    try {
      // checking if backData comes or not
      // if (!req.body.backData) {
      const orderData = req.body;
      const itemsObject = orderData.items;
      const itemsArray = [];
      for (const item of Object.keys(itemsObject)) {
        //getting item name for fetching price from database
        const itemName = itemsObject[item].itemName;
        const result = await Item.findOne({ item: itemName });
        itemsObject[item].price = result.price;
        itemsArray.push(itemsObject[item]);
      }
      orderData.items = itemsArray;
      orderData.orderStatus = "pending";
      const hiddenData = orderData.hiddenData;
      delete orderData.hiddenData;
      res.render("receipt/show", { orderData, hiddenData });
    } catch (error) {
      console.log(error.message);
    }
  },
  //To print receipt and save order to database
  printReceipt: async function (req, res) {
    try {
      // parsing data from hidden field from receipt
      // this is from print button
      const orderData = JSON.parse(req.body.orderData);
      const order = new Order(orderData);
      await order.save();
      req.flash("success", "Order Saved Successfully!");
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  },
  //order back
  orderBack: function (req, res) {
    try {
      const { backData } = req.body;
      // console.log(backData);
      res.render("order/back", {
        backData,
        title: null,
        heading: null,
        page_name: null,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  //Delivered order
  orderDelivered: async function (req, res) {
    try {
      const { id } = req.params;
      await Order.findByIdAndUpdate(id, { orderStatus: "dilevered" })
        .then(() => {
          const message = "Order Completed!";
          req.flash("success", message);
          res.redirect("/dashboard");
        })
        .catch((e) => {
          if (e) {
            const message = e.message;
            req.flash("error", message);
            res.redirect("/dashboard");
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  },
  //Cancel order
  cancelOrder: async function (req, res) {
    try {
      const { id } = req.params;
      await Order.findByIdAndUpdate(id, { orderStatus: "canceled" })
        .then(() => {
          const message = "Order Canceled!";
          req.flash("success", message);
          res.redirect("/dashboard");
        })
        .catch((e) => {
          if (e) {
            const message = e.message;
            req.flash("error", message);
            res.redirect("/dashboard");
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = orderController;
