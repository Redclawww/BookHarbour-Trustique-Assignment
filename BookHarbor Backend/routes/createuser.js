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

const resetPasswordMail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "redclaww02@gmail.com",
      port: process.env.PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
    });

    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: "reset password",
      html: `<p> Hy there, Please copy the link and <a href="https://book-harbor.onrender.com/api/reset-password?${token}">  reset your password</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Mail has been send", info.response);
      }
    });
  } catch (error) {
    res.sendStatus(400).send({ success: false, msg: error.message });
  }
};

router.post("/forgot-password", async (req, res) => {
  try {
    const email = req.body.email;
    const tempuser = await user.findOne({ email: email, msg: error.message });

    if (tempuser) {
      const randomStr = randomString.generate();
      await user.updateOne({ email: email }, { $set: { token: randomStr } });
      resetPasswordMail(tempuser.email, randomStr);
      res
        .sendStatus(200)
        .send({ success: true, msg: "reset link has been sent to your mail" });
    } else {
      res
        .sendStatus(200)
        .send({ success: true, msg: "This email does not exist" });
    }
  } catch (error) {
    res.sendStatus(404).send({ success: false, msg: error.message });
  }
});

router.get("/reset-password", async (req, res) => {
  try {
    const token = req.query.token;
    const tempData = await user.findOne({ token: token });
    if (tempData) {
      const password = req.body.password;
      let secPassword = await bcrypt.hash(password, salt);
      const userdata = await user.findByIdAndUpdate(
        { _id: tempData._id },
        { $set: { password: secPassword, token, token: "" } },
        { new: true }
      );
      res
        .status(200)
        .json({ success: true, msg: "User password has been reset",data: userdata });
    } else {
      return res
        .status(200)
        .json({ success: true, msg: "This link has been expired" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
});

module.exports = router;
