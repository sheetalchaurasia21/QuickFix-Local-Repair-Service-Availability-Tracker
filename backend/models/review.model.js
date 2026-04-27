import mongoose from "mongoose";
import Provider from "./provider.model.js";
import Customer from "./customer.model.js";

const reviewSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },

  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },

  comment: {
    type: String,
    default: "",
  }

}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);