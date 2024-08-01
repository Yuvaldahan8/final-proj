const Order = require("../models/order");
exports.renderAdmin = async (req, res) => {
    if (!req.session.user) {
        res.redirect("/login?message=User is not logged in"); 
    }
    else {
        const user = req.session.user;
        if (user.role !== 'admin') {
            res.redirect("/login?message=User is not logged in as admin"); 
        }
        else {
            let orders = [];
            orders = await Order.find().populate(
                "products.product"
            );
            res.render("admin/admin", { user, orders });
        }
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
exports.renderUsersList = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find({});
        // Render the users list view with the users data
        res.render('usersList', { users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("An error occurred while fetching users.");
    }
};