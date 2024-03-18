const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = "Arkot";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [
  { username: "Arkot", password: "notqwerty" }
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.json({ success: true, token, username });
  } else {
    res.json({ success: false });
  }
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json({ error: "No token provided." });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Failed to authenticate token." });

    req.username = decoded.username;
    next();
  });
}

app.get("/protected", verifyToken, (req, res) => {
  res.send(`Hello, ${req.username}!`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`JWT app listening on port ${PORT}`);
});
