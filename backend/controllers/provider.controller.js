import Provider from "../models/provider.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Review from "../models/review.model.js";
import Booking from "../models/booking.model.js";

export const signupProvider = async (req, res) => {
  try {
    const { name, email, password, phone, serviceType, availability, profileImage, city,state } = req.body;

    if (!name || !email || !password || !phone || !serviceType) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const emailLower = email.toLowerCase();

    const existing = await Provider.findOne({ email: emailLower });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newProvider = await Provider.create({
      name,
      email: emailLower,
      password: hashedPassword,
      phone,
      serviceType,
      availability,
      profileImage: profileImage || "",
      address: {
        city: city || "",
        state: state || ""
      }
    });

    const token = jwt.sign(
      { id: newProvider._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const userResponse = newProvider.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "Provider registered",
      user: userResponse
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginProvider = async (req, res) => {
  try {
    const { email, password } = req.body;

    const provider = await Provider.findOne({ email: email.toLowerCase() });
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: provider._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const userResponse = provider.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: "Login successful",
      // user: userResponse
      user: userResponse,
      token
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logoutProvider = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
      secure: false
    });

    res.status(200).json({ message: "Logged out successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProviderProfile = async (req, res) => {
  try {
    const providerId = req.user.id;

    const { name, email, phone, serviceType, availability, profileImage, city, state } = req.body;

    if (email) {
      const emailLower = email.toLowerCase();
      const existing = await Provider.findOne({ email: emailLower });
      if (existing && existing._id.toString() !== providerId) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    const updateData = {
      ...(name && { name }),
      ...(email && { email: email.toLowerCase() }),
      ...(phone && { phone }),
      ...(serviceType && { serviceType }),
      ...(availability && { availability }),
      ...(profileImage && { profileImage }),
      ...(city && { "address.city": city }),
      ...(state && { "address.state": state })
    };

    const updated = await Provider.findByIdAndUpdate(
      providerId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.status(200).json({
      message: "Profile updated",
      user: updated
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find().select("-password");
    res.status(200).json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const searchProviderByName = async (req, res) => {
  try {
    const { name } = req.query;

    const providers = await Provider.find({
      name: { $regex: name, $options: "i" }
    }).select("-password");

    res.status(200).json(providers);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProviderById = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await Provider.findById(id);

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.status(200).json(provider);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const toggleAvailability = async (req, res) => {
  try {
    const providerId = req.user.id;

    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    provider.isAvailableNow = !provider.isAvailableNow;
    await provider.save();

    res.status(200).json({
      message: "Availability updated",
      isAvailableNow: provider.isAvailableNow
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCurrentUser = async(req, res) =>{
  try {
    // assuming middleware adds user id → req.user.id
    const user = await Provider.findById(req.user.id).select("-password");

    // let { id }= req.params
    // const user = await Customer.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const searchByService = async (req, res) => {
  try {
    const { service } = req.query;

    const providers = await Provider.find({
      serviceType: { $regex: service, $options: "i" },
    });

    res.status(200).json(providers);

  } catch (err) {
    res.status(500).json({ message: "Error searching providers by service" });
  }
};

export const getMyProviderBookings = async (req, res) => {
  try {
    const providerId = req.user.id;

    const bookings = await Booking.find({ providerId })
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    res.json({
      count: bookings.length,
      bookings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchProviders = async (req, res) => {
  try {
    const { service, city } = req.query;

    let query = {};

    // ✅ Service filter (case-insensitive)
    if (service) {
      query.serviceType = { $regex: service, $options: "i" };
    }

    // ✅ City filter (inside address or separate field)
    if (city) {
      query["address.city"] = { $regex: city, $options: "i" };
      // OR if you store city directly:
      // query.city = { $regex: city, $options: "i" };
    }

    const providers = await Provider.find(query).select("-password");

    res.status(200).json(providers);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};