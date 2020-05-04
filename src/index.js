const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 8080;

const loginRouter = require("./routes/login");
const postsRouter = require("./routes/posts");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet()); // set up helmet

app.use("/", loginRouter);
app.use("/", postsRouter);

// Route to be tested
app.get("/", (req, res) => {
  return res.status(200).json({ nome: "Handsome Charles Sin" });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

// Application running on the door
let server = app.listen(port, () => {
  console.log(`Application running on ${port}`);
});

module.exports = server;
