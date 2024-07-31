const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require("bcryptjs");
const Order = require("../models/order");
// Render login page
exports.renderLogin = (req, res) => {

    res.render("login");
};
exports.renderProfile = async (req, res) => {
    if (!req.session.user) {
        res.redirect("/login?message=User is not logged in");
    } else {
        const user = req.session.user;
        const userId = req.session.user._id;
        const orders = await Order.find({ user: userId }).populate("products.product");


        res.render("profile", {
            user,
            orders,
        });

    }



};
exports.renderHome = async (req, res) => {
    if (!req.session.user) {
        res.redirect("/login?message=User is not logged in");
    } else {
        const user = req.session.user;
        const products = await Product.find().populate('category').populate('supplier');

        if (user.role !== 'user') {
            res.redirect("/login?message=User is not logged in as user");
        } else {
            res.render("home", {
                user,
                products,
            });
        }
    }
};

exports.renderSignup = (req, res) => {
    res.render("signup", { error: '' });
};

exports.logout = (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.redirect("/");
            }
            res.clearCookie('connect.sid');
            res.redirect("/login?message=Logged out successfully");
        });
    } else {
        res.redirect("/login?message=No active session");
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user = user;

        if (user.role === "admin") {
            res.redirect("/admin");
        } else if (user.role === "supplier") {
            res.redirect("/supplier");
        } else {
            res.redirect("/home");
        }
    } else {
        res.render("login", { error: "Invalid email or password" });
    }
};

exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res.render("signup", {
            error: "One or more of the required fields are missing"
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.render("signup", {
            error: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        role: role || "user",
        password: hashedPassword
    });

    await newUser.save();
    res.redirect("/login?message=User created successfully");
};

// Render the edit user page
exports.renderEditUser = (req, res) => {
    if (!req.session.user) {
        res.redirect("/login?message=User is not logged in");
    } else {
        const user = req.session.user;
        res.render("editUser", { user, error: '' });
    }
};

// Fetch user's orders and return as JSON
exports.getUserOrders = async (req, res) => {
    try {
        // Ensure user is logged in
        if (!req.session.user) {
            return res.status(401).json({ message: "User is not logged in" });
        }

        // Get user ID from session
        const userId = req.session.user._id;

        // Find orders associated with the user
        const orders = await Order.find({ user: userId }).populate("products.product");

        // Return orders as JSON
        res.json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "An error occurred while fetching the orders." });
    }
};

// Handle the user info update
exports.updateUser = async (req, res) => {
    const { name } = req.body;
    const user = req.session.user;

    if (!user) {
        return res.redirect("/login?message=User is not logged in");
    }

    try {
        await User.findByIdAndUpdate(user._id, { name });
        user.name = name; // Update session user
        res.redirect("/home?message=User info updated successfully");
    } catch (err) {
        res.render("editUser", { user, error: "Error updating user info" });
    }
};


