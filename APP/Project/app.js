const express = require("express");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const blogRoutes = require("./routes/blogs");
const commentRoutes = require("./routes/comments");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
