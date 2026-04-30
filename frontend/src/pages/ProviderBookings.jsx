import { useEffect, useState } from "react";
import axios from "axios";

export default function ProviderBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/booking/provider", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookings(res.data.bookings || []);
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:8000/api/booking/update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Booking ${status} ✅`);

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status } : b
        )
      );

    } catch (err) {
      alert("Update failed ❌");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Provider Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-semibold text-lg">
              {b.customerId?.name || "Customer"}
            </h3>

            <p>🔧 {b.serviceRequested}</p>
            <p>📅 {b.date}</p>
            <p>⏰ {b.time}</p>
            <p>💰 ₹ {b.cost}</p>

            <p className="mt-2 font-semibold">
              Status: {b.status}
            </p>

            {b.status === "pending" && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => updateStatus(b._id, "accepted")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(b._id, "cancelled")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            )}

            {b.status === "accepted" && (
              <button
                onClick={() => updateStatus(b._id, "completed")}
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded"
              >
                Mark Completed
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}