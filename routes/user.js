const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { User, Post } = require("../db");
const { JWT_Secret } = require("../config");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.post("/posts", authMiddleware, async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const published = req.body.published;

  const newBlog = await Post.create({
    title,
    content,
    published,
  });

  res.json({
    msg: "New blog created Successfully!",
    newBlog,
  });
});

router.get("/posts", authMiddleware, async (req, res) => {
  const response = await Post.find({ published: true });

  res.json({
    blogs: response,
  });
});

router.get("/posts/:postId", authMiddleware, async (req, res) => {
  const postId = req.params.postId;
  const response = await Post.find({ _id: postId });

  res.json({
    blogs: response,
  });
});

module.exports = router;
