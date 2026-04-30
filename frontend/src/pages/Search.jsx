import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(location.search);
  const service = query.get("service");
  const city = query.get("city");

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/provider/search-all`,
          {
            params: { service, city },
            withCredentials: true,
          }
        );

        setProviders(res.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [service, city]);

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>

      <p className="mb-6 text-gray-600">
        Showing <b>{service}</b> in <b>{city}</b>
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : providers.length === 0 ? (
        <p>No providers found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
    {/* {providers.map((p) => (
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
          onClick={() =>
            navigate(`/book/${p._id}?service=${service}`)
          }
          className={`mt-4 px-4 py-2 rounded text-white ${
            p.isAvailableNow
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {p.isAvailableNow ? "Book Now" : "Unavailable"}
        </button>
      </div>
    ))} */}
    {providers.map((p) => (
  <div
    key={p._id}
    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition border"
  >
    {/* Top Section */}
    <div className="flex justify-between items-start">
      <h2 className="text-base font-semibold text-gray-800">
        {p.name}
      </h2>

      <span
        className={`text-xs px-2 py-1 rounded-full ${
          p.isAvailableNow
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-500"
        }`}
      >
        {p.isAvailableNow ? "Available" : "Not Available"}
      </span>
    </div>

    {/* Service */}
    <p className="text-sm text-gray-500 mt-1 truncate">
      🔧 {p.serviceType?.join(", ")}
    </p>

    {/* Location */}
    <p className="text-sm text-gray-500">
      📍 {p.address?.city || "N/A"}
    </p>

    {/* Rating */}
    <div className="flex items-center gap-1 mt-1">
      <span className="text-yellow-500 text-sm">⭐</span>
      <span className="text-sm text-gray-600">
        {p.rating || 0}
      </span>
    </div>

    {/* Button */}
    <button
      disabled={!p.isAvailableNow}
      onClick={() =>
        navigate(`/book/${p._id}?service=${service}`)
      }
      className={`mt-3 w-full py-2 text-sm rounded-md font-medium transition ${
        p.isAvailableNow
          ? "bg-[#A3E635] text-black hover:bg-lime-400"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
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