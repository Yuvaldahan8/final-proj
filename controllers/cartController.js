const Order = require('../models/order');
const Product = require('../models/product');

exports.updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.session.user._id;

    try {
        let order = await Order.findOne({ user: userId });
        if (order) {
            const item = order.products.find(item => item.product.toString() === productId);
            if (item) {
                item.quantity = quantity;
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
