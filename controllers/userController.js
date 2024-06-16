const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Render login page
exports.renderLogin = (req, res) => {
    res.render("login");
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user = user;
        if (user.role === "admin") {
            res.redirect("/admin/dashboard");
        } else {
            res.redirect("/");
        }
    } else {
        res.render("login", { error: "Invalid email or password" });
    }
};
