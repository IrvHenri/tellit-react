const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const authHeader = req.header("auth-token");
  const token = authHeader;
  if (!token) return res.status(401).json("No token provided");

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      res.status(401).json("Unauthorized access");
    }

    req.userId = decoded._id;
    next();
  });
};

module.exports = validateToken;
