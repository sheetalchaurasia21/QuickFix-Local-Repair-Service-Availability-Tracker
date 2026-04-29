import { Outlet } from "react-router-dom";

import CustomerNavbar from "./CustomerNavbar";
import ProviderNavbar from "./ProviderNavbar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { role } = useAuth();

  // decide role safely
//   const role = role;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* NAVBAR */}
      {role === "customer" ? (
        <CustomerNavbar />
      ) : role === "provider" ? (
        <ProviderNavbar />
      ) : null}

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Layout;