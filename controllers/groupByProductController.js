const Product = require('../models/product');

exports.getProductsGroupedBySupplier = async (req, res) => {
    try {
        const productsGroupedBySupplier = await Product.aggregate([
            {
                $group: {
                    _id: "$supplier",
                    products: { $push: "$$ROOT" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "supplier"
                }
            },
            { $unwind: "$supplier" }
        ]);
        res.json(productsGroupedBySupplier);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getProductsGroupedByCategory = async (req, res) => {
    try {
        const productsGroupedByCategory = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    products: { $push: "$$ROOT" }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind: "$category" }
        ]);
        res.json(productsGroupedByCategory);
    } catch (error) {
        res.status(500).send(error);
    }
};
