import Provider from "../models/provider.model";
import Review from "../models/review.model.js";


export const addReview = async (req, res) => {
  try {
    const { providerId, rating, comment } = req.body;
    const customerId = req.user.id; // from auth middleware

    // 🔥 Validation
    if (!providerId || !rating) {
      return res.status(400).json({ message: "Provider & rating required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1-5" });
    }

    // 🔒 Prevent duplicate review
    const existing = await Review.findOne({
      customer: customerId,
      provider: providerId,
    });

    if (existing) {
      return res.status(400).json({ message: "You already reviewed this provider" });
    }

    // ✅ Create review
    const review = await Review.create({
      customer: customerId,
      provider: providerId,
      rating,
      comment,
    });

    // 🔄 Recalculate provider rating
    const stats = await Review.aggregate([
      { $match: { provider: review.provider } },
      {
        $group: {
          _id: "$provider",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    await Provider.findByIdAndUpdate(providerId, {
      rating: stats[0]?.avgRating || 0,
      totalReviews: stats[0]?.totalReviews || 0,
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getReviewsByCustomer = async (req, res) => {
  try {
    const customerId = req.user.id; // from auth middleware

    const reviews = await Review.find({ customer: customerId })
      .populate("provider", "name serviceType") // show provider info
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: reviews.length,
      reviews,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getReviewsForProvider = async (req, res) => {
  try {
    const { providerId } = req.params;

    const reviews = await Review.find({ provider: providerId })
      .populate("customer", "name") // show customer name
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      total: reviews.length,
      reviews,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};