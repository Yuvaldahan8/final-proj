const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require("bcryptjs");

// Render login page
exports.renderLogin = (req, res) => {
    res.render("login");
};

exports.renderHome = async (req, res) => {
    if (!req.session.user) {
        res.redirect("/login?message=User is not logged in"); 
    }
    else {
        const user = req.session.user;
        const products = await Product.find().populate('category').populate('supplier');

        if (user.role !== 'user') {
            res.redirect("/login?message=User is not logged in as user"); 
        }
        else {
            res.render("home", { 
                user, 
                products, 
            });
        }
    }
};

exports.renderAbout = (req, res) => {
    res.render('about', { error: '' });
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
    }
    else {
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


