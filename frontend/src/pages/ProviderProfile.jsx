import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProviderProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const provider = location.state;

  if (!provider) {
    return <p className="p-6">⚠️ Go back and select provider</p>;
  }

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first ❌");
        return;
      }

      // ⚠️ TEMP FIX (since provider is static)
      const fakeProviderId = "64f123456789abcd12345678"; 
      // later replace with real provider._id

      const bookingData = {
        providerId: fakeProviderId,
        serviceRequested: provider.service,
        date: new Date().toISOString().split("T")[0],
        time: "10:00 AM",
        cost: provider.price,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/booking/book`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("BOOKING SUCCESS 👉", res.data);

      alert("Booking Successful ✅");
      navigate("/bookings");

    } catch (err) {
      console.log("BOOKING ERROR 👉", err.response?.data || err.message);
      alert(err.response?.data?.message || "Booking failed ❌");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{provider.name}</h1>

      <p className="mt-2">🔧 {provider.service}</p>
      <p>📍 {provider.city}, {provider.state}</p>
      <p>⭐ {provider.rating}</p>
      <p className="font-semibold">₹ {provider.price}</p>

      <button
        onClick={handleBooking}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Confirm Booking
      </button>
    </div>
  );
}