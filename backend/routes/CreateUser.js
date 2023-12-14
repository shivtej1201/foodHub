const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "projectonmernstack";

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 2 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //password hashing bcrypt
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        phone: req.body.phone,
        email: req.body.email,
        location: req.body.location,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//login user
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "try Loggon with correct credentials" });
      }

      const hashedPassword = userdata.password;

      const pwdCompare = await bcrypt.compare(password, hashedPassword);
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "try Loggon with  correct password credentials" });
      }

      const data = {
        user: {
          id: userdata.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
