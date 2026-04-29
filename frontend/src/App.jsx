import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerHome from "./pages/CustomerHome";
import ProviderHome from "./pages/ProviderHome";
import Services from "./pages/Services";
import ProviderProfile from "./pages/ProviderProfile";
import Bookings from "./pages/Bookings";
import CustomerProfile from "./pages/CustomerProfile";
import Wishlist from "./pages/Wishlist";
import ProviderBookings from "./pages/ProviderBookings";
import ProviderSettings from "./pages/ProviderSettings";
import ProviderLayout from "./layout/ProviderLayout";


function App() {
  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/profile" element={<CustomerProfile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/help" element={<h1>Help Center</h1>} />

        <Route path="/provider" element={<ProviderLayout />}>
          <Route index element={<ProviderHome />} />
          <Route path="profile" element={<ProviderProfile />} />
          <Route path="bookings" element={<ProviderBookings />} />
          <Route path="availability" element={<h1>Provider Availability</h1>} />
          <Route path="reviews" element={<h1>Provider Reviews</h1>} />
          <Route path="settings" element={<ProviderSettings />} />
        </Route>

        <Route path="/services" element={<Services />} />
        <Route path="/provider/:id" element={<ProviderHome />} />
      </Routes>
    </>
  );
}

export default App;