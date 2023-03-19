const User = require("../models/user");
const bcrypt = require("bcrypt");

const loginController = {
  // Login [render login form]
  get: function (req, res) {
    res.render("login", { message: null });
  },
  // Login [authenticate]
  post: async function (req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (user) {
        const hash = user.password;
        const result = bcrypt.compareSync(password, hash);
        if (result) {
          req.session.user_id = user._id;
          req.flash("success", "!!!!!--- WELCOME TO PIZZA MASTER ---!!!!!");
          res.redirect("/dashboard");
        } else {
          res.render("login", { message: "Invalid Credentials!" });
        }
      } else {
        res.render("login", { message: "Invalid Credentials!" });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = loginController;
