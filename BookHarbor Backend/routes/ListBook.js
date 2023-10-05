const express = require("express");
const router = express.Router();
const book = require("../models/BookListing");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type"],
    allowedMethods: ["GET", "POST"],
  })
);

router.post("/ListBook", async (req, res) => {
  const decodedToken = jwt.verify(req.body.token, global.secretJWT);
  const userId = decodedToken.user.id;
  let success = false;
  try {
    await book
      .create({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        price: req.body.price,
        user_Id: userId,
      })
      .then(() => {
        success = true;
        res.json({ success });
      });
  } catch (error) {
    console.log(error);
    res.json({ success });
  }
});

module.exports = router;