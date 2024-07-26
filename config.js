const mongoose = require("mongoose");

let uri = 'mongodb+srv://sagivsa:test1234@nursery.lagwrwp.mongodb.net/?retryWrites=true&w=majority&appName=Nursery'

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB Connected...");
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};

module.exports = connectDB;
