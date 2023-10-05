const express = require("express");
const user = require("../models/user");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
global.secretJWT = "jahwvchgasvdbcguwabcuabcouawbcecauswf1234$";
const jwtsecret = global.secretJWT;

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
      await user.create({
        email: req.body.email,
        password: secPassword,
      }).then(user=>{
        const data = {
          user: {
              id: user._id
          }
      }
        const authToken = jwt.sign(data, jwtsecret);
          success = true;
          res.json({ success, authToken })
      }).catch(err =>{
        console.log(err);
        res.json({ error: "Please enter a unique value." })
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

// router.post("/forgot-password",async(res,req)=>{
//   const {email} = req.body;
//  const tempuser = await user.findOne({email: email})

// // When User does not Exist
//   if(!tempuser){
//     res.json({success: false})
//     return;
//   }

// // user exists.. Creating a one time link to chnage password

//  const secret = jwtsecret + tempuser.password;
//  const payload ={
//   email: email,
//   id : tempuser._id
//  }

//  const token = jwt.sign(payload, secret,{expiresIn: '15m'})

//  const link = `http://localhost:5000/reset-password/${user._id}/${token}`

//  res.sent({success: true});

// });

// router.post('/reset-password',(res,req)=>{

// })

// router.get('/reset-password',(res,req)=>{
  
// })

module.exports = router;
