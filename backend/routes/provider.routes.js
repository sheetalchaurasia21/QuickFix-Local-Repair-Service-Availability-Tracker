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
  getCurrentUser,
  searchProviders
} from "../controllers/provider.controller.js";

import auth from "../middlewares/auth.middleware.js";
import { getReviewsForProvider } from "../controllers/review.controller.js";

const providerRouter = express.Router();

providerRouter.post("/signup", signupProvider);
providerRouter.post("/login", loginProvider);
providerRouter.post("/logout", auth, logoutProvider);
providerRouter.put("/update-profile", auth, updateProviderProfile);
providerRouter.get("/me", auth, getCurrentUser);
providerRouter.get("/search", auth, searchProviderByName);      // ?name=abc
providerRouter.get("/service", auth, searchByService);          // ?service=plumber
providerRouter.get("/", auth, getAllProviders);
providerRouter.patch("/toggle-availability", auth, toggleAvailability);
providerRouter.get("/search-all", auth, searchProviders);
router.get("/reviews", authMiddleware, async (req, res) => {
  req.params.providerId = req.user.id; // 👈 inject providerId
  return getReviewsForProvider(req, res);
});

export default providerRouter;