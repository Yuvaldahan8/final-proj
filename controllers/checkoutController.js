exports.getCheckoutPage = (req, res) => {
    res.render('checkout');
};

exports.postOrder = (req, res) => {
    res.redirect('/checkout'); 
};
