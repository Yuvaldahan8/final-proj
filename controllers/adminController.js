const Order = require("../models/order");
const User = require('../models/user');

exports.viewUsers = async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login?message=User is not logged in");
    }
    const user = req.session.user;
    if (user.role !== 'admin') {
        return res.redirect("/login?message=User is not logged in as admin");
    }
    try {
        const users = await User.find(); // שליפת כל המשתמשים
        res.render("admin/admin", { user, users }); // העברת הנתונים לדף EJS
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving users');
    }
};

exports.renderAdmin = async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login?message=User is not logged in");
    }
    const user = req.session.user;
    if (user.role !== 'admin') {
        return res.redirect("/login?message=User is not logged in as admin");
    }
    try {
        const orders = await Order.find().populate("products.product");
        const users = await User.find(); // שליפת כל המשתמשים
        res.render("admin/admin", { user, orders, users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
    }
};


exports.deleteOrder = async (req, res) => {
    if (!req.session.user) {
        res.redirect("/login?message=User is not logged in"); 
    }
    else {
        const user = req.session.user;
        if (user.role !== 'admin') {
            res.redirect("/login?message=User is not logged in as admin"); 
        }
        else {
            try {
                const id = req.query.orderId;
                await Order.findByIdAndDelete(id);
    
                let orders = [];
                orders = await Order.find().populate(
                    "products.product"
                );
                res.render("admin/admin", { user, orders });
    
            } catch (error) {
                console.error(error);
                res.status(500).send('Error deleting order');
            }
        }
    }
};