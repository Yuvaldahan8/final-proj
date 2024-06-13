const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/nursery");
        console.log("MongoDB Connected...");
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};

module.exports = connectDB;
