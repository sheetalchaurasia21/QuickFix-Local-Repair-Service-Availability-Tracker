import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const notifications = [];

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer text-xl relative"
      >
        <FontAwesomeIcon icon={faBell} />
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-3">
          <h3 className="font-semibold mb-2">Notifications</h3>

          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">
              No notifications 🔕
            </p>
          ) : (
            notifications.map((n, i) => (
              <div key={i} className="p-2 border-b text-sm">
                {n.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}