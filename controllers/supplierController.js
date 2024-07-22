const Supplier = require('../models/supplier');


exports.createSupplier = async (req, res) => {
    const supplier = new Supplier(req.body);
    try {
        const newSupplier = await supplier.save();
        res.status(201).json(newSupplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateSupplier = async (req, res) => {
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSupplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteSupplier = async (req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        res.json({ message: 'The supplier has been successfully deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.renderSupplierSignup = (req, res) => {
    res.render("supplierSignup", { error: '' });
};

exports.signupSupplier = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.render("supplierSignup", { 
            error: "One or more of the required fields are missing"
        });
    }

    const existingSupplier = await Supplier.findOne({ email });
    if (existingSupplier) {
        return res.render("supplierSignup", { 
            error: "Supplier already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSupplier = new Supplier({
        name,
        email,
        role: 'Supplier',
        password: hashedPassword
    });

    await newSupplier.save();
    res.redirect("/login?message=Supplier created successfully");
};
