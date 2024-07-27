const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true},
    address: {type: String}, 
    phone: {type: String},
    email: {type: String, required: true, unique: true}
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
