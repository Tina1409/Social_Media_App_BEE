const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { readData, writeData } = require("../utils/fileOps");

const router = express.Router();
const COMMENTS_FILE = "./data/comments.json";

// Add a comment
router.post("/:blogId", (req, res) => {
  const { userId, content } = req.body;
  const blogId = req.params.blogId;

  const comments = readData(COMMENTS_FILE);

  const newComment = {
    id: uuidv4(),
    blogId,
    userId,
    content,
    replies: [],
    createdAt: new Date(),
  };

  comments.push(newComment);
  writeData(COMMENTS_FILE, comments);

  res.status(201).json({ message: "Comment added successfully.", comment: newComment });
});

// Add a reply
router.post("/:id/replies", (req, res) => {
  const { userId, content } = req.body;
  const commentId = req.params.id;

  const comments = readData(COMMENTS_FILE);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) return res.status(404).json({ message: "Comment not found." });

  const newReply = {
    id: uuidv4(),
    userId,
    content,
    createdAt: new Date(),
  };

  comment.replies.push(newReply);
  writeData(COMMENTS_FILE, comments);

  res.status(201).json({ message: "Reply added successfully.", reply: newReply });
});

module.exports = router;
