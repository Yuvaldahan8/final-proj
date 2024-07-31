const express = require("express");
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require('passport');
const path = require('path');
const User = require('./models/user');
const cartRoutes = require('./routes/cartRoutes'); // הוספת מסלולי העגלה
const productRoutes = require('./routes/productRoutes');

require('dotenv').config();

// Connect to MongoDB
const connectDB = require("./config");
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const catalogRoutes = require("./routes/catalogRoutes");
const facebookAuthRoutes = require("./routes/facebookAuth");
const chartsRoutes = require("./routes/chartsRoutes"); 


const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: "nursery",
        resave: false,
        saveUninitialized: true,
    })
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// serializeUser and deserializeUser functions
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Set view engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// Use the user routes
app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.use("/supplier", supplierRoutes);
app.use("/catalog", catalogRoutes);
app.use(express.static('public'));
app.use('/auth/facebook', facebookAuthRoutes);
app.use('/charts', chartsRoutes);  // Add charts routes
app.use('/products', productRoutes); // חיבור נתיבי המוצרים
app.use('/cart', cartRoutes); // חיבור נתיבי העגלה
app.use("/profile", userRoutes);
// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
