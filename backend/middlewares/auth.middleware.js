import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔥 Check header exists
    if (!authHeader) {
      return res.status(401).json({ message: "Not Logged In" });
    }

    // 🔥 Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // 🔥 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id: ... }

    next();
  } catch (err) {
    console.log("AUTH ERROR 👉", err.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default auth;