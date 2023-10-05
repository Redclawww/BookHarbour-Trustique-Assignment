const express = require("express");
const Book = require("../models/BookListing")
const router = express.Router();

router.get("/bookdata", async (req, res) => {
  try {
    const data = await Book.find({});
    res.send(data)
  } catch (error) {
    console.error(error.message);
    res.send("server error");
  } 
});

module.exports = router;
