const { required } = require("joi");
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerNumber: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    default: null,
  },
  items: {
    type: [itemSchema],
    required: true,
  },
  discount: Number,
  netAmount: Number,
  date: String,
  time: String,
  orderStatus: {
    type: String,
    enum: ["pending", "canceled", "dilevered"],
    default: "pending",
    required: true,
  },
});

const Order = new mongoose.model("Order", orderSchema);
module.exports = Order;
