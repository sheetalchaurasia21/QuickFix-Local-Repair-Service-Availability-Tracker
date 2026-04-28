import Booking from "../models/booking.model.js";
import Provider from "../models/provider.model.js";

export const bookIssue = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { providerId, serviceRequested, date, time, cost } = req.body;

    if (!providerId || !serviceRequested || !date || !time) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // const provider = await Provider.findById(providerId);
    // if (!provider) {
    //   return res.status(404).json({ message: "Provider not found" });
    // }

    // if (!provider.isAvailableNow) {
    //   return res.status(400).json({ message: "Provider not available right now" });
    // }

    const booking = await Booking.create({
      userId: customerId,
      providerId,
      serviceRequested,
      date,
      time,
      cost
    });

    res.status(201).json({ message: "Booking created", booking });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { bookingId } = req.params;
    const { status } = req.body;

    const allowedStatus = ["rejected", "ongoing", "completed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.providerId.toString() !== providerId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (["cancelled", "completed"].includes(booking.status)) {
      return res.status(400).json({ message: "Cannot update this booking" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: "Status updated", booking });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== customerId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (booking.status === "completed") {
      return res.status(400).json({ message: "Cannot cancel completed booking" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled", booking });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let bookings;

    if (role === "admin") {
      bookings = await Booking.find();
    } 
    else if (role === "provider") {
      bookings = await Booking.find({ providerId: userId });
    } else {
      bookings = await Booking.find({ userId });
    }

    bookings = await Booking.populate(bookings, [
      { path: "providerId", select: "name serviceType" },
      { path: "userId", select: "name email" }
    ]);

    res.status(200).json(bookings);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId)
      .populate("providerId", "name serviceType phone")
      .populate("userId", "name email phone");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (
      booking.userId._id.toString() !== userId &&
      booking.providerId._id.toString() !== userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json(booking);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const getMyBookings = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const role = req.user.role;

//     let filter = {};

//     if (role === "provider") {
//       filter = { providerId: userId };
//     } else {
//       filter = { userId };
//     }

//     const bookings = await Booking.find(filter)
//       .populate("providerId", "name serviceType phone")
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.json({
//       count: bookings.length,
//       bookings,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const acceptBooking = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) return res.status(404).json({ message: "Not found" });

    if (booking.providerId.toString() !== providerId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "accepted";
    await booking.save();

    res.json({ message: "Booking accepted", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

