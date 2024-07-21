const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    cart: {type: Array , default:[]},
    //להוסיף פה מערך של מוצרים שיש ללקוח בסל עם אפשרויות עריכה לכל מוצרוכל הדרישות שכתובות בדף על המודלים
});

module.exports = mongoose.model("User", UserSchema);
