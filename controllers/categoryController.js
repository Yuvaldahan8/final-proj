const Category = require("../models/category");
const Product = require("../models/product");

exports.listCategories = async (req, res) => {
    if (!req.session.user) {
        res.redirect("/login?message=User is not logged in"); 
    }
    else {
        const categories = await Category.find().populate('products');
        res.render("admin/categories", { categories, user: req.session.user });
    }
};

exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).render("admin/categories", { error: "Category name is required" });
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).render("admin/categories", { error: "Category already exists" });
        }
        
        const newCategory = new Category({ name });
        await newCategory.save();
        res.redirect("/admin/categories");
    }
    catch (err) {
        console.error(err);
        return res.status(500).render("admin/categories", { error: "An error occurred while adding the category" });
    }
};

exports.editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).render("admin/categories", { error: "Category name is required" });
        }
        
        await Category.findByIdAndUpdate(id, { name });
        res.redirect("/admin/categories");
    }
    catch (err) {
        console.error(err);
        return res.status(500).render("admin/categories", { error: "An error occurred while updating the category" });
    }
};

exports.listProductsByCategory = async (req, res) => {
    const categoryName = req.params.categoryName;
    const products = await Product.find({ category: categoryName });
    res.render("categoryProducts", { categoryName, products });
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.deleteMany({ category: id });
        await Category.findByIdAndDelete(id);
        res.redirect("/admin/categories");
    }
    catch (err) {
        console.error(err);
        return res.status(500).render("admin/categories", { error: "An error occurred while deleting the category" });
    }
}