import express from "express";
import {
  createReview,
  getReviewsForProvider,
  getReviewsByCustomer,
} from "../controllers/review.controller.js";

import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", auth, createReview);
router.get("/provider/:id", getReviewsForProvider);
router.get("/customer/me", auth, getReviewsByCustomer);

export default router;