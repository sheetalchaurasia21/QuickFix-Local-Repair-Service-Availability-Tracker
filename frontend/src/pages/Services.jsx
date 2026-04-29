import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Services() {
  const locationHook = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState("All");

  const query = new URLSearchParams(locationHook.search);
  const serviceFromQuery = query.get("service");

  const city = currentUser?.address?.city;

  // 🔥 Fetch ALL providers once
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/provider/`,
          { withCredentials: true }
        );

        setProviders(res.data);
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // 🔥 Filter providers (city + service)
  const filteredProviders = providers.filter((p) => {
    const matchesCity = city
      ? p.address?.city?.toLowerCase() === city.toLowerCase()
      : true;

    const matchesService =
      selectedService === "All" ||
      p.serviceType?.includes(selectedService);

    return matchesCity && matchesService;
  });

  if (!currentUser) {
    return <p className="p-10">⚠️ Please login</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 md:px-10 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-4">Get Services</h1>

      <p className="text-gray-600 mb-8">
        Showing{" "}
        <span className="font-semibold">
          {selectedService || serviceFromQuery || "All"}
        </span>{" "}
        in{" "}
        <span className="font-semibold">
          {city || "your city"}
        </span>
      </p>

      {/* FILTER BUTTONS */}
      <div className="mb-6 flex gap-3 flex-wrap">
        {["All", "Electrician", "Plumber", "AC Repair", "Carpenter"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setSelectedService(item)}
              className={`px-4 py-2 rounded-full border text-sm transition ${
                selectedService === item
                  ? "bg-green-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredProviders.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          ❌ No providers found in your city
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {filteredProviders.map((p) => (
            <div
              key={p._id}
              className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition border"
            >

              {/* TOP */}
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
                  {p.isAvailableNow ? "Available" : "Offline"}
                </span>
              </div>

              {/* SERVICE */}
              <p className="text-sm text-gray-500 mt-2 truncate">
                🔧 {p.serviceType?.join(", ")}
              </p>

              {/* LOCATION */}
              <p className="text-sm text-gray-500">
                📍 {p.address?.city || "N/A"}
              </p>

              {/* RATING */}
              <div className="flex items-center gap-1 mt-2">
                <span className="text-yellow-500 text-sm">⭐</span>
                <span className="text-sm text-gray-600">
                  {p.rating || 0}
                </span>
              </div>

              {/* BUTTON */}
              <button
                disabled={!p.isAvailableNow}
                onClick={() =>
                  navigate(`/book/${p._id}`)
                }
                className={`mt-4 w-full py-2 text-sm rounded-md font-medium transition ${
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