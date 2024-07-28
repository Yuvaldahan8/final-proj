const express = require("express");
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const session = require("express-session");
const connectDB = require("./config");
const passport = require('passport'); // ייבוא passport
const User = require('./models/user'); // ייבוא מודל המשתמש
require('dotenv').config(); // ייבוא משתני סביבה

// Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const catalogRoutes = require("./routes/catalogRoutes");
const facebookAuthRoutes = require("./routes/facebookAuth"); // ייבוא מסלול אימות פייסבוק


const app = express();

// Connect to MongoDB
connectDB();

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


// הגדרות Passport
app.use(passport.initialize());
app.use(passport.session());

// פונקציות serializeUser ו- deserializeUser
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
app.set('views', __dirname + '/views');


// Routes
app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.use("/supplier", supplierRoutes);
app.use("/catalog", catalogRoutes);
app.use(express.static('public'));
app.use('/auth/facebook', facebookAuthRoutes);




// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
