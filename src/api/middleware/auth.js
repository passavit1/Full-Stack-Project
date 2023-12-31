const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required");
  }

  console.log("auth running");
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;

    if (req.user.role === "admin") {
      return next(); // Allow access for admin
    } else {
      return res.status(403).send("Unauthorized");
    }
  } catch (error) {
    return res.status(401).send("Invalid token: " + error.message);
  }
};

module.exports = verifyToken;
