exports.renderSupplier = (req, res) => {
    if (!req.session.user) {
        res.redirect("/login?message=User is not logged in"); 
    }
    else {
        const user = req.session.user;
        if (user.role !== 'supplier') {
            res.redirect("/login?message=User is not logged in as supplier"); 
        }
        else {
            res.render("supplier/supplier", { user });
        }
    }
};