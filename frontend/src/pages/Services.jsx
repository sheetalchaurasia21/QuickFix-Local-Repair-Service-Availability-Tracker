import { useLocation, useNavigate } from "react-router-dom";

export default function Services() {
  const locationHook = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(locationHook.search);
  const service = query.get("service");
  const city = query.get("city");

  // 🔥 INDIA LEVEL DATA
  const providers = [
    // Bhubaneswar
    { id: 1, name: "Rahul Electrician", service: "Electrician", city: "Bhubaneswar", state: "Odisha", price: 299, available: true, rating: 4.5 },
    { id: 2, name: "Amit Plumber", service: "Plumber", city: "Bhubaneswar", state: "Odisha", price: 199, available: false, rating: 4.2 },

    // Cuttack
    { id: 3, name: "Ramesh Plumber", service: "Plumber", city: "Cuttack", state: "Odisha", price: 249, available: true, rating: 4.6 },

    // Delhi
    { id: 4, name: "Delhi Electric Pro", service: "Electrician", city: "Delhi", state: "Delhi", price: 399, available: true, rating: 4.8 },

    // Mumbai
    { id: 5, name: "Mumbai AC Expert", service: "AC Repair", city: "Mumbai", state: "Maharashtra", price: 499, available: true, rating: 4.7 },

    // Bangalore
    { id: 6, name: "Bangalore Mechanic", service: "Car Mechanic", city: "Bangalore", state: "Karnataka", price: 599, available: true, rating: 4.4 },
  ];

  // ✅ FILTER LOGIC (STRICT)
  const filtered = providers.filter((p) => {
    return (
      (!service || p.service.toLowerCase() === service.toLowerCase()) &&
      (!city || p.city.toLowerCase() === city.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">

      <h1 className="text-3xl font-bold mb-4">Search Results</h1>

      <p className="text-gray-600 mb-8">
        Showing <span className="font-semibold">{service}</span> in{" "}
        <span className="font-semibold">{city}</span>
      </p>

      {filtered.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          ❌ No providers found in this city
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-xl shadow">

              <h2 className="text-xl font-semibold">{p.name}</h2>

              <p className="text-gray-500 mt-2">🔧 {p.service}</p>
              <p className="text-gray-500">📍 {p.city}, {p.state}</p>

              <p className="text-yellow-500 mt-2">⭐ {p.rating}</p>

              <p className="font-semibold mt-2">₹ {p.price}</p>

              <p className={`mt-1 text-sm ${p.available ? "text-green-600" : "text-red-500"}`}>
                {p.available ? "Available Now" : "Not Available"}
              </p>

              <button
                disabled={!p.available}
                onClick={() => navigate(`/provider/${p.id}`)}
                className={`mt-4 px-4 py-2 rounded text-white ${
                  p.available
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {p.available ? "Book Now" : "Unavailable"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}