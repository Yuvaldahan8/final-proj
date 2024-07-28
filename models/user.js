const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    accountId: { type: String, unique: true, sparse: true }, // עבור פייסבוק וחשבונות אחרים
    name: { type: String, required: true },
    email: { type: String, required: function() { return this.provider !== 'facebook'; }, unique: true, sparse: true }, // לא חובה עבור פייסבוק
    password: { type: String, required: function() { return this.provider !== 'facebook'; } }, // לא חובה עבור פייסבוק
    role: { type: String, enum: ["admin", "user", "supplier"], default: "user" },
    provider: { type: String, default: 'local' } // ברירת מחדל - משתמש רגיל
});

module.exports = mongoose.model("User", UserSchema);
