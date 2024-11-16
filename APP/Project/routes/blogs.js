const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { readData, writeData } = require("../utils/fileOps");

const router = express.Router();
const BLOGS_FILE = "./data/blogs.json";

// Post a blog
router.post("/", (req, res) => {
  const { userId, title, content } = req.body;
  const blogs = readData(BLOGS_FILE);

  const newBlog = {
    id: uuidv4(),
    userId,
    title,
    content,
    likes: [],
    createdAt: new Date(),
  };

  blogs.push(newBlog);
  writeData(BLOGS_FILE, blogs);

  res.status(201).json({ message: "Blog posted successfully.", blog: newBlog });
});

// Like or dislike a blog
router.post("/:id/like", (req, res) => {
  const { userId } = req.body;
  const blogId = req.params.id;
  const blogs = readData(BLOGS_FILE);

  const blog = blogs.find((b) => b.id === blogId);
  if (!blog) return res.status(404).json({ message: "Blog not found." });

  if (blog.likes.includes(userId)) {
    // Dislike
    blog.likes = blog.likes.filter((id) => id !== userId);
    writeData(BLOGS_FILE, blogs);
    return res.status(200).json({ message: "Disliked blog successfully." });
  } else {
    // Like
    blog.likes.push(userId);
    writeData(BLOGS_FILE, blogs);
    return res.status(200).json({ message: "Liked blog successfully." });
  }
});

module.exports = router;
