import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import NotificationBell from "./NotificationBell";
import { useAuth } from "../context/AuthContext";

const CustomerNavbar = () => {
  const navigate = useNavigate();
   const { logout,currentUser } = useAuth(); 
  const [menuOpen, setMenuOpen] = useState(false);

  // const handleLogout = () => {
  //   logout();             
  //   navigate("/login");    
  // };

  return (
    <nav className="flex justify-between items-center px-10 py-3 bg-white shadow-md sticky top-0 z-50">

      {/* Logo */}
      <h1
        onClick={() => navigate("/customer")}
        className="text-2xl font-bold text-green-700 cursor-pointer"
      >
        QuickFix
      </h1>

      {/* Links */}
      <div className="flex gap-6 items-center text-sm font-medium">

        <button onClick={() => navigate("/customer")} className="hover:text-green-600">
          Home
        </button>

        <button onClick={() => navigate("/services")} className="hover:text-green-600">
          Services
        </button>

        <button onClick={() => navigate("/bookings")} className="hover:text-green-600">
          Bookings
        </button>

        {/* Notification */}
        <NotificationBell />

        {/* Profile */}
        <div className="relative">

          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center"
          >
            {currentUser?.profileImage ? (
    <img
      src={`${import.meta.env.VITE_BACKEND_URL}${currentUser.profileImage}`}
      alt="profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <FontAwesomeIcon icon={faUser} className="text-white" />
  )}
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-3 bg-white shadow-lg rounded-lg w-44 overflow-hidden text-sm">

              <p onClick={() => navigate("/profile")} className="p-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </p>

              <p onClick={() => navigate("/bookings")} className="p-2 hover:bg-gray-100 cursor-pointer">
                My Bookings
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
};

export default CustomerNavbar;