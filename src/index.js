const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 8080

// Route to be tested
app.get('/', (req, res) => {
    return res.status(200).json({ nome: 'Handsome Charles Sin' });
});

app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
});

app.post("/api/login", (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: "test",
        email: "test@gmail.com"
    };

    jwt.sign({ user }, "secretkey", { expiresIn: "60m" }, (err, token) => {
        res.status(200).json({
            token
        });
    });
});

app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "Post created...",
                authData
            });
        }
    });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        // Split at the space
        const bearer = bearerHeader.split(" ");
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

// Application running on the door
let server = app.listen(port, () => {
    console.log(`Application running on ${port}`);
});

module.exports = server;