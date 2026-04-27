import Admin from "../models/admin.model.js";
import Booking from "../models/booking.model.js";
import Customer from "../models/customer.model.js";
import Provider from "../models/provider.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashed
    });

    res.status(201).json({ message: "Admin created" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    res.status(200).json({ message: "Admin login successful" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logoutAdmin = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({ message: "Logged out" });
};



// DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const ongoingBookings = await Booking.countDocuments({ status: "ongoing" });

    const totalCustomers = await Customer.countDocuments();
    const totalProviders = await Provider.countDocuments();
const completedBookings = await Booking.countDocuments({
  status: "completed"
});

const cancelledBookings = await Booking.countDocuments({
  status: "cancelled"
});

res.status(200).json({
  stats: {
    totalBookings,
    ongoingBookings,
    completedBookings,
    cancelledBookings,
    totalCustomers,
    totalProviders
  },
  bookings
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// MONTHLY ANALYTICS (Bookings per month)
export const getMonthlyBookings = async (req, res) => {
  try {
    const data = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 👥 ALL CUSTOMERS
export const getAllCustomersAdmin = async (req, res) => {
  try {
    const users = await Customer.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🛠 ALL PROVIDERS
export const getAllProvidersAdmin = async (req, res) => {
  try {
    const providers = await Provider.find().select("-password");
    res.status(200).json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 📦 ALL BOOKINGS
export const getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("providerId", "name serviceType");

    res.status(200).json(bookings);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};