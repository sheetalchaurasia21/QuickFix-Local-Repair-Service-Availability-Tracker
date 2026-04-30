import { useEffect, useState } from "react";
import axios from "axios";
import ProviderSidebar from "../components/ProviderSidebar";
import StatsCard from "../components/StatsCard";
import { useAuth } from "../context/AuthContext";
import ProviderNavbar from "../components/ProviderNavbar";

export default function ProviderHome() {
  const { currentUser } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/provider/bookings`,
          { withCredentials: true }
        );

        setBookings(res.data.bookings || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  // ✅ UPCOMING BOOKINGS
  const upcomingBookings = bookings.filter(
    (b) => b.date >= today && b.status !== "cancelled"
  );

  // ✅ RECENT BOOKINGS (NO CANCELLED)
  const recentBookings = bookings.filter(
    (b) => b.status !== "cancelled"
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      

      {/* MAIN */}
      <div className="flex-1">



        {/* ✅ STATS (STATIC DATA ONLY) */}
        <div className="grid md:grid-cols-4 gap-6 mt-6">
          <StatsCard
  title="New Bookings"
  value={bookings.filter(b => b.status === "pending").length}
  color="bg-green-100"
/>

<StatsCard
  title="Completed"
  value={bookings.filter(b => b.status === "completed").length}
  color="bg-blue-100"
/>
          <StatsCard title="Rating" value="4.8 ⭐" color="bg-yellow-100" />
          <StatsCard title="Earnings" value="₹25,000" color="bg-purple-100" />
        </div>

        {/* ✅ UPCOMING BOOKINGS (SWAPPED UP) */}
        <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Upcoming Bookings
          </h3>

          {upcomingBookings.length === 0 ? (
  <p className="text-gray-500 text-sm">No upcoming bookings</p>
) : (
  <ul className="divide-y bg-white rounded-lg overflow-hidden">
    {upcomingBookings.slice(0, 5).map((b) => (
      <li
        key={b._id}
        onClick={() => setSelectedBooking(b)}
        className="flex justify-between items-center px-4 bg-gray-200 py-3 cursor-pointer hover:bg-gray-400 transition"
      >
        {/* LEFT */}
        <div className="flex flex-col gap-1">

          {/* SERVICE */}
          <h4 className="text-sm font-semibold text-gray-800">
            {b.serviceRequested}
          </h4>

          {/* DATE + TIME */}
          <p className="text-xs text-gray-500">
            {b.date} • {b.time}
          </p>

          {/* USER */}
          <p className="text-xs text-gray-600">
            {b.userId?.name}
          </p>

        </div>

        {/* STATUS */}
        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium capitalize">
          {b.status}
        </span>
      </li>
    ))}
  </ul>
)}
        </section>

        {/* ✅ RECENT BOOKINGS (CANCELLED REMOVED) */}
        <section className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Recent Bookings
          </h3>

          {recentBookings.length === 0 ? (
  <p className="text-gray-500 text-sm">No recent bookings</p>
) : (
  <ul className="flex flex-col gap-3">
    {recentBookings.slice(0, 5).map((b) => (
      <li
        key={b._id}
        onClick={() => setSelectedBooking(b)}
        className="py-2 px-4 flex justify-between items-center bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-400 transition"
      >
        {/* LEFT */}
        <div className="flex flex-col">
          <h4 className="text-sm font-medium text-gray-800">
            {b.serviceRequested}
          </h4>

          <span className="text-xs text-gray-500">
            {b.date} • {b.time}
          </span>

          <span className="text-xs text-gray-600">
            {b.userId?.name}
          </span>
        </div>

        {/* RIGHT STATUS */}
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            b.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {b.status}
        </span>
      </li>
    ))}
  </ul>
)}
        </section>

        {/* ✅ TODAY + PERFORMANCE (UNCHANGED) */}
        <section className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-md">
  <h4 className="font-semibold text-gray-700 mb-3">
    Today's Schedule
  </h4>

  {bookings.filter((b) => b.date === today).length === 0 ? (
    <p className="text-gray-500 text-sm">No tasks today</p>
  ) : (
    <ul className="divide-y">
      {bookings
        .filter((b) => b.date === today && b.status !== "cancelled")
        .map((b) => (
          <li
            key={b._id}
            className="py-2 flex justify-between items-center hover:bg-gray-50 transition cursor-pointer"
          >
            {/* LEFT */}
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-800">
                {b.serviceRequested}
              </h4>

              <span className="text-xs text-gray-500">
                {b.time}
              </span>

              <span className="text-xs text-gray-600">
                {b.userId?.name}
              </span>
            </div>

            {/* STATUS */}
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                b.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : b.status === "ongoing"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {b.status}
            </span>
          </li>
        ))}
    </ul>
  )}
</div>

          <div className="bg-white p-5 rounded-lg shadow-md">
            <h4 className="font-semibold text-gray-700 mb-3">
              Performance
            </h4>
            <p>Completed: 30</p>
            <p>Average Rating: 4.8 ⭐</p>
          </div>
        </section>

      </div>

      {/* ✅ POPUP MODAL */}
      {selectedBooking && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    
    <div className="bg-white rounded-2xl shadow-lg w-[420px] p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Booking Details
        </h2>

        <button
          onClick={() => setSelectedBooking(null)}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ✕
        </button>
      </div>

      {/* CUSTOMER INFO */}
      <div className="mb-4 border-b pb-3">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Customer Info
        </h3>

        <p className="text-sm text-gray-800">
          {selectedBooking.userId?.name}
        </p>

        <p className="text-xs text-gray-500">
          {selectedBooking.userId?.email || "email@example.com"}
        </p>

        <p className="text-xs text-gray-500">
          {selectedBooking.userId?.phone || "+91 XXXXX XXXXX"}
        </p>

        <p className="text-xs text-gray-500">
          {selectedBooking.userId?.address?.city || ""}
        </p>
      </div>

      {/* BOOKING INFO */}
      <div className="mb-4 border-b pb-3">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Service Details
        </h3>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Service</span>
          <span className="text-gray-800 font-medium">
            {selectedBooking.serviceRequested}
          </span>
        </div>

        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-500">Date</span>
          <span className="text-gray-800">
            {selectedBooking.date}
          </span>
        </div>

        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-500">Time</span>
          <span className="text-gray-800">
            {selectedBooking.time}
          </span>
        </div>
      </div>

      {/* STATUS + PRICE */}
      <div className="flex justify-between items-center">

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            selectedBooking.status === "completed"
              ? "bg-green-100 text-green-700"
              : selectedBooking.status === "ongoing"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {selectedBooking.status}
        </span>

        <span className="text-lg font-semibold text-gray-800">
          ₹{selectedBooking.price || 299}
        </span>
      </div>

    </div>
  </div>
)}

    </div>
  );
}