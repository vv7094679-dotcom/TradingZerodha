const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Dummy in-memory "database"
let users = [];

// Signup route
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists!" });
  }

  users.push({ name, email, password });
  console.log("Users:", users);
  res.status(201).json({ message: "Signup successful!" });
});

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
