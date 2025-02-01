const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    next();
  } catch (err) {
    console.error('JWT error:', err);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
