const express = require("express");
const jwt = require("jsonwebtoken");
const findUser = require("../utils/findUser");

const router = express.Router();

router.post("/api/login", (req, res) => {
  var users = findUser(req.body.name, req.body.password);

  if (users) {
    jwt.sign({ users }, "secretkey", { expiresIn: "60m" }, (err, token) => {
      res.status(200).json({
        token,
      });
    });
  } else {
    // Forbidden
    res.sendStatus(403).json({
      error: "name or password invaild",
    });
  }
});

module.exports = router;
