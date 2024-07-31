const Category = require("../models/category");
const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");
const paypalClient = require('../models/paypalClient');
const paypal = require('@paypal/checkout-server-sdk');

exports.renderProducts = async(req, res) => {
    try {
        if (!req.session.user) {
            res.redirect("/login?message=User is not logged in"); 
        }
        else {
            const categories = await Category.find();
            const suppliers = await User.find({ role: 'supplier' });
            
            let products;
            if (req.session.user.role === "supplier") {
                products = await Product.find({ supplier: req.session.user._id }).populate('category').populate('supplier'); 
            }
            else {
                products = await Product.find().populate('category').populate('supplier');
            }

            res.render(`${req.session.user.role}/products`, { 
                categories, 
                products, 
                suppliers,
                user: req.session.user 
            });
        }
    }
    catch (error) {
        console.error(error);
        const categories = await Category.find();
        const products = await Product.find().populate('category').populate('supplier');

        res.status(500).render(`${req.session.user.role}/products`, { 
            error: "An error occurred while fetching the products",
            user: req.session.user,
            categories,
            products
        });
    }
}

exports.addProduct = async(req, res) => {
    try {
        const { name, price, category, description, image, supplier } = req.body;
        if (!name || !price || !category || !image || !supplier) {
            const categories = await Category.find();
            const products = await Product.find().populate('category').populate('supplier');

            return res.status(400).render(`${req.session.user.role}/products`, { 
                error: "Some fields are required",
                user: req.session.user,
                categories,
                products
            });
        }

        const newProduct = new Product({ name, price, category, description, image, supplier });
        await newProduct.save();
        res.redirect(`/${req.session.user.role}/products`);
    }
    catch (error) {
        console.error(error);
        const categories = await Category.find();
        const products = await Product.find().populate('category').populate('supplier');

        res.status(500).render(`${req.session.user.role}/products`, { 
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
        const { name, price, category, description, image, supplier } = req.body;

        if (!name || !price || !category || !image || !supplier) {
            const categories = await Category.find();
            const products = await Product.find().populate('category').populate('supplier');

            return res.status(400).render(`${req.session.user.role}/products`, { 
                error: "Some fields are required",
                user: req.session.user,
                categories,
                products
            });
        }

        await Product.findByIdAndUpdate(id, { name, price, category, description, image, supplier });
        res.redirect(`/${req.session.user.role}/products`);
    }
    catch (error) {
        console.error(error);
        const categories = await Category.find();
        const products = await Product.find().populate('category').populate('supplier');
        
        res.status(500).render(`${req.session.user.role}/products`, { 
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
        res.redirect(`/${req.session.user.role}/products`);
    }
    catch (error) {
        console.error(error);
        const categories = await Category.find();
        const products = await Product.find().populate('category').populate('supplier');

        res.status(500).render(`${req.session.user.role}/products`, { 
            error: "An error occurred while deleting the product",
            user: req.session.user,
            categories,
            products
        });
    }
}

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.session.user._id;

    let order = await Order.findOne({ user: userId });
    if (order) {
        const existingProduct = order.products.find(item => item.product.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += +quantity;
        } else {
            order.products.push({ product: productId, quantity });
        }
    } else {
        order = new Order({
            user: userId,
            products: [{ product: productId, quantity }]
        });
    }

    // חישוב הסכום הכולל
    let totalAmount = 0;
    for (let item of order.products) {
        const product = await Product.findById(item.product);
        totalAmount += item.quantity * product.price;
    }
    order.totalAmount = totalAmount;

    await order.save();
    res.redirect("/cart");
}

exports.viewCart = async (req, res) => {
    const userId = req.session.user._id;
    const order = await Order.findOne({ user: userId }).populate("products.product");
    res.render("cart", { order, user: req.session.user });
}



exports.clearCart = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'User is not logged in' });
    }

    const userId = req.session.user._id;
    const order = await Order.findOne({ user: userId });

    if (order) {
        order.products = [];
        order.totalAmount = 0;
        await order.save();
    }

    res.json({ message: 'Cart cleared successfully' });
}

exports.listProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category').populate('supplier');
        res.render("home", { 
            products, 
            user: req.sessions.user 
        });
    }
    catch (error) {
        console.error(error);
        const products = await Product.find().populate('category').populate('supplier');

        res.status(500).render("home", { 
            products, 
            user: req.sessions.user,
            error: "An error occurred while fetching products" 
        });
    }
}
exports.addToPayPalCart = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'User is not logged in' });
    }

    const { productId, quantity } = req.body;
    const userId = req.session.user._id;

    let order = await Order.findOne({ user: userId });
    if (order) {
        const existingProduct = order.products.find(item => item.product.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += +quantity;
        } else {
            order.products.push({ product: productId, quantity });
        }
    } else {
        order = new Order({
            user: userId,
            products: [{ product: productId, quantity }]
        });
    }

    // חישוב הסכום הכולל
    let totalAmount = 0;
    for (let item of order.products) {
        const product = await Product.findById(item.product);
        totalAmount += item.quantity * product.price;
    }
    order.totalAmount = totalAmount;

    await order.save();
    res.json({ message: 'Product added to cart successfully' });
}

exports.viewPayPalCart = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login?message=User is not logged in');
    }

    const userId = req.session.user._id;
    const order = await Order.findOne({ user: userId }).populate("products.product");
    res.render("cart", { order, user: req.session.user });
}

exports.clearPayPalCart = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'User is not logged in' });
    }

    const userId = req.session.user._id;
    const order = await Order.findOne({ user: userId });

    if (order) {
        order.products = [];
        order.totalAmount = 0;
        await order.save();
    }

    res.json({ message: 'Cart cleared successfully' });
}

exports.checkoutPaypal = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login?message=User is not logged in');
    }

    const userId = req.session.user._id;
    let order;
    try {
        order = await Order.findOne({ user: userId }).populate("products.product");
        if (!order || order.products.length === 0) {
            return res.redirect('/cart?message=Cart is empty');
        }
    } catch (err) {
        console.error('Error fetching order:', err);
        return res.status(500).json({ error: 'Error fetching order' });
    }

    // יצירת הזמנה ב-PayPal
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: order.totalAmount.toFixed(2),
                breakdown: {
                    item_total: {
                        currency_code: 'USD',
                        value: order.totalAmount.toFixed(2)
                    }
                }
            },
            items: order.products.map(item => ({
                name: item.product.name,
                unit_amount: {
                    currency_code: 'USD',
                    value: item.product.price.toFixed(2)
                },
                quantity: item.quantity
            }))
        }],
        application_context: {
            return_url: `${req.headers.origin}/checkoutSuccess`,
            cancel_url: `${req.headers.origin}/cheackoutCancel`
        }
    });

    try {
        const client = paypalClient.client(); // יוצרים אינסטנס של הלקוח
        const orderResponse = await client.execute(request); // משתמשים באינסטנס של הלקוח לביצוע הבקשה
        console.log('PayPal order response:', orderResponse);
        res.json({ id: orderResponse.result.id });
    } catch (err) {
        console.error('Error creating PayPal order:', err);
        res.status(500).json({ error: 'Something went wrong with creating PayPal order' });
    }
};

