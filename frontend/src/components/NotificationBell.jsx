import { use, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const notifications = [];
  const bellRef = useRef(null);
useEffect(() => {
  const handleClickOutside = (event) => {
    if (bellRef.current && !bellRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="relative" ref={bellRef}>
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