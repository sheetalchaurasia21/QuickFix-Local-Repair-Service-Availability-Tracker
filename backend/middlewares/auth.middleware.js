import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "Not Logged In" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("AUTH ERROR 👉", err.message);
    return res.status(401).send({ message: "Invalid Token" });
  }
}

export default auth;