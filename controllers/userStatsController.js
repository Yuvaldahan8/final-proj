const User = require('../models/user');

exports.getUserCountsByRole = async (req, res) => {
    try {
        const userCounts = await User.aggregate([
            {
                $group: {
                    _id: "$role",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json(userCounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
