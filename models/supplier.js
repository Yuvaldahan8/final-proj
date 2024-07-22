const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user", "supplier"], default: "supplier" }, // הוספתי את "supplier" לאפשרויות
});

module.exports = mongoose.model("Supplier", SupplierSchema);
