import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import Navbar from "../components/CustomerNavbar";
import NotificationBell from "../components/NotificationBell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { indiaCities } from "../data/indiaCities";

export default function CustomerHome() {
  const { logout } = useAuth();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState("");
  const [locations, setLocations] = useState("");
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const notifications = [];

  const servicesList = [
    "Electrician",
    "Plumber",
    "AC Repair",
    "Car Mechanic",
    "Painter",
    "Carpenter",
    "Home Cleaning",
    "Appliance Repair",
  ];

  const userCity = currentUser?.address?.city;

  const handleSearch = async () => {
    if (!services || !locations) {
      alert("Please enter service & location");
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/provider/service`,
        {
          params: {
            service: services,
          },
          withCredentials: true,
        },
      );

      console.log("Providers:", res.data);

      // store providers (optional if staying on same page)
      setProviders(res.data);

      // navigate to results page with data
      navigate(`/search?service=${services}&city=${locations}`, {
        state: { providers: res.data },
      });
    } catch (err) {
      console.error(err.response?.data?.message);
      alert("Failed to fetch providers");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/customer/logout`,
        {},
        { withCredentials: true },
      );

      logout(); // clear local state
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }

    const handleBooking = async (serviceName) => {
      const user = JSON.parse(localStorage.getItem("user"));

      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/booking/create`, {
          userId: user._id,
          service: serviceName,
          city: locations,
        });
        toast.success("Booking created successfully!");
      } catch (error) {
        toast.error("Booking failed.");
      }
    };

    navigate(`/services?service=${services}&city=${locations}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}
      <div className="grid md:grid-cols-2 gap-10 px-6 py-8 items-center ">
        {/* LEFT */}
        <div>
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Find <span className="text-green-600">Trusted Services</span> Near
            You
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Book electricians, plumbers, mechanics and more instantly.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-8 flex gap-4">
            <input
              type="text"
              placeholder="Search service..."
              value={services} // Set initial value to the first service
              onChange={(e) => setServices(e.target.value)}
              className="p-3 w-full rounded-lg border"
            />

            <select
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
              className="p-3 w-full rounded-lg border"
            >
              <option value="">Select City</option>

              {indiaCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <button
              onClick={handleSearch}
              className="bg-green-600 text-white px-6 rounded-lg hover:bg-green-700"
            >
              Search
            </button>
          </div>

          {/* TRUST TAGS */}
          <div className="flex gap-6 mt-6 text-sm text-gray-500">
            <span>Verified Professionals</span>
            <span>Instant Booking</span>
            <span>24/7 Support</span>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div>
          <img
            src="/src/assets/hero.png"
            alt="hero"
            className="w-[80%] max-w-md mx-auto"
          />
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div className="px-10 pb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Popular Services
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-700">{service}</h3>

              <p className="text-gray-500 mt-2 text-sm">
                Book trusted {service.toLowerCase()} near you.
              </p>

              <button
                onClick={() => {
                  if (!userCity) {
                    alert("City not found");
                    return;
                  }

                  navigate(`/search?service=${service}&city=${userCity}`);
                }}
                className="mt-4 text-green-600 font-semibold"
              >
                Book Now →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED PROVIDERS */}
      <div className="px-10 pb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Top-Rated Providers
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">Provider {item}</h3>
              <p className="text-gray-500 text-sm mt-2">
                ⭐ 4.{item} • 120+ jobs completed
              </p>

              <button
                onClick={() => navigate(`/provider/${item}`)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-white px-10 py-6 border-t flex justify-between text-sm text-gray-600">
        <span>✔ Trusted Platform</span>
        <span>⭐ Quality Service</span>
        <span>⏱ 24/7 Support</span>
        <span>🔒 Secure & Safe</span>
      </div>
    </div>
  );
}
