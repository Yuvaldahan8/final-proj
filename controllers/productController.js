const Category = require("../models/category");
const Product = require("../models/product");
const Order = require("../models/order");

exports.renderProducts = async(req, res) => {
    try {
        if (!req.session.user) {
            res.redirect("/login?message=User is not logged in"); 
        }
        else {
            const categories = await Category.find();
            const products = await Product.find().populate('category');

            res.render("admin/products", { 
                categories, 
                products, 
                user: req.session.user 
            });
        }
    }
    catch (error) {
        console.error(error);
        const categories = await Category.find();
        const products = await Product.find().populate('category');

        res.status(500).render("admin/products", { 
            error: "An error occurred while fetching the products",
            user: req.session.user,
            categories,
            products
        });
    }
}

exports.addProduct = async(req, res) => {
    try {
        const { name, price, category, description, image } = req.body;
        if (!name || !price || !category || !image) {
            const categories = await Category.find();
            const products = await Product.find().populate('category');

            return res.status(400).render("admin/products", { 
                error: "Some fields are required",
                user: req.session.user,
                categories,
                products
            });
        }

        const newProduct = new Product({ name, price, category, description, image });
        await newProduct.save();
        res.redirect("/admin/products");
    }
    catch (error) {
        console.error(error);
        const categories = await Category.find();
        const products = await Product.find().populate('category');

        res.status(500).render("admin/products", { 
            error: "An error occurred while adding the product",
            user: req.session.user,
            categories,
            products
        });
    }
}

exports.editProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, price, category, description, image } = req.body;

        if (!name || !price || !category || !image) {
            const categories = await Category.find();
            const products = await Product.find().populate('category');

            return res.status(400).render("admin/products", { 
                error: "Some fields are required",
                user: req.session.user,
                categories,
                products
            });
        }

        await Product.findByIdAndUpdate(id, { name, price, category, description, image });
        res.redirect("/admin/products");
    }
    catch (error) {
        console.error(error);
        const categories = await Category.find();
        const products = await Product.find().populate('category');
        
        res.status(500).render("admin/products", { 
            error: "An error occurred while updating the product",
            user: req.session.user,
            categories,
            products
        });
    }
}

exports.deleteProduct = async(req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.redirect("/admin/products");
    }
    catch (error) {
        console.error(error);
        const categories = await Category.find();
        const products = await Product.find().populate('category');

        res.status(500).render("admin/products", { 
            error: "An error occurred while deleting the product",
            user: req.session.user,
            categories,
            products
        });
    }
}

exports.addToCart = async(req, res) => {
    const { productId, quantity }= req.body;
    const userId = req.session.user._id;

    const order = await Order.findOne({ user: userId });
    if (order) {
        const exisitngProduct = order.products.find(item => item.product.toString() === productId);
        if (exisitngProduct) {
            exisitngProduct.quantity += +quantity
        }
        else {
            order.products.push({ product: productId, quantity });
        }
        order.totalAmount == (await Product.findById(productId)).price * quantity;
        await order.save();
    }
    else {
        const newOrder = new Order({
            user: userId,
            products: [{ product: productId, quantity }],
            totalAmount: (await Product.findById(productId)).price * quantity
        });
        await newOrder.save();
    }

    res.redirect("/cart");
}

exports.viewCart = async (req, res) => {
    const userId = req.session.user._id;
    const order = await Order.findOne({ user: userId }).populate("products.product");
    res.render("cart", { order, user: req.session.user });
}

exports.listProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.render("home", { 
            products, 
            user: req.sessions.user 
        });
    }
    catch (error) {
        console.error(error);
        const products = await Product.find().populate('category');

        res.status(500).render("home", { 
            products, 
            user: req.sessions.user,
            error: "An error occurred while fetching products" 
        });
    }
}