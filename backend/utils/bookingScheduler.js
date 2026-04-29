import Booking from "../models/booking.model.js";

export const updateToOngoingIfTimeMatches = async () => {
  try {
    const now = new Date();

    const bookings = await Booking.find({
      status: "accepted"
    });

    for (let b of bookings) {
      const bookingTime = new Date(`${b.date} ${b.time}`);

      if (now >= bookingTime) {
        b.status = "ongoing";
        await b.save();
      }
    }
  } catch (err) {
    console.log("Scheduler Error:", err.message);
  }
};