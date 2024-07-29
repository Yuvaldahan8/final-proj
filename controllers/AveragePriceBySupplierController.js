const Product = require('../models/product');

exports.getAveragePriceBySupplier = async (req, res) => {
    try {
        const averagePriceBySupplier = await Product.aggregate([
            {
                $group: {
                    _id: "$supplier",
                    averagePrice: { $avg: "$price" }
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
        res.json(averagePriceBySupplier);
    } catch (error) {
        res.status(500).send(error);
    }
};
