const mongoDB = require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;

mongoDB();

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type"],
    allowedMethods: ["GET", "POST"],
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use("/api", require("./routes/createuser"));

app.use("/api", require("./routes/ListBook"));

app.use("/api", require("./routes/DisplayData"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
