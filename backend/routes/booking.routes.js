import express from 'express'
import {
  bookIssue,
  updateBookingStatus,
  getAllBookings,
  cancelBooking,
  getBookingById,
  // getMyBookings,
  acceptBooking
} from "../controllers/booking.controller.js";
import upload from '../middlewares/fileupload.middleware.js';
import auth
 from '../middlewares/auth.middleware.js';
const bookingRouter=express.Router()

bookingRouter.post('/book',auth,upload.single('image'),bookIssue);
// bookingRouter.get("/my", auth, getMyBookings);
bookingRouter.get("/", auth, getAllBookings);
bookingRouter.get("/:bookingId", auth, getBookingById);
bookingRouter.patch("/update/:bookingId", auth, updateBookingStatus);
bookingRouter.patch("/cancel/:bookingId", auth, cancelBooking);
bookingRouter.patch("/accept/:bookingId", auth, acceptBooking);

export default bookingRouter;