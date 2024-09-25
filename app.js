// modules
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const engine = require("ejs-mate");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const MongoStore = require("connect-mongo");
const path = require("path");
const port = 3000;

// routes
const loginRouter = require("./routes/login");
const dashboardRouter = require("./routes/dashboard");
const categoryRouter = require("./routes/category");
const subCategoryRouter = require("./routes/sub-category");
const itemRouter = require("./routes/item");
const orderRouter = require("./routes/order");
const app = express();

// to access variables from .env files
dotenv.config();

// Connecting with MongoDB
// Initial connection
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(function () {
    console.log("Database connected successfully!");
  })
  .catch(function (error) {
    console.log(error);
  });
// Handling error's after initial connection
mongoose.connection.on("error", function (error) {
  console.log(error);
});

// setting up app
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("./public"));

//setting the limit of bodyParser
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000 /*hour*/,
      httpOnly: true,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB_URL,
    }),
  })
);
// setting ejs-mate
app.engine("ejs", engine);
app.use(methodOverride("_method"));
// seetting Flash
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// routes

// home
app.get("/", function (req, res) {
  res.redirect("/dashboard");
});
// login
app.use("/login", loginRouter);
// dashboard
app.use("/dashboard", dashboardRouter);
// category
app.use("/category", categoryRouter);
// sub category
app.use("/sub-category", subCategoryRouter);
// item
app.use("/item", itemRouter);
// order
app.use("/order", orderRouter);

// Logout
app.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("login");
});

// 404 page
app.all("*", function (req, res) {
  res.render("404");
});

// Middleware for error handling FOR ALL
app.use(function (err, res, res, next) {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", {
    err,
    title: "Error",
    heading: "Error",
    page_name: null,
  });
});

// starting server on port 3000
// app.listen(port, function () {
//   console.log("Server is live!");
// });

module.exports.app = app;
