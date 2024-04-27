const express = require("express");
const router = express.Router();




//Rendering Signup Form
router.get("/signup", (req, res) => {
    // res.render("users/signup.ejs");
});



// After entering data redirect to all listings page
router.post("/signup", async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            // req.flash("success", "Welcome to wanderlust!");
            // res.redirect("/listings");
        });
    } catch (error) {
        console.log(error.message);
        res.send(error);
    }
});


//Rendering Login Form
router.get("/login",(req, res) => {
    // res.render("users/login.ejs");
});


// After entering data redirect to all listings page
router.post("/login",async (req, res) => {
    req.flash("success", "Welcome back to wanderlust! You're logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});



module.exports = router;