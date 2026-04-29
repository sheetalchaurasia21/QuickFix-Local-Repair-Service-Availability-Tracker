import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Booking() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const serviceFromSearch = query.get("service");

  const { providerId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [provider, setProvider] = useState(null);

  const [form, setForm] = useState({
    serviceRequested: serviceFromSearch || "",
    date: "",
    time: "",
  });

  // ✅ FIX: missing state
  const [selectedService, setSelectedService] = useState(
    serviceFromSearch || ""
  );

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

  // ✅ sync dropdown + form
  useEffect(() => {
    if (serviceFromSearch) {
      setSelectedService(serviceFromSearch);
      setForm((prev) => ({
        ...prev,
        serviceRequested: serviceFromSearch,
      }));
    }
  }, [serviceFromSearch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 BOOKING REQUEST
  const handleBooking = async () => {
    try {
      // ✅ login guard
      if (!currentUser) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      // ✅ validation
      if (!form.serviceRequested || !form.date || !form.time) {
        toast.error("Please fill all fields");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/booking/book`,
        {
          providerId,
          ...form,
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
    <div className="min-h-screen bg-gray-100 py-5 px-4 flex justify-center">
      <div className="w-full max-w-3xl">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-8 text-center">
          Book Service
        </h1>

        {/* PROVIDER CARD */}
        {provider && (
          <div className="bg-white rounded-2xl shadow-md px-6 py-4 mb-3 flex items-center gap-5">

            {/* IMAGE */}
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {provider.profileImage ? (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${provider.profileImage}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-xl">👤</span>
              )}
            </div>

            {/* INFO */}
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">
                {provider.name}
              </h2>

              <p className="text-sm text-gray-500">
                🔧 {provider.serviceType?.join(", ")}
              </p>

              <p className="text-sm text-gray-500">
                📍 {provider.address?.city}
              </p>
            </div>
          </div>
        )}

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl shadow-md p-5">

          <h2 className="text-xl font-semibold mb-6">
            Booking Details
          </h2>

          {/* ✅ spacing fixed */}
          <div className="space-y-4">

            {/* SERVICE DROPDOWN */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Service Type
              </label>

              <select
                value={selectedService}
                onChange={(e) => {
                  setSelectedService(e.target.value);
                  handleChange({
                    target: {
                      name: "serviceRequested",
                      value: e.target.value,
                    },
                  });
                }}
                className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              >
                <option value="">Select Service</option>

                {provider?.serviceType?.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}

              </select>
            </div>

            {/* DATE */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Select Date
              </label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* TIME */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Select Time
              </label>
              <input
                type="time"
                name="time"
                onChange={handleChange}
                className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleBooking}
              className="w-full mt-2 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Confirm Booking
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}