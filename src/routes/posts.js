const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const verifyToken = require("../utils/verifyToken");

router.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403).json({ error: "Forbidden" });
    } else {
      res.json({
        message: req.body.data,
        authData,
      });
    }
  });
});

module.exports = router;
