const Product = require('../models/product');

exports.getProductsGroupedBySupplier = async (req, res) => {
    try {
        const productsGroupedBySupplier = await Product.aggregate([
            {
                $group: {
                    _id: "$supplier",
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "supplierDetails"
                }
            },
            { $unwind: "$supplierDetails" }
        ]);

        res.render('charts/productsGroupedBySupplier', {
            productsGroupedBySupplier
        });
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
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            { $unwind: "$categoryDetails" }
        ]);

        res.render('charts/productsGroupedByCategory', {
            productsGroupedByCategory
        });
    } catch (error) {
        res.status(500).send(error);
    }
};
