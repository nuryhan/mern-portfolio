const router = require("express").Router();
const userController = require("../controllers/userController");
const { auth } = require("../middlewares/auth");

// register
router.post("/register", userController.registerUser);

// login
router.post("/login", userController.loginUser);

// verify
router.get("/verify", auth, userController.verifiedToken);

module.exports = router;
