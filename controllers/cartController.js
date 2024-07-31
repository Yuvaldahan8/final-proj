const Order = require('../models/order');
const Product = require('../models/product');

async function calculateTotalAmount(order) {
    let totalAmount = 0;
    for (let item of order.products) {
        const product = await Product.findById(item.product);
        if (product) {
            totalAmount += item.quantity * product.price;
        }
    }
    return totalAmount;
}

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.session.user._id;

    try {
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

        order.totalAmount = await calculateTotalAmount(order);
        await order.save();
        req.flash('success_msg', 'Product added to cart successfully!');
        res.redirect('/catalog');
    } catch (error) {
        console.error('Error adding product to cart:', error);
        req.flash('error_msg', 'Failed to add product to cart. Please try again.');
        res.redirect('/catalog')
        // res.status(500).json({ error: 'An error occurred while adding the product to the cart' });
    }
};

exports.updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.session.user._id;

    try {
        let order = await Order.findOne({ user: userId });
        if (order) {
            const item = order.products.find(item => item.product.toString() === productId);
            if (item) {
                item.quantity = quantity;
                order.totalAmount = await calculateTotalAmount(order);
                await order.save();
                return res.json({ success: true });
            }
        }
        res.status(404).json({ error: 'Order not found' });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ error: 'An error occurred while updating the cart item' });
    }
};

exports.removeCartItem = async (req, res) => {
    const { productId } = req.body;
    const userId = req.session.user._id;

    try {
        let order = await Order.findOne({ user: userId });
        if (order) {
            order.products = order.products.filter(item => item.product.toString() !== productId);
            order.totalAmount = await calculateTotalAmount(order);
            await order.save();
            return res.json({ success: true });
        }
        res.status(404).json({ error: 'Order not found' });
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({ error: 'An error occurred while removing the cart item' });
    }
};

exports.clearCart = async (req, res) => {
    const userId = req.session.user._id;

    try {
        let order = await Order.findOne({ user: userId });
        if (order) {
            order.products = [];
            order.totalAmount = 0;
            await order.save();
            return res.json({ success: true });
        }
        res.status(404).json({ error: 'Order not found' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ error: 'An error occurred while clearing the cart' });
    }
};