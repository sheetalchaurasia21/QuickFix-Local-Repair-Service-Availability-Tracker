import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true
  },

  serviceRequested: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "rejected", "ongoing", "completed"],
    default: "pending"
  },

  price: Number
},
{ timestamps: true }
);

const Booking= mongoose.model("Booking", bookingSchema);
export default Booking