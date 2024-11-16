const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { readData, writeData } = require("../utils/fileOps");

const router = express.Router();
const USERS_FILE = "./data/users.json";

// Register user
router.post("/register", async (req, res) => {
  const { username, password, isAdmin, isPrivate } = req.body;
  const users = readData(USERS_FILE);

  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ message: "User already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuidv4(),
    username,
    password: hashedPassword,
    isAdmin: !!isAdmin,
    isPrivate: !!isPrivate,
    followers: [],
    following: [],
  };

  users.push(newUser);
  writeData(USERS_FILE, users);

  res.status(201).json({ message: "User registered successfully." });
});

// Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = readData(USERS_FILE);

  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials." });
  }

  res.status(200).json({ message: "Login successful.", userId: user.id });
});

module.exports = router;
