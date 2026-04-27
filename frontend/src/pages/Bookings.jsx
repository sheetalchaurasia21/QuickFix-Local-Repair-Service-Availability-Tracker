import { useEffect, useState } from "react";
import axios from "axios";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token ❌");
      return;
    }

    axios
      .get("http://localhost:8000/api/booking/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("BOOKINGS 👉", res.data);
        setBookings(res.data.bookings || []);
      })
      .catch((err) => {
        console.log("BOOKING ERROR 👉", err.response?.data);
      });
  }, []);

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:8000/api/booking/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Cancelled ❌");

      // refresh list
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "cancelled" } : b
        )
      );

    } catch (err) {
      console.log(err.response?.data);
      alert("Cancel failed ❌");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-lg font-semibold">
              {b.providerId?.name || "Provider"}
            </h2>

            <p>🔧 {b.serviceRequested}</p>
            <p>📅 {b.date}</p>
            <p>⏰ {b.time}</p>
            <p>💰 ₹ {b.cost}</p>

            <p
              className={`mt-2 font-semibold ${
                b.status === "completed"
                  ? "text-green-600"
                  : b.status === "cancelled"
                  ? "text-red-500"
                  : "text-yellow-600"
              }`}
            >
              {b.status.toUpperCase()}
            </p>

            {b.status !== "completed" && b.status !== "cancelled" && (
              <button
                onClick={() => handleCancel(b._id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}