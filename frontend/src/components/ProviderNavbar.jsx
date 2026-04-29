import { Bell } from "lucide-react";

export default function ProviderNavbar({ provider }) {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <div>
        <h1 className="text-2xl font-bold">
          {getGreeting()}, {provider?.name || "User"} 👋
        </h1>
        <p className="text-gray-500 text-sm">
          Here's what's happening today
        </p>
      </div>

      <div className="flex items-center gap-6">
        <Bell />

        <div className="flex items-center gap-3">
          <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full">
            {provider?.name ? provider.name[0] : "U"}
          </div>

          <div>
            <p className="font-semibold">{provider?.name}</p>
            <p className="text-sm text-gray-500">
              {provider?.serviceType?.[0] || "Service"}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}