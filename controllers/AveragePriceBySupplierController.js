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
                    as: "supplierDetails"
                }
            },
            { $unwind: "$supplierDetails" }
        ]);

    
        if (!averagePriceBySupplier.length) {
            return res.status(404).send("לא נמצאו נתונים");
        }

        res.render('charts/averagePriceBySupplier', {
            averagePriceBySupplier
        });
    } catch (error) {
        console.error("שגיאה ב-getAveragePriceBySupplier:", error);
        res.status(500).send(error);
    }
};
