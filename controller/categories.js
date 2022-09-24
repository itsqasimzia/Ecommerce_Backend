const { toTitleCase } = require("../config/function");
const categoryModel = require("../models/index").categories;
const fs = require("fs");

class Category {
  async getAllCategory(req, res) {
    try {
      let Categories = await categoryModel.findAll({});
      if (Categories) {
        return res.json({ Categories });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddCategory(req, res) {
    let { cName, cDescription, cStatus } = req.body;
    let cImage = req.file.filename;
    const filePath = `../server/public/uploads/categories/${cImage}`;

    if (!cName || !cDescription || !cStatus || !cImage) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
        return res.json({ error: "All fields must be required" });
      });
    } else {
      cName = toTitleCase(cName);
      try {
        let checkCategoryExists = await categoryModel.findOne({
          where: { cName },
        });
        if (checkCategoryExists) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ error: "Category already exists" });
          });
        } else {
          let newCategory = new categoryModel({
            cName,
            cDescription,
            cStatus,
            cImage,
          });
          await newCategory.save().then((resp) => {
            console.log("category", resp);
            return res.json({ success: "Category created successfully" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postEditCategory(req, res) {
    let { cId, cDescription, cStatus } = req.body;
    if (!cId || !cDescription || !cStatus) {
      return res.json({ error: "All fields must be required" });
    }
    try {
      let editCategory = categoryModel.update(
        {
          cDescription,
          cStatus,
          updatedAt: Date.now(),
        },
        { where: { id: cId } }
      );
      // let edit = await editCategory.exec();
      if (editCategory) {
        return res.json({ success: "Category edit successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getDeleteCategory(req, res) {
    let { cId } = req.body;
    console.log(cId);
    if (!cId) {
      return res.json({ error: "All fields must be required" });
    } else {
      try {
        let deletedCategoryFile = await categoryModel.findOne({
          where: { id: cId },
        });
        const filePath = `../server/public/uploads/categories/${deletedCategoryFile.cImage}`;

        let deleteCategory = await categoryModel.destroy({
          where: { id: cId },
        });
        if (deleteCategory) {
          // Delete Image from uploads -> categories folder
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Category deleted successfully" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const categoryController = new Category();
module.exports = categoryController;
