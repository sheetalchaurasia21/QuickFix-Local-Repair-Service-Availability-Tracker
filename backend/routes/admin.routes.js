import express from "express";
import {
  signupAdmin,
  loginAdmin,
  logoutAdmin,
  getDashboardStats,
  getMonthlyBookings,
  getAllCustomersAdmin,
  getAllProvidersAdmin,
  getAllBookingsAdmin
} from "../controllers/admin.controller.js";

import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);
router.post("/logout", auth, logoutAdmin);

// ADMIN CHECK MIDDLEWARE
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
router.get("/dashboard", auth, isAdmin, getDashboardStats);
router.get("/analytics/monthly", auth, isAdmin, getMonthlyBookings);
router.get("/customers", auth, isAdmin, getAllCustomersAdmin);
router.get("/providers", auth, isAdmin, getAllProvidersAdmin);
router.get("/bookings", auth, isAdmin, getAllBookingsAdmin);

export default router;