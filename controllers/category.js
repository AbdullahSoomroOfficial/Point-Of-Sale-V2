const Category = require("../models/category");
const SubCategory = require("../models/sub-category");
const Item = require("../models/item");

const categoryController = {
  // Add category [render form to add category]
  get: async function (req, res) {
    try {
      const categories = await Category.find({});
      res.render("category/show", {
        title: "Add Category",
        heading: "Add Category",
        page_name: "category",
        categories: categories,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Add category [store in database]
  post: async function (req, res) {
    try {
      const category = new Category(req.body);
      await category
        .save()
        .then((e) => {
          req.flash("success", "Category Added Successfully!!!");
          res.redirect("/category");
        })
        .catch((e) => {
          if (e.code === 11000) {
            const message = "This category Already Exists!";
            req.flash("error", message);
            res.redirect("/category");
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Manage categories [Show All]
  manageCategory: async function (req, res) {
    try {
      const categories = await Category.find({});
      res.render("category/manage", {
        title: "Manage Categories",
        heading: "Manage Categories",
        page_name: null,
        categories: categories,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  //show particular category [render form]
  getCategory: async function (req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      // res.send(category);
      res.render("category/edit", {
        title: "Edit Category",
        heading: "Edit Category",
        page_name: null,
        category: category,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // update category
  updateCategory: async function (req, res) {
    try {
      const { id } = req.params;
      const newCategoryName = req.body.category;
      await Category.findByIdAndUpdate(id, { category: newCategoryName })
        .then(() => {
          req.flash("success", "Category Updated Successfully!");
          res.redirect("/category/manage");
        })
        .catch((e) => {
          if (e.code === 11000) {
            const message = "This category Already Exists!";
            req.flash("error", message);
            res.redirect("/category/manage");
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  },
  // delete category
  deleteCategory: async function (req, res) {
    try {
      const { id } = req.params;
      await Category.deleteOne({ _id: id });
      await SubCategory.deleteMany({ category: id });
      await Item.deleteMany({ category: id });
      req.flash("success", "Category Deleted Successfully!");
      res.redirect("/category/manage");
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = categoryController;
