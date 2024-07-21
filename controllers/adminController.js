const Category = require("../models/category");
const Product = require("../models/product");

exports.renderAdmin = (req, res) => {
    if (!req.session.user) {
        res.redirect("/login?message=User is not logged in"); 
    }
    else {
        const user = req.session.user;
        if (user.role !== 'admin') {
            res.redirect("/login?message=User is not logged in as admin"); 
        }
        else {
            res.render("admin/admin", { user });
        }
    }
};