const express = require("express");
const router = express.Router();
 
const { signup, login, logout } = require("../controllers/user")

//For Get Routes Just Render The SignIn / SignUp Page from Views
router.get("/signin", (req, res) => {
    return res.render("signin");
});
router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.post("/signup", signup);

router.post("/signin", login);

router.post("/logout", logout);

module.exports = router;
