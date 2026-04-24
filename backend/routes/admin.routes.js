import express from "express";
import {
  signupAdmin,
  loginAdmin,
  logoutAdmin
} from "../controllers/admin.controller.js";

import auth from "../middleware/auth.middleware.js";

const adminRouter = express.Router();

adminRouter.post("/signup", signupAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", auth, logoutAdmin);

adminRouter.get("/bookings", auth, (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, (req, res) => {
  res.redirect("/api/booking"); 
});

export default adminRouter;