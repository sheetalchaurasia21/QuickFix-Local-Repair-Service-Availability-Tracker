import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
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

  serviceType: {
    type: [String],
    required: true
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

const Provider= mongoose.model("Provider", providerSchema);
export default Provider