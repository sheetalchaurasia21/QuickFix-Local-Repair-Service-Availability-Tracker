import express from "express";
import {
  signupCustomer,
  loginCustomer,
  logoutCustomer,
  updateProfile,
  searchUserByName,
  getUserByID,
  getAllUsers,
  getCurrentUser,
  deleteUser,
  getMyCustomerBookings
} from "../controllers/customer.controller.js";

import auth from "../middlewares/auth.middleware.js";
import { getReviewsByCustomer } from "../controllers/review.controller.js";
import upload from "../middlewares/fileupload.middleware.js";

const customerRouter = express.Router();

customerRouter.post("/signup", signupCustomer);
customerRouter.post("/login", loginCustomer);
customerRouter.post("/logout", auth, logoutCustomer);
customerRouter.put("/update-profile", auth,upload.single("profileImage"), updateProfile);
customerRouter.get("/search", auth, searchUserByName);
customerRouter.get("/me", auth, getCurrentUser);  
customerRouter.get("/", auth, getAllUsers);
customerRouter.get("/bookings", auth, getMyCustomerBookings);
customerRouter.get("/:id", auth, getUserByID);     
customerRouter.delete("/:id", auth, deleteUser);
customerRouter.get("/reviews", auth, getReviewsByCustomer);

export default customerRouter;