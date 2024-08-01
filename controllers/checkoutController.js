<<<<<<< Updated upstream
exports.getCheckoutPage = (req, res) => {
    res.render('checkout'); 
};

exports.postOrder = (req, res) => {
    res.send('Order submitted successfully');
=======

exports.renderCheckoutPage = (req, res) => {
    res.render('checkout');
};

exports.handleFormSubmission = (req, res) => {
    console.log(req.body);
    
    res.redirect('/checkout');
>>>>>>> Stashed changes
};
