const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { Post, User } = require("../db");
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
  const response = await Post.find({});

  res.json({
    blogs: response,
  });
});

router.get("/users", authMiddleware, async (req, res) => {
  const users = await User.find({ role: "user" });

  // Respond with the list of users
  res.json({ users });
});

router.get("/admins", authMiddleware, async (req, res) => {
  const currentAdminId = req._id;

  // Find all users with the role "admin" excluding the current admin
  const admins = await User.find({
    role: "admin",
    _id: { $ne: currentAdminId },
  });

  // Respond with the list of admins
  res.json({ admins });
});

router.get("/publishedCourses", authMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.username,
  });

  const blogs = await Post.find({
    _id: {
      $in: user.author,
    },
  });

  res.json({
    blogs: blogs,
  });
});

module.exports = router;
