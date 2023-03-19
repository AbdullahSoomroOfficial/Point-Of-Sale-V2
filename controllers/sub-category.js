const SubCategory = require("../models/sub-category");
const Category = require("../models/category");
const Item = require("../models/item");

const subCategoryController = {
  // Add sub-category [render form to add sub-category]
  get: async function (req, res) {
    try {
      const categories = await Category.find({});
      const subCategories = await SubCategory.find({}).populate("category");
      console.log(subCategories);
      res.render("sub-category/show", {
        title: "Add Sub-Category",
        heading: "Add Sub-Category",
        page_name: "sub-category",
        categories: categories,
        subCategories: subCategories,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Add sub-category [store in database]
  post: async function (req, res) {
    try {
      const subCategory = new SubCategory(req.body);
      await subCategory
        .save()
        .then(() => {
          req.flash("success", "Sub-Category Added Successfully!");
          res.redirect("sub-category");
        })
        .catch((e) => {
          if (e.code === 11000) {
            const message = "This Sub-Category Already Exists!";
            req.flash("error", message);
            res.redirect("sub-category");
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Manage sub-categories [Show All]
  manageSubCategory: async function (req, res) {
    try {
      const subCategories = await SubCategory.find({}).populate("category");
      res.render("sub-category/manage", {
        title: "Manage Sub-Categories",
        heading: "Manage Sub-Categories",
        page_name: null,
        subCategories: subCategories,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  //show particular sub-category [render form]
  getSubCategory: async function (req, res) {
    try {
      const { id } = req.params;
      const categories = await Category.find({});
      const subCategory = await SubCategory.findOne({ _id: id }).populate(
        "category"
      );
      res.render("sub-category/edit", {
        title: "Edit Sub-Category",
        heading: "Edit Sub-Category",
        page_name: null,
        categories: categories,
        subCategory: subCategory,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // update sub-category
  updateSubCategory: async function (req, res) {
    try {
      const { id } = req.params;
      const newSubCategoryName = req.body["sub-category"];
      const newCategoryName = req.body.category;
      await SubCategory.findByIdAndUpdate(id, {
        "sub-category": newSubCategoryName,
        category: newCategoryName,
      })
        .then(() => {
          req.flash("success", "Sub-Category Updated Successfully!");
          res.redirect("/sub-category/manage");
        })
        .catch((e) => {
          if (e.code === 11000) {
            const message = "This Sub-Category Already Exists!";
            req.flash("error", message);
            res.redirect("/sub-category/manage");
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  },
  // delete sub-category
  deleteSubCategory: async function (req, res) {
    try {
      const { id } = req.params;
      await SubCategory.deleteOne({ _id: id });
      await Item.deleteMany({ "sub-category": id });
      req.flash("success", "Sub-Category Deleted Successfully!");
      res.redirect("/sub-category/manage");
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = subCategoryController;
