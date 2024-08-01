const express = require("express");
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const session = require("express-session");
<<<<<<< Updated upstream
=======
const passport = require('passport');
const path = require('path');
const flash = require('connect-flash'); // הוספת connect-flash
const User = require('./models/user');
const cartRoutes = require('./routes/cartRoutes'); // הוספת מסלולי העגלה
const productRoutes = require('./routes/productRoutes');
const facebookRoutes = require('./routes/facebookRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes'); // הוספת ניתוב checkout


const WEATHER_API_KEY = 'ce875e55d220362a9393b2bb9c207688';

require('dotenv').config();

// Connect to MongoDB
>>>>>>> Stashed changes
const connectDB = require("./config");

// Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
<<<<<<< Updated upstream
const supplierroutes = require("./routes/supplierroutes");
=======
const supplierRoutes = require("./routes/supplierRoutes");
const catalogRoutes = require("./routes/catalogRoutes");
const facebookAuthRoutes = require("./routes/facebookAuth");
const chartsRoutes = require("./routes/chartsRoutes"); 
const checkoutRoutes = require('./routes/checkoutRoutes');
>>>>>>> Stashed changes

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.static('public'));

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

// Set view engine
app.set("view engine", "ejs");

// Routes
app.use("/", userRoutes);
app.use("/admin", adminRoutes);
<<<<<<< Updated upstream
app.use("/supplier", supplierroutes);
=======
app.use("/supplier", supplierRoutes);
app.use("/catalog", catalogRoutes);
app.use(express.static('public'));
app.use('/auth/facebook', facebookAuthRoutes);
app.use('/charts', chartsRoutes);  // Add charts routes
app.use('/products', productRoutes); // חיבור נתיבי המוצרים
app.use('/cart', cartRoutes); // חיבור נתיבי העגלה
<<<<<<< Updated upstream
app.use('/checkout', checkoutRoutes);
=======
app.use("/profile", userRoutes);
app.use("/facebook", facebookRoutes);
app.use('/checkout', checkoutRoutes);

>>>>>>> Stashed changes


>>>>>>> Stashed changes

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
