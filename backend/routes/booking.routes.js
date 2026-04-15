import express from 'express'
import { bookIssue, updateBookingStatus, getAllBookings, cancleBooking, getBookingById } from '../controllers/booking.controller'
import upload from '../middlewares/fileupload.middleware';
import auth
 from '../middlewares/auth.middlewar';
const bookingRouter=express.Router()

bookingRouter.post('/book',auth,upload.single('image'),bookIssue);
bookingRouter.get('/',auth, getAllBookings);
bookingRouter.get('/:id',auth, getBookingById);
bookingRouter.put('/update/:id',auth,updateBookingStatus);
bookingRouter.delete('/:id',auth,cancleBooking);


export default bookingRouter