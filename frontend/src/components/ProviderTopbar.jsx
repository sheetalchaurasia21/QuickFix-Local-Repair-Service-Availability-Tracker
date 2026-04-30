import { Bell, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProviderTopbar({ name, role }) {

  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();
  const [notifications] = useState([
    "New booking received",
    "Customer left a review"
  ]);

  {showNotif && (
  <div className="absolute right-0 mt-3 w-64 bg-white text-black rounded shadow p-4">
    <h4 className="font-semibold mb-2">Notifications</h4>
    {notifications.length === 0 ? (
      <p>No notifications</p>
    ) : (
      notifications.map((n, i) => (
        <p key={i} className="text-sm border-b py-1">{n}</p>
      ))
    )}
  </div>
)}

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center bg-green-700 text-white px-6 py-4 rounded-md mb-6">
      <h2 className="text-lg font-semibold">
        Good afternoon, {name} 👋
      </h2>

      <div className="flex items-center gap-6 relative">
        
        {/* 🔔 Notifications */}
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

        {/* 👤 Profile */}
        <div className="relative">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-white text-green-700 rounded-full px-3 py-1 font-semibold">
              {name?.[0] || "P"}
            </div>
            <span className="text-sm">{role}</span>
          </div>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-lg shadow-lg p-3 z-50">
              <button
                onClick={() => navigate("/provider/profile")}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                >
                Profile
                </button>

                <button
                onClick={() => navigate("/provider/settings")}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                >
                Settings
                </button>

                <button
                onClick={() => {
                    localStorage.removeItem("token");
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