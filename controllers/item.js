const SubCategory = require("../models/sub-category");
const Category = require("../models/category");
const Item = require("../models/item");

const itemController = {
  // Add item [render form to add item]
  get: async function (req, res) {
    try {
      const categories = await Category.find({});
      const subCategories = await SubCategory.find({});
      const items = await Item.find({}).populate(["category", "sub-category"]);
      res.render("item/show", {
        title: "Add Item",
        heading: "Add Item",
        page_name: "item",
        categories: categories,
        subCategories: subCategories,
        items: items,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Add item [store in database]
  post: async function (req, res) {
    try {
      const item = new Item(req.body);
      // item.markModified('category');
      // item.markModified('sub-category');
      await item
        .save()
        .then(() => {
          req.flash("success", "Item Added Successfully!");
          res.redirect("/item");
        })
        .catch((e) => {
          if (e.code === 11000) {
            const message = "This Item Already Exists!";
            req.flash("error", message);
            res.redirect("/item");
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  },
  // Manage items [Show All]
  manageItem: async function (req, res) {
    try {
      const items = await Item.find({}).populate(["category", "sub-category"]);
      res.render("item/manage", {
        title: "Manage Items",
        heading: "Manage Items",
        page_name: null,
        items: items,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  //show particular item [render form]
  getItem: async function (req, res) {
    try {
      const { id } = req.params;
      const categories = await Category.find({});
      const subCategories = await SubCategory.find({});
      const item = await Item.findOne({ _id: id }).populate([
        "category",
        "sub-category",
      ]);
      res.render("item/edit", {
        title: "Edit Item",
        heading: "Edit Item",
        page_name: null,
        categories: categories,
        subCategories: subCategories,
        item: item,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  // update item
  updateItem: async function (req, res) {
    try {
      const { id } = req.params;
      const updatedItemName = req.body.item;
      const updatedItemCategory = req.body.category;
      const updatedItemSubCategory = req.body["sub-category"];
      const updatedItemPrice = req.body.price;
      await Item.findByIdAndUpdate(id, {
        item: updatedItemName,
        category: updatedItemCategory,
        "sub-category": updatedItemSubCategory,
        price: updatedItemPrice,
      })
        .then(() => {
          req.flash("success", "Item Updated Successfully!");
          res.redirect("/item/manage");
        })
        .catch((e) => {
          if (e.code === 11000) {
            const message = "This Item Already Exists!";
            req.flash("error", message);
            res.redirect("/item/manage");
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  },
  // delete item
  deleteItem: async function (req, res) {
    try {
      const { id } = req.params;
      await Item.deleteOne({ _id: id });
      req.flash("success", "Item Deleted Successfully!");
      res.redirect("/item/manage");
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = itemController;
