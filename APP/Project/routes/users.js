const express = require("express");
const { readData, writeData } = require("../utils/fileOps");

const router = express.Router();
const USERS_FILE = "./data/users.json";

// Follow or unfollow user
router.post("/follow/:id", (req, res) => {
  const { userId } = req.body;
  const targetId = req.params.id;

  const users = readData(USERS_FILE);
  const user = users.find((u) => u.id === userId);
  const target = users.find((u) => u.id === targetId);

  if (!user || !target) return res.status(404).json({ message: "User not found." });

  if (user.following.includes(targetId)) {
    // Unfollow
    user.following = user.following.filter((id) => id !== targetId);
    target.followers = target.followers.filter((id) => id !== userId);
    writeData(USERS_FILE, users);
    return res.status(200).json({ message: "Unfollowed successfully." });
  } else {
    // Follow
    user.following.push(targetId);
    target.followers.push(userId);
    writeData(USERS_FILE, users);
    return res.status(200).json({ message: "Followed successfully." });
  }
});

module.exports = router;
