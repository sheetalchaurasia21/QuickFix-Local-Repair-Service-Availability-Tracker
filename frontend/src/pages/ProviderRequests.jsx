import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const ProviderRequests = () => {
  const { currentUser } = useAuth(); // ✅ provider login user
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/provider/bookings`,
        { withCredentials: true }
      );

      // ✅ FIX: bookings are inside res.data.bookings
      const allBookings = res.data.bookings || [];

      // only pending
      const pending = allBookings.filter(
        (b) => b.status === "pending"
      );

      setRequests(pending);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) fetchRequests(); // ✅ wait for auth
  }, [currentUser]);

  const acceptRequest = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/booking/accept/${id}`,
        {},
        { withCredentials: true }
      );

      toast.success("Booking accepted");

      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const rejectRequest = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/booking/update/${id}`,
        { status: "rejected" },
        { withCredentials: true }
      );

      toast.success("Booking rejected");

      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Booking Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-500">No pending requests 🎉</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {req.serviceRequested}
                </h3>

                <p className="text-sm text-gray-500">
                  👤 {req.userId?.name}
                </p>

                <p className="text-sm text-gray-500">
                   {req.date} •  {req.time}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => acceptRequest(req._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Accept
                </button>

                <button
                  onClick={() => rejectRequest(req._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderRequests;