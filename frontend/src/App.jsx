import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerHome from "./pages/CustomerHome";
import ProviderHome from "./pages/ProviderHome";
import Services from "./pages/Services";
import ProviderProfile from "./pages/ProviderProfile";

function App() {
  return (
    <>
      {/* Toast Notifications */}
      <Toaster position="top-center" />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Customer */}
        <Route path="/customer" element={<CustomerHome />} />

        {/* Provider */}
        <Route path="/provider" element={<ProviderHome />} />

        {/* Services */}
        <Route path="/services" element={<Services />} />

        {/* Dynamic Provider Profile */}
        <Route path="/provider/:id" element={<ProviderProfile />} />
      </Routes>
    </>
  );
}

export default App;