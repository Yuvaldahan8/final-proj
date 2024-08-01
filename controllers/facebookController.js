exports.renderFacebook = (req, res) => {
    const user = req.session.user;
    res.render("facebook", { user });
};