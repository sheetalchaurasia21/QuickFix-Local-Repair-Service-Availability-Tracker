import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const { currentUser, role } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!currentUser || !role) return;

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
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentUser, role]);

  if (!currentUser) {
    return (
      <div className="p-10 text-center text-red-500">
        Please login to view bookings
      </div>
    );
  }

  return (
    role === "customer" ?(
      <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      <h1 className="text-3xl font-bold mb-10">
        {role === "provider" ? "My Bookings" : "My Bookings"}
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found</p>
      ) : (
        <div className="grid gap-3">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg px-4 py-3 transition flex flex-col md:flex-row md:justify-between md:items-center"
            >

              {/* LEFT */}
              <div className="flex gap-2 items-center">

                {/* Provider Image */}
                <div className="w-18 h-18 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {b.providerId?.profileImage ? (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}${b.providerId.profileImage}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                  )}
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-semibold text-lg">
                    {b.providerId?.name || "Provider"}
                  </h3>

                  <p className="text-sm text-gray-500">
                    📅 {b.date} • ⏰ {b.time}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {b.serviceRequested}
                  </p>
                </div>
                {/* STATUS */}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    b.status === "completed"
  ? "bg-green-100 text-green-700"
  : b.status === "pending"
  ? "bg-orange-100 text-orange-700"
  : b.status === "accepted"
  ? "bg-yellow-100 text-yellow-700"
  : b.status === "ongoing"
  ? "bg-blue-100 text-blue-700"
  : b.status === "cancelled"
  ? "bg-red-100 text-red-700"
  : b.status === "rejected"
  ? "bg-gray-200 text-gray-700"
  : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {b.status}
                </span>
              </div>

              {/* RIGHT */}
              <div className="mt-4 md:mt-0 text-right space-y-2">

                

                {/* ACTIONS */}
                <div className="flex gap-3 justify-end">

                  {/* View Details */}
                  <button
                    onClick={() => navigate(`/booking/${b._id}`)}
                    className="text-sm px-4 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    View Details
                  </button>

                  {/* Cancel */}
                  {role === "customer" &&
                    b.status !== "cancelled" &&
                    b.status !== "completed" && (
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
                          } catch {
                            toast.error("Cancel failed");
                          }
                        }}
                        className="text-sm px-4 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        Cancel
                      </button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    ):(
      <div className="min-h-screen bg-gray-100 p-6 md:p-10">
  <h1 className="text-3xl font-bold mb-10">My Bookings</h1>

  {loading ? (
    <p>Loading...</p>
  ) : bookings.length === 0 ? (
    <p className="text-gray-500">No bookings found</p>
  ) : (
    <div className="grid gap-4">
      {bookings
        .filter((b) => b.status !== "cancelled")
        .map((b) => (
          <div
            key={b._id}
            className="bg-white rounded-2xl shadow hover:shadow-lg px-5 py-4 transition flex flex-col md:flex-row md:justify-between md:items-center"
          >
            {/* LEFT SIDE */}
            <div className="space-y-1">
              <h3 className="font-semibold text-lg text-gray-800">
                {b.userId?.name || "Customer"}
              </h3>

              <p className="text-sm text-gray-500">
                📅 {b.date} • ⏰ {b.time}
              </p>

              <p className="text-sm text-gray-700 font-medium">
                {b.serviceRequested}
              </p>
            </div>

            <div className="mt-3 md:mt-0 relative">

  {/* STATUS BUTTON */}
  <button
    onClick={() =>
      setOpenDropdown(openDropdown === b._id ? null : b._id)
    }
    className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
      b.status === "completed"
  ? "bg-green-100 text-green-700"
  : b.status === "pending"
  ? "bg-orange-100 text-orange-700"
  : b.status === "accepted"
  ? "bg-yellow-100 text-yellow-700"
  : b.status === "ongoing"
  ? "bg-blue-100 text-blue-700"
  : b.status === "cancelled"
  ? "bg-red-100 text-red-700"
  : b.status === "rejected"
  ? "bg-gray-200 text-gray-700"
  : "bg-gray-100 text-gray-700"
    }`}
  >
    {b.status} ▾
  </button>

  {/* DROPDOWN */}
  {openDropdown === b._id && (
    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 z-10 overflow-hidden">

      {["accepted", "ongoing", "completed", "rejected"]
        .filter((s) => s !== b.status)
        .map((status) => (
          <button
            key={status}
            onClick={async () => {
              try {
                await axios.patch(
                  `${import.meta.env.VITE_BACKEND_URL}/api/booking/update/${b._id}`,
                  { status },
                  { withCredentials: true }
                );

                toast.success(`Marked as ${status}`);

                setBookings((prev) =>
                  prev.map((item) =>
                    item._id === b._id
                      ? { ...item, status }
                      : item
                  )
                );

                setOpenDropdown(null); // close after select
              } catch {
                toast.error("Status update failed");
              }
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            {status}
          </button>
        ))}
    </div>
  )}

</div>
          </div>
        ))}
    </div>
  )}
</div>
    )
  );
}