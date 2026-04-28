import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function MyBookings() {
  const { currentUser, role } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      if (!currentUser || !role) return; // 🔥 IMPORTANT GUARD

      const endpoint =
        role === "provider"
          ? "/api/provider/bookings"
          : "/api/customer/bookings";

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
        { withCredentials: true }
      );

      setBookings(res.data.bookings || []);
    } catch (err) {
      console.log("BOOKING ERROR 👉", err.response?.data || err.message);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  fetchBookings();
}, [currentUser, role]); // 🔥 FIXED DEPENDENCY

  if (!currentUser) {
    return (
      <div className="p-10 text-center text-red-500">
        Please login to view bookings
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">
        {role === "provider" ? "Provider Bookings" : "My Bookings"}
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white p-5 rounded shadow flex justify-between items-center"
            >
              {/* LEFT SIDE */}
              <div>
                <h2 className="font-semibold text-lg">
                  {b.serviceRequested}
                </h2>

                <p className="text-gray-600">
                  📅 {b.date} ⏰ {b.time}
                </p>

                <p className="text-gray-600">
                  Provider: {b.providerId?.name}
                </p>

                {role === "provider" && (
                  <p className="text-gray-600">
                    Customer: {b.userId?.name}
                  </p>
                )}
              </div>

              {/* STATUS */}
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded text-sm font-semibold ${
                    b.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : b.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : b.status === "ongoing"
                      ? "bg-blue-100 text-blue-700"
                      : b.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {b.status}
                </span>

                {/* CUSTOMER ACTION */}
                {role === "customer" &&
  b.status !== "completed" &&
  b.status !== "cancelled" && (
    <button
      onClick={async () => {
        try {
          await axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/api/booking/cancel/${b._id}`,
            {},
            { withCredentials: true }
          );

          toast.success("Booking cancelled");

          setBookings((prev) =>
            prev.map((item) =>
              item._id === b._id
                ? { ...item, status: "cancelled" }
                : item
            )
          );
        } catch (err) {
          toast.error("Cancel failed");
        }
      }}
      className="mt-2 text-sm text-red-600 underline"
    >
      Cancel
    </button>
)}

                {/* PROVIDER ACTION */}
                {role === "provider" && b.status === "pending" && (
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={async () => {
                        await axios.patch(
                          `${import.meta.env.VITE_BACKEND_URL}/api/booking/accept/${b._id}`,
                          {},
                          { withCredentials: true }
                        );

                        toast.success("Accepted");

                        setBookings((prev) =>
                          prev.map((item) =>
                            item._id === b._id
                              ? { ...item, status: "accepted" }
                              : item
                          )
                        );
                      }}
                      className="text-green-600 text-sm"
                    >
                      Accept
                    </button>

                    <button
                      onClick={async () => {
                        await axios.patch(
                          `${import.meta.env.VITE_BACKEND_URL}/api/booking/update/${b._id}`,
                          { status: "rejected" },
                          { withCredentials: true }
                        );

                        toast.success("Rejected");

                        setBookings((prev) =>
                          prev.map((item) =>
                            item._id === b._id
                              ? { ...item, status: "rejected" }
                              : item
                          )
                        );
                      }}
                      className="text-red-600 text-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}