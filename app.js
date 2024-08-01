const express = require("express");
const axios = require('axios');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const session = require("express-session");
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 6dfe8eb (Adding checkout page)
=======
=======
<<<<<<< Updated upstream
=======
>>>>>>> omri
>>>>>>> parent of b970514 (Update app.js)
const passport = require('passport');
const path = require('path');
const flash = require('connect-flash'); // הוספת connect-flash
const User = require('./models/user');
const cartRoutes = require('./routes/cartRoutes'); // הוספת מסלולי העגלה
const productRoutes = require('./routes/productRoutes');
const facebookRoutes = require('./routes/facebookRoutes');
<<<<<<< HEAD
<<<<<<< HEAD
 

const checkoutRoutes = require('./routes/checkoutRoutes'); // הוספת ניתוב checkout

=======
>>>>>>> parent of 6dfe8eb (Adding checkout page)
=======
=======
const checkoutRoutes = require('./routes/checkoutRoutes'); // הוספת ניתוב checkout

>>>>>>> omri
>>>>>>> parent of b970514 (Update app.js)

const WEATHER_API_KEY = 'ce875e55d220362a9393b2bb9c207688';

require('dotenv').config();

// Connect to MongoDB
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> parent of ecc4410 (Adding checkout page)
=======
>>>>>>> parent of 6dfe8eb (Adding checkout page)
=======
>>>>>>> Stashed changes
>>>>>>> omri
>>>>>>> parent of b970514 (Update app.js)
const connectDB = require("./config");
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
<<<<<<< HEAD
<<<<<<< HEAD
const supplierroutes = require("./routes/supplierRoutes");
=======
>>>>>>> parent of 6dfe8eb (Adding checkout page)
=======
=======
<<<<<<< Updated upstream
const supplierroutes = require("./routes/supplierroutes");
=======
>>>>>>> omri
>>>>>>> parent of b970514 (Update app.js)
const supplierRoutes = require("./routes/supplierRoutes");
const catalogRoutes = require("./routes/catalogRoutes");
const facebookAuthRoutes = require("./routes/facebookAuth");
const chartsRoutes = require("./routes/chartsRoutes"); 
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> parent of 6dfe8eb (Adding checkout page)
=======

=======
const checkoutRoutes = require('./routes/checkoutRoutes');
>>>>>>> Stashed changes
>>>>>>> omri
>>>>>>> parent of b970514 (Update app.js)

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

app.use(flash());

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
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

// Middleware to make flash messages available in all templates
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Use the user routes
app.use("/", userRoutes);
app.use("/admin", adminRoutes);
<<<<<<< HEAD
app.use("/supplier", supplierRoutes);
app.use("/catalog", catalogRoutes);
<<<<<<< HEAD
<<<<<<< HEAD
app.use("/supplier", supplierroutes);
=======
>>>>>>> parent of 6dfe8eb (Adding checkout page)
=======
=======
<<<<<<< Updated upstream
app.use("/supplier", supplierroutes);
=======
app.use("/supplier", supplierRoutes);
app.use("/catalog", catalogRoutes);
app.use(express.static('public'));
>>>>>>> omri
>>>>>>> parent of b970514 (Update app.js)
app.use('/auth/facebook', facebookAuthRoutes);
app.use('/charts', chartsRoutes);  // Add charts routes
app.use('/products', productRoutes); // חיבור נתיבי המוצרים
app.use('/cart', cartRoutes); // חיבור נתיבי העגלה
<<<<<<< HEAD
app.use("/profile", userRoutes);
app.use("/facebook", facebookRoutes);


app.get('/weather', async (req, res) => {
    const { city } = req.query;
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});
<<<<<<< HEAD
<<<<<<< HEAD

app.use('/checkout', checkoutRoutes);

=======
app.use('/checkout', checkoutRoutes);


>>>>>>> Stashed changes
>>>>>>> parent of ecc4410 (Adding checkout page)
=======
>>>>>>> parent of 6dfe8eb (Adding checkout page)
=======
=======
<<<<<<< Updated upstream
app.use('/checkout', checkoutRoutes);
=======
app.use("/profile", userRoutes);
app.use("/facebook", facebookRoutes);
app.use('/checkout', checkoutRoutes);

>>>>>>> Stashed changes


>>>>>>> Stashed changes
>>>>>>> omri
>>>>>>> parent of b970514 (Update app.js)

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
