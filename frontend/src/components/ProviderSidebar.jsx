import { Link, useLocation } from "react-router-dom";

export default function ProviderSidebar() {
  const { pathname } = useLocation();

  const active = (path) =>
    pathname === path
      ? "bg-green-600 text-white"
      : "text-gray-700 hover:bg-gray-100";

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-green-700 mb-6">QuickFix</h1>

      <nav className="space-y-2">
        <Link to="/provider" className={`block p-2 rounded ${active("/provider")}`}>
          Dashboard
        </Link>

        <Link to="/provider/bookings" className={`block p-2 rounded ${active("/provider/bookings")}`}>
          Bookings
        </Link>

        <Link to="/provider/reviews" className={`block p-2 rounded ${active("/provider/reviews")}`}>
          Reviews
        </Link>

        <Link
          to="/provider/requests"
          className={`block p-2 rounded ${active("/provider/requests")}`}
        >
          Booking Requests
        </Link>

        <Link to="/provider/profile" className={`block p-2 rounded ${active("/provider/settings")}`}>
          My Profile  
        </Link>
      </nav>
    </div>
  );
}