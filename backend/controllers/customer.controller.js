import mongoose from 'mongoose'
import Customer from '../models/customer.model.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function signupCustomer(req, res) {
  try {
    const { name, email, password, phone, address , profileImage } = req.body;

    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const emailLower = email.toLowerCase();

    const existingUser = await Customer.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Customer.create({
      name,
      email: emailLower,
      password: hashedPassword,
      phone,
      address,
      profileImage
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "Signup successful",
      user: userResponse,
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function loginCustomer(req,res){
try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await Customer.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,       // JS can't access → safer
      secure: false,        // true in production (HTTPS)
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: "Login successful",
      user: userResponse
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function logoutCustomer(req,res){
try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
      secure: false // true in production
    });

    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateProfile(req,res){
try {
    const userId = req.user.id; // from auth middleware

    const { name, email, phone, address, profileImage } = req.body;

    // 🔴 If email is being updated → check duplicate
    if (email) {
      const emailLower = email.toLowerCase();
      const existingUser = await Customer.findOne({ email: emailLower });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // 🧾 Build update object dynamically
    const updateData = {
      ...(name && { name }),
      ...(email && { email: email.toLowerCase() }),
      ...(phone && { phone }),
      ...(profileImage && { profileImage }),
      ...(address && { address })
    };

    const updatedUser = await Customer.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function searchUserByName(req, res) {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "Name query is required" });
    }

    const users = await Customer.find({
      name: { $regex: name, $options: "i" }
    }).select("-password");

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUserByID(req, res) {
  try {
    const { id } = req.params;

    const user = await Customer.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await Customer.find().select("-password");

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await Customer.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCurrentUser(req, res) {
  try {
    // assuming middleware adds user id → req.user.id
    const user = await Customer.findById(req.user.id).select("-password");

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

export {
    signupCustomer,
    loginCustomer,
    logoutCustomer,
    updateProfile,
    searchUserByName,
    getUserByID,
    getAllUsers,
    deleteUser,
    getCurrentUser
}
