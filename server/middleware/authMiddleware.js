import jwt from "jsonwebtoken";

import User from "../models/User.js";

import Admin from "../models/Admin.js";

const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get full user/admin from database

    if (decoded.role === "admin") {
      req.user = await Admin.findById(decoded.id).select("-password");
    } else {
      req.user = await User.findById(decoded.id).select("-password");
    }

    next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

export default protect;