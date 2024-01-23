const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { JWT_Secret } = require("../config");

router.post("/signup", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  await User.create({
    username: username,
    password: password,
    role: role,
  });

  res.json({
    msg: "User created successfully!",
  });
});

router.post("/login", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.find({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign({ username }, JWT_Secret);

    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      Message: "User not found",
    });
  }
});

module.exports = router;
