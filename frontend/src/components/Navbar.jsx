import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow">
      
      {/* LOGO */}
      <h1
        onClick={() => navigate("/customer")}
        className="text-2xl font-bold text-green-700 cursor-pointer"
      >
        QuickFix
      </h1>

      <div className="flex gap-6 items-center">

        {/* NAV LINKS */}
        <button onClick={() => navigate("/customer")} className="hover:text-green-600">
          Home
        </button>

        <button onClick={() => navigate("/services")} className="hover:text-green-600">
          Services
        </button>

        <button onClick={() => navigate("/bookings")} className="hover:text-green-600">
          Bookings
        </button>

        {/* 🔔 NOTIFICATION */}
        <NotificationBell />

        {/* 👤 PROFILE */}
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer bg-green-600 text-white px-3 py-1 rounded-full"
          >
            👤
          </div>

          {open && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40">
              <button onClick={() => navigate("/profile")} className="p-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </button>

              <p onClick={() => navigate("/bookings")} className="p-2 hover:bg-gray-100 cursor-pointer">
                My Orders
              </p>

              <p onClick={() => navigate("/wishlist")} className="p-2 hover:bg-gray-100 cursor-pointer">
                Wishlist
              </p>

              <p onClick={() => navigate("/help")} className="p-2 hover:bg-gray-100 cursor-pointer">
                Help Center
              </p>

              <p
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
                className="p-2 text-red-500 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}