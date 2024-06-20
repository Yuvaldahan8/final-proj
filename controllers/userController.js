const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Render login page
exports.renderLogin = (req, res) => {
    res.render("login");
};

exports.login = async (req, res) => {
    // חילוץ של המשתנים email ו-password מהגוף של הבקשה (request body)
    const { email, password } = req.body;
   // חיפוש משתמש בבסיס הנתונים לפי כתובת האימייל שסופקה
    const user = await User.findOne({ email });
   // אם נמצא משתמש והסיסמה שסופקה תואמת לסיסמה המוצפנת בבסיס הנתונים
    if (user && (await bcrypt.compare(password, user.password))) {
        // שמירת פרטי המשתמש בסשן של הבקשה
        req.session.user = user;
        
        // בדיקת תפקיד המשתמש והפניה לדף המתאים
        if (user.role === "admin") {
            res.redirect("/admin/dashboard");
        } else {
            res.redirect("/");
        }
    } else {
        // אם לא נמצא משתמש או הסיסמה לא תואמת, הצגת שגיאה בדף ההתחברות
        res.render("login", { error: "Invalid email or password" });
    }
};
