const express = require("express");
const user = require("../models/user");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomString = require("randomstring");
const jwtsecret = process.env.jwtSecret;

// User Signup route

router.post(
  "/createuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Invalid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await user
        .create({
          email: req.body.email,
          password: secPassword,
        })
        .then((user) => {
          const data = {
            user: {
              id: user._id,
            },
          };
          const authToken = jwt.sign(data, jwtsecret);
          success = true;
          res.json({ success, authToken });
        })
        .catch((err) => {
          console.log(err);
          res.json({ error: "Please enter a unique value." });
        });
    } catch (error) {
      console.error(error.message);
    }
  }
);

// User Login route

router.post(
  "/loginuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Invalid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let userData = await user.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }
      let pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };

      // authToken generated after verification
      console.log(user.id);
      const authToken = jwt.sign(data, jwtsecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
      });
    }
  }
);

// Resset Password Route

router.post("/forgot-password", async (req, res) => {
  let success = false;
  try {
    const email = req.body.email;
    await user.findOne({ email: email }).then(async (user) => {
      if (!user) {
        return res.json({ success });
      }
      const token = jwt.sign({ id: user._id }, process.env.jwtSecret, {
        expiresIn: "1d",
      });
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.email,
          pass: process.env.pass,
        },
      });

      var mailOptions = {
        from: "harbortest99@gmail.com",
        to: email,
        subject: "Reset your password",
        text: `http://localhost:5173/reset_password/${user._id}/${token}`,
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          success = true;
          res.json({ success });
        }
      });
    });
  } catch (error) {
    res.sendStatus(404).send({ success, msg: error.message });
  }
});
router.post("/reset-password/:id/:token", async (req, res) => {
  let success = false;
  const { id, token } = req.params;
  const { password } = req.body;
  jwt.verify(token, process.env.jwtSecret, async (err, decoded) => {
    if (err) {
      return res.json({ msg: err.message });
    } else {
      const salt = await bcrypt.genSalt(10);
      bcrypt
        .hash(password, salt)
        .then((hash) => {
          user
            .findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => {
              success = true;
              res.json({ success });
            })
            .catch((err) => res.json({ success: err.message }));
        })
        .catch((err) => res.json({ success: err.message }));
    }
  });
});

module.exports = router;
