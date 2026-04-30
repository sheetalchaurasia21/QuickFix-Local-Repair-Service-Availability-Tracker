import { Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function ProviderNavbar() {
  const { currentUser, logout } = useAuth();

  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const profileRef = useRef();
  const notifRef = useRef();

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfile(false);
    }
    if (notifRef.current && !notifRef.current.contains(event.target)) {
      setShowNotif(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const navigate = useNavigate();

  const name = currentUser?.name || "Provider";


  const [isAvailable, setIsAvailable] = useState(false);
const [loading, setLoading] = useState(false);

// fetch current status (optional but recommended)
useEffect(() => {
  const fetchStatus = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/provider/me`, {
        withCredentials: true,
      });
      setIsAvailable(res.data.isAvailableNow);
    } catch (err) {
      console.log(err);
    }
  };

  fetchStatus();
}, []);

const toggleAvailability = async () => {
  try {
    setLoading(true);

    const res = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/provider/toggle-availability`,
      {},
      { withCredentials: true }
    );

    setIsAvailable(res.data.isAvailableNow);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <header className="flex justify-between items-center bg-green-700 text-white px-6 py-4 rounded-md mb-6">
      
      {/* GREETING */}
      <h2 className="text-lg font-semibold">
        Good afternoon, {name}
      </h2>

      <div className="flex items-center gap-6 relative">
        <button
  onClick={toggleAvailability}
  disabled={loading}
  className={`mr-4 px-3 py-1 rounded text-sm font-medium transition ${
    isAvailable ? "bg-green-600 text-white" : "bg-gray-400 text-white"
  }`}
>
  {loading
    ? "..."
    : isAvailable
    ? "Available"
    : "Not Available"}
</button>
        
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          
          <Bell
            className="cursor-pointer"
            onClick={() => setShowNotif(!showNotif)}
          />

          {showNotif && (
            <div className="absolute right-0 mt-3 w-64 bg-white text-black rounded-lg shadow-lg p-4 z-50">
              <h4 className="font-semibold mb-2">Notifications</h4>
              <p className="text-sm text-gray-500">
                No new notifications
              </p>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="cursor-pointer"
          >
            {/* Avatar */}
            <div className="bg-white text-green-700 rounded-full w-9 h-9 flex items-center justify-center font-semibold">
              {name?.[0]?.toUpperCase()}
            </div>
          </div>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-44 bg-white text-black rounded-lg shadow-lg p-3 z-50">
              
              <button
                onClick={() => navigate("/provider/profile")}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
              >
                Profile
              </button>

              <button
                onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}
                className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 rounded"
              >
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}