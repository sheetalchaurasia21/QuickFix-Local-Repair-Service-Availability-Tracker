import { Bell } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProviderNavbar() {
  const { currentUser, logout } = useAuth();

  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const navigate = useNavigate();

  const name = currentUser?.name || "Provider";

  return (
    <header className="flex justify-between items-center bg-green-700 text-white px-6 py-4 rounded-md mb-6">
      
      {/* GREETING */}
      <h2 className="text-lg font-semibold">
        Good afternoon, {name}
      </h2>

      <div className="flex items-center gap-6 relative">
        
        {/* Notifications */}
        <div className="relative">
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
        <div className="relative">
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