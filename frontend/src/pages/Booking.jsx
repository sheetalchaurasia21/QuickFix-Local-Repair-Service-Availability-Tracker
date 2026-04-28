import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";



export default function Booking() {
  const location = useLocation();
const query = new URLSearchParams(location.search);
const serviceFromSearch = query.get("service");
  const { providerId } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useAuth(); // ✅ GET USER FROM CONTEXT

  const [provider, setProvider] = useState(null);

  const [form, setForm] = useState({
    serviceRequested: serviceFromSearch || "",
    date: "",
    time: "",
  });
  

  // 🔥 FETCH PROVIDER
  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/provider/${providerId}`
        );
        setProvider(res.data);
      } catch (err) {
        toast.error("Failed to load provider");
      }
    };

    fetchProvider();
  }, [providerId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 BOOKING REQUEST
  // const handleBooking = async () => {
  //   try {
  //     if (!currentUser) {
  //       toast.error("Please login first");
  //       navigate("/login");
  //       return;
  //     }

  //     await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/booking/book`,
  //       {
  //         providerId,
  //         userId: currentUser._id, // ✅ IMPORTANT ADDITION
  //         ...form,
  //       },
  //       { withCredentials: true }
  //     );

  //     toast.success("Booking Created!");
  //     navigate("/bookings");
  //   } catch (err) {
  //     toast.error(err.response?.data?.message || "Booking failed");
  //   }
  // };

  const handleBooking = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/booking/book`,
      {
        providerId,
        ...form
      },
      { withCredentials: true }
    );

    toast.success("Booking Created!");
    navigate("/bookings");
  } catch (err) {
    toast.error(err.response?.data?.message || "Booking failed");
  }
};

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Book Service</h1>

      {/* PROVIDER INFO */}
      {provider && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold">{provider.name}</h2>
          <p>{provider.serviceType?.join(", ")}</p>
          <p>{provider.address?.city}</p>
        </div>
      )}

      {/* BOOKING FORM */}
      <div className="bg-white p-6 rounded shadow max-w-md">
        <input
          name="serviceRequested"
          value={form.serviceRequested}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          type="time"
          name="time"
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <button
          onClick={handleBooking}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}