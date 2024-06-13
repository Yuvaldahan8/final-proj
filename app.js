const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const connectDB = require("./config");

// Routes
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
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

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
