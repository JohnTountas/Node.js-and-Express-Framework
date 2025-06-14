const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return res.sendStatus(401); // Unauthorized error

  console.log(authHeader); // Bearer token

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Token has been Expired!");
    }
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
