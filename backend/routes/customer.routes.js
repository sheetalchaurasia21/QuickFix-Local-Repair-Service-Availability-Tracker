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
  deleteUser
} from "../controllers/customer.controller.js";

import auth from "../middlewares/auth.middleware.js";

const customerRouter = express.Router();

customerRouter.post("/signup", signupCustomer);
customerRouter.post("/login", loginCustomer);
customerRouter.post("/logout", auth, logoutCustomer);
customerRouter.put("/update-profile", auth, updateProfile);
customerRouter.get("/search", auth, searchUserByName);
customerRouter.get("/me", auth, getCurrentUser);  
customerRouter.get("/", auth, getAllUsers);
customerRouter.get("/:id", auth, getUserByID);     
customerRouter.delete("/:id", auth, deleteUser);

export default customerRouter;