const userSchema = require("../models/userModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = {
  // register
  registerUser: async (req, res) => {
    const { username, email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (user) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const newUser = new userSchema({
      username: username,
      email: email,
      password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    });

    try {
      const savedUser = await newUser.save();
      res.status(201).json({ msg: "Registration successful!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   login
  loginUser: async (req, res) => {
    try {
      const user = await userSchema.findOne({ email: req.body.email });
      !user && res.status(401).json({ msg: "User doesn't exist" });

      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      req.body.password !== OriginalPassword &&
        res.status(401).json({ msg: "Incorrect Password" });

      const token = jwt.sign(
        {
          id: user._id,
          name: user.username,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );

      const { password, ...others } = user._doc;

      res.status(200).json({ token: token });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  //   verifytoken
  verifiedToken: (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
        if (err) return res.send(false);
        // console.log("ver", verified);
        const user = await userSchema.findById(verified.id);
        if (!user) return res.send(false);

        return res.send(true);
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userController;
