import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

export default function Card() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBooking = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/booking/${id}`,
        { withCredentials: true }
      );
      setBooking(res.data);
    };

    fetchBooking();
  }, [id]);

  if (!booking) return <p className="p-10">Loading...</p>;

  return (
    <div className="h-full bg-gray-100 p-6 md:p-10 flex justify-center">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6 flex flex-col md:flex-row gap-8">

        {/* LEFT - IMAGE */}
        <div className="flex flex-col items-center justify-start">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shadow">
            {booking.providerId?.profileImage ? (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${booking.providerId.profileImage}`}
                alt="provider"
                className="w-full h-full object-cover"
              />
            ) : (
              <FontAwesomeIcon icon={faUser} className="text-5xl text-gray-400" />
            )}
          </div>

          <h3 className="mt-4 text-lg font-semibold text-center">
            {booking.providerId?.name || "Provider"}
          </h3>
        </div>

        {/* RIGHT - DETAILS */}
        <div className="flex-1 space-y-4">

          <h2 className="text-2xl font-bold mb-4">Booking Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-700">

            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>

            <p><strong>City:</strong> {currentUser?.address?.city}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span className={`px-2 py-1 rounded text-sm ${
                booking.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : booking.status === "ongoing"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {booking.status}
              </span>
            </p>

            <p><strong>Service:</strong> {booking.serviceRequested}</p>

            <p><strong>Price:</strong> ₹{booking.price}</p>

            <p className="sm:col-span-2">
              <strong>Booked On:</strong>{" "}
              {new Date(booking.createdAt).toLocaleString()}
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}