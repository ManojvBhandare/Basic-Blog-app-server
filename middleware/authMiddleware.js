const jwt = require("jsonwebtoken");
const { JWT_Secret } = require("../config");

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  const decodedValue = jwt.verify(token, JWT_Secret);
  if (decodedValue.username) {
    req.username = decodedValue.username;
    req.id = decodedValue._id;
    next();
  } else {
    res.status(403).json({
      msg: "User not verified",
    });
  }
}

module.exports = authMiddleware;
