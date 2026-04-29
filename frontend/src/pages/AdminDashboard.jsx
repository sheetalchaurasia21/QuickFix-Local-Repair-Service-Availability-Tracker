import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard`,
        { withCredentials: true }
      );

      setStats(res.data.stats);
      setBookings(res.data.bookings);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <div className="w-64 bg-[#0F3D2E] text-white flex flex-col justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold mb-10">QuickFix</h1>

          <div className="space-y-3">
            <div className="bg-lime-400 text-black p-3 rounded font-semibold">
              Dashboard
            </div>
            <div className="p-3 hover:bg-green-800 rounded cursor-pointer">Bookings</div>
            <div className="p-3 hover:bg-green-800 rounded cursor-pointer">Users</div>
            <div className="p-3 hover:bg-green-800 rounded cursor-pointer">Providers</div>
          </div>
        </div>

        {/* ADMIN USER */}
        <div className="bg-green-800 p-3 rounded flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <div>
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-gray-300">Super Admin</p>
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <input
            placeholder="Search bookings, users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded w-80"
          />
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-3 gap-4 mb-6">

          <Card title="Total Bookings" value={stats.totalBookings} />
          <Card title="Ongoing" value={stats.ongoingBookings} />
          <Card title="Completed" value={stats.completedBookings} />
          <Card title="Cancelled" value={stats.cancelledBookings} />
          <Card title="Customers" value={stats.totalCustomers} />
          <Card title="Providers" value={stats.totalProviders} />

        </div>

        {/* ================= BOOKINGS ================= */}
        <div className="bg-white rounded-xl shadow p-4">

          <h2 className="text-lg font-semibold mb-4">
            Bookings Overview
          </h2>

          {/* FILTERS */}
          <div className="flex gap-3 mb-4">
            {["all", "pending", "completed", "cancelled"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded ${
                  filter === f
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* TABLE */}
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Service</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {bookings
                .filter((b) =>
                  filter === "all" ? true : b.status === filter
                )
                .filter((b) =>
                  b.customer?.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((b) => (
                  <tr key={b._id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{b.service}</td>
                    <td>{b.customer?.name}</td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          b.status === "pending"
                            ? "bg-yellow-200"
                            : b.status === "completed"
                            ? "bg-green-200"
                            : "bg-red-200"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td>
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

/* ================= CARD ================= */
function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value || 0}</h2>
      </div>

      {/* ICON */}
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
    </div>
  );
}