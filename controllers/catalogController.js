const Category = require("../models/category");
const Product = require("../models/product");
const User = require("../models/user");

exports.renderCatalog = async (req, res) => {
    if (!req.session.user) {
        res.redirect("/login?message=User is not logged in"); 
    }
    else {
        const user = req.session.user;
        if (user.role !== 'user') {
            res.redirect("/login?message=User is not logged in as user"); 
        }
        else {
            const categories = await Category.find();
            const suppliers = await User.find({ role: 'supplier' });
            
            // הוספת קוד לסינון לפי קטגוריה, שם ומחיר ספציפי
            let query = {}; // הוספת שורה זו
            if (req.query.category) { // הוספת שורה זו
                query.category = req.query.category; // הוספת שורה זו
            } // הוספת שורה זו
            if (req.query.name) { // הוספת שורה זו
                query.name = { $regex: req.query.name, $options: "i" }; // הוספת שורה זו
            } // הוספת שורה זו
            if (req.query.price) { // הוספת שורה זו
                query.price = req.query.price; // הוספת שורה זו
            } // הוספת שורה זו

            const products = await Product.find(query).populate('category').populate('supplier'); // שינוי השורה הזו

            res.render("catalog/catalog", { 
                user,  
                categories, 
                products, 
                suppliers,
            });
        }
    }
};

exports.getProductById = async (req, res) => {
    if (!req.session.user) {
        res.redirect("/login?message=User is not logged in"); 
    }
    else {
        const user = req.session.user;
        if (user.role !== 'user') {
            res.redirect("/login?message=User is not logged in as user"); 
        }
        else {
            const { id } = req.params;
            const categories = await Category.find();
            const suppliers = await User.find({ role: 'supplier' });
            const product = await Product.findById(id).populate('category').populate('supplier');

            res.render("catalog/product", { 
                user,  
                categories, 
                product, 
                suppliers,
            });
        }
    }
};









// const Category = require("../models/category");
// const Product = require("../models/product");
// const User = require("../models/user");

// exports.renderCatalog = async (req, res) => {
//     if (!req.session.user) {
//         res.redirect("/login?message=User is not logged in"); 
//     }
//     else {
//         const user = req.session.user;
//         if (user.role !== 'user') {
//             res.redirect("/login?message=User is not logged in as user"); 
//         }
//         else {
//             const categories = await Category.find();
//             const suppliers = await User.find({ role: 'supplier' });
//             const products = await Product.find().populate('category').populate('supplier');

//             res.render("catalog/catalog", { 
//                 user,  
//                 categories, 
//                 products, 
//                 suppliers,
//             });
//         }
//     }
// };

// exports.getProductById = async(req, res) => {
//     if (!req.session.user) {
//         res.redirect("/login?message=User is not logged in"); 
//     }
//     else {
//         const user = req.session.user;
//         if (user.role !== 'user') {
//             res.redirect("/login?message=User is not logged in as user"); 
//         }
//         else {
//             const { id } = req.params;
//             const categories = await Category.find();
//             const suppliers = await User.find({ role: 'supplier' });
//             const product = await Product.findById(id).populate('category').populate('supplier');
            
//             res.render("catalog/product", { 
//                 user,  
//                 categories, 
//                 product, 
//                 suppliers,
//             });
//         }
//     }
// };
