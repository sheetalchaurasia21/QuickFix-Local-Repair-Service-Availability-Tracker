import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  mobile: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["customer", "provider"],
    required: true
  },

  // 👇 Customer-only fields
  address: {
    street: String,
    city: String,
    pincode: String
  },

  // 👇 Provider-only fields
  serviceType: {
    type: [String]
  },

  availability: {
    isAvailable: {
      type: Boolean,
      default: true
    },
    slots: [
      {
        date: String,
        time: String
      }
    ]
  },

  rating: {
    type: Number,
    default: 0
  }

},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;