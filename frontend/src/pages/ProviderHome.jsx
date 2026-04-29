import { useEffect, useState } from "react";
import axios from "axios";
import ProviderTopbar from "../components/ProviderTopbar";
import StatsCard from "../components/StatsCard";

export default function ProviderHome() {

  const [provider, setProvider] = useState({});
  const [bookings, setBookings] = useState([]);
  const [earnings, setEarnings] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios.get("http://localhost:8000/api/provider/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setProvider(res.data))
    .catch((err) => console.log(err));

    axios.get("http://localhost:8000/api/booking/provider", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setBookings(res.data.bookings || []))
    .catch((err) => console.log(err));

  }, []);

  useEffect(() => {
    const total = bookings.reduce((sum, b) => sum + (b.price || 0), 0);
    setEarnings(total);
  }, [bookings]);

  // ✅ RETURN INSIDE FUNCTION
  return (
    <div>
      <ProviderTopbar
        name={provider.name || "Provider"}
        role={provider.role || "Plumber"}
      />

      <div className="grid grid-cols-4 gap-6">
        <StatsCard
          title="New Bookings"
          value={bookings.filter(b => b.status === "New").length}
          color="bg-green-100"
        />
        <StatsCard
          title="Completed"
          value={bookings.filter(b => b.status === "Completed").length}
          color="bg-blue-100"
        />
        <StatsCard
          title="Rating"
          value={provider.rating || 0}
          color="bg-yellow-100"
        />
        <StatsCard
          title="Earnings"
          value={`₹${earnings}`}
          color="bg-purple-100"
        />
      </div>

      <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet</p>
        ) : (
          <ul className="divide-y">
            {bookings.slice(0, 5).map((b, i) => (
              <li key={i} className="py-3 flex justify-between">
                <div>
                  <h4 className="font-medium text-gray-700">{b.serviceType}</h4>
                  <p className="text-sm text-gray-500">
                    {b.customerName} • {b.date}
                  </p>
                </div>

                <span className={`px-3 py-1 text-sm rounded-full ${
                  b.status === "Completed"
                    ? "bg-green-200"
                    : "bg-gray-200"
                }`}>
                  {b.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6 grid grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h4 className="font-semibold text-gray-700 mb-3">
            Today's Schedule
          </h4>

          {bookings.length > 0 ? (
            bookings
              .filter(b => b.date === new Date().toISOString().split("T")[0])
              .map((b, i) => (
                <p key={i} className="text-gray-600">
                  {b.serviceType} - {b.time}
                </p>
              ))
          ) : (
            <p className="text-gray-500">No tasks today</p>
          )}
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md">
          <h4 className="font-semibold text-gray-700 mb-3">
            Performance
          </h4>
          <p>Completed: {bookings.filter(b => b.status === "Completed").length}</p>
          <p>Average Rating: {provider.rating || 0}</p>
        </div>
      </section>

      <footer className="mt-10 text-center text-gray-500 text-sm">
        © 2026 QuickFix • Provider Panel
      </footer>
    </div>
  );
}