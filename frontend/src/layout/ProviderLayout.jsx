import ProviderSidebar from "../components/ProviderSidebar";
import { Outlet } from "react-router-dom";

export default function ProviderLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <div className="w-64 fixed left-0 top-0 h-full bg-white shadow">
        <ProviderSidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <Outlet />
      </div>

    </div>
  );
}