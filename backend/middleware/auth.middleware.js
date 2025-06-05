import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password"); // ✅ fetch full user

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user; // ✅ attaches full user to req.user

    next(); // move to the next middleware/controller
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default protectRoute;
