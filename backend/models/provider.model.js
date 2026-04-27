import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  day: {
    type: String, // e.g., "Monday"
    required: true,
    default:"All"
  },
  startTime: {
    type: String, // "09:00"
    required: true
  },
  endTime: {
    type: String, // "18:00"
    required: true
  }
}, { _id: false });

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },

  serviceType: [{
    type: String, // e.g., ["plumber", "electrician"]
    required: true
  }],

  availability: [availabilitySchema],

  isAvailableNow: {
    type: Boolean,
    default: false // 🔥 MAIN USP (real-time toggle)
  },

  profileImage: {
    type: String,
    default: ""
  },

  rating: {
    type: Number,
    default: 0
  },

  jobsCompleted: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});

const Provider = mongoose.model("Provider", providerSchema);
export default Provider;