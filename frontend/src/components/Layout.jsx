import { Outlet } from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";
import ProviderNavbar from "./ProviderNavbar";
import ProviderSidebar from "./ProviderSidebar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { role } = useAuth();

  // ✅ PROVIDER LAYOUT
  if (role === "provider") {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">

        {/* MAIN SECTION (SIDEBAR + CONTENT) */}
        <div className="flex flex-1">

          {/* SIDEBAR */}
          <div className="w-64 bg-white shadow-md">
            <ProviderSidebar />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 flex p-6 flex-col">

            {/* TOPBAR */}
            <ProviderNavbar />

            {/* CONTENT */}
            <main className="flex-1 ">
              <Outlet />
            </main>

          </div>
        </div>

        {/* ✅ FOOTER FULL WIDTH */}
        <Footer />

      </div>
    );
  }

  // ✅ CUSTOMER LAYOUT (UNCHANGED)
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <CustomerNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;