const mongoose = require("mongoose");
require('dotenv').config();

const mongoURI = process.env.DATABASE;

const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) console.log("---", err);
      else {
        console.log("Database Connected Successfully");
      }
    }
  );
};

module.exports = mongoDB;
