import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Services() {
  const locationHook = useLocation();
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(locationHook.search);
  const service = query.get("service");
  const city = query.get("city");

  useEffect(() => {
  const fetchProviders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/provider/search-all`,
        {
          params: {
            service,
            city,
          },
          withCredentials: true,
        }
      );

      setProviders(res.data);

    } catch (err) {
      console.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProviders();
}, [service, city]);


  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">

      <h1 className="text-3xl font-bold mb-4">Search Results</h1>

      <p className="text-gray-600 mb-8">
        Showing <span className="font-semibold">{service}</span> in{" "}
        <span className="font-semibold">{city}</span>
      </p>

      {loading ? (
  <p>Loading...</p>
) : providers.length === 0 ? (
  <div className="text-center mt-20 text-gray-500">
    ❌ No providers found
  </div>
) : (
  <div className="grid md:grid-cols-3 gap-6">
    {providers.map((p) => (
      <div key={p._id} className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold">{p.name}</h2>

        <p className="text-gray-500 mt-1">
          🔧 {p.serviceType?.join(", ")}
        </p>

        <p className="text-gray-500">
          📍 {p.address?.city || "N/A"}
        </p>

        <p className="text-yellow-500 mt-1">
          ⭐ {p.rating || 0}
        </p>


        <p className={`mt-1 text-sm ${p.isAvailableNow ? "text-green-600" : "text-red-500"}`}>
          {p.isAvailableNow ? "Available Now" : "Not Available"}
        </p>

        <button
          disabled={!p.isAvailableNow}
          onClick={() => navigate(`/provider/${p._id}`)}
          className={`mt-4 px-4 py-2 rounded text-white ${
            p.isAvailableNow
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {p.isAvailableNow ? "Book Now" : "Unavailable"}
        </button>
      </div>
    ))}
  </div>
)}
    </div>
  );
}