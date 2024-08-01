exports.getCheckoutPage = (req, res) => {
    res.render('checkout'); 
};

exports.postOrder = (req, res) => {
    res.send('Order submitted successfully');
};
