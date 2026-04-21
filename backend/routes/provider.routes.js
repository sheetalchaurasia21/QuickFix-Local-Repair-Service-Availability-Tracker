import express from "express";
import {
  signupProvider,
  loginProvider,
  logoutProvider,
  updateProviderProfile,
  getAllProviders,
  searchProviderByName,
  toggleAvailability,
  searchByService,
  getCurrentUser
} from "../controllers/provider.controller.js";

import auth from "../middlewares/auth.middleware.js";

const providerRouter = express.Router();

providerRouter.post("/signup", signupProvider);
providerRouter.post("/login", loginProvider);
providerRouter.post("/logout", auth, logoutProvider);
providerRouter.put("/update-profile", auth, updateProviderProfile);
providerRouter.get("/me", auth, getCurrentUser);
providerRouter.get("/", auth, getAllProviders);
providerRouter.get("/search", auth, searchProviderByName);      // ?name=abc
providerRouter.get("/service", auth, searchByService);          // ?service=plumber
providerRouter.patch("/toggle-availability", auth, toggleAvailability);

export default providerRouter;