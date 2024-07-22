const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    if (username && password) {
        req.session.user = {
            username: username,
            type: "supplier",
        };
        res.redirect("/supplier"); 
    } else {
        res.send("Invalid credentials");
    }
});

module.exports = router;
