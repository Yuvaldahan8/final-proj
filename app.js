const express = require("express");
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const session = require("express-session");
const connectDB = require("./config");

// Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const supplierroutes = require("./routes/supplierroutes");

const app = express();

// Connect to MongoDB
connectDB();

// Serve static files from the 'public' directory
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
app.use("/supplier", supplierroutes);

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
