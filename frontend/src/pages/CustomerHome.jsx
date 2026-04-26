import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
  
export default function CustomerHome() {
  const navigate = useNavigate();
  const [services, setServices] = useState("");
  const [locations, setLocations] = useState("");
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
  if (!services || !locations) {
    alert("Please enter service & location");
    return;
  }

  
  navigate(`/services?service=${services}&city=${locations}`);
};


  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-3 bg-white shadow">
        <h1 className="text-2xl font-bold text-green-700">QuickFix</h1>

        <div className="flex gap-6 items-center">
          <button className="text-gray-700 hover:text-green-600">Home</button>
          <button className="text-gray-700 hover:text-green-600">Services</button>
          <button className="text-gray-700 hover:text-green-600">Bookings</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Logout
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="grid md:grid-cols-2 gap-10 px-6 py-8 items-center">
        
        {/* LEFT */}
        <div>
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Find <span className="text-green-600">Trusted Services</span> Near You
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
              <option>Bhubaneswar</option>
              <option>Rourkela</option>
              <option>Khordha</option>
              <option>Cuttack</option>
              <option>Ranchi</option>
              <option>Jamshedpur</option>
              <option>Gurgaon</option>
              <option>Noida</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Chennai</option>
              <option>Kolkata</option>
              <option>Lucknow</option>
              <option>Kanpur</option>
              <option>Agra</option>
            </select>
            <button onClick = {handleSearch}className="bg-green-600 text-white px-6 rounded-lg hover:bg-green-700">
              Search
            </button>
          </div>

          {/* TRUST TAGS */}
          <div className="flex gap-6 mt-6 text-sm text-gray-500">
            <span>✔ Verified Professionals</span>
            <span>✔ Instant Booking</span>
            <span>✔ 24/7 Support</span>
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
          
          {[
            "Electrician",
            "Plumber",
            "AC Repair",
            "Car Mechanic",
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-700">
                {service}
              </h3>
              <p className="text-gray-500 mt-2 text-sm">
                Book trusted {service.toLowerCase()} near you.
              </p>

              <button onClick={() => navigate(`/services?service=${service}&city=${locations}`)} className="mt-4 text-green-600 font-semibold">
                Book Now →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED PROVIDERS */}
      <div className="px-10 pb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Featured Providers
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

              <button onClick={() => navigate(`/provider/${item}`)} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
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