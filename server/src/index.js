const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// api config
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// middleware

app.use(express.json());
app.use(cors());

// db config

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

// api endpoint

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.use("/api/users", require("./routes/user"));

app.get("*", (req, res) => {
  res.send("404");
});

// listen

app.listen(port, () => console.log("listening on localhost:3001"));
