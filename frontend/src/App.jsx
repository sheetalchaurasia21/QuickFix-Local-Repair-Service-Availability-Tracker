// import { Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import CustomerHome from "./pages/CustomerHome";
// import ProviderHome from "./pages/ProviderHome";
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminLogin from "./pages/AdminLogin";
// import Services from "./pages/Services";
// import ProviderProfile from "./pages/ProviderProfile";
// import Bookings from "./pages/Booking";
// import CustomerProfile from "./pages/CustomerProfile";
// import Wishlist from "./pages/Wishlist";
// import MyBookings from "./pages/MyBookings";
// import Search from "./pages/Search";

// function App() {
//   return (
//     <>
//       <Toaster position="top-center" />
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/customer" element={<CustomerHome />} />
//         <Route path="/profile" element={<CustomerProfile />} />
//         <Route path="/wishlist" element={<Wishlist />} />
//         <Route path="/help" element={<h1>Help Center</h1>} />

//         <Route path="/provider" element={<ProviderHome />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/provider/:id" element={<ProviderProfile />} />
//         <Route path="/book/:providerId" element={<Bookings />} />
//         <Route path="/bookings" element={<MyBookings />} />
//         <Route path="/search" element={<Search />} />
//       </Routes>
//     </>
//   );
// }
// export default App;


import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import CustomerHome from "./pages/CustomerHome";
import ProviderHome from "./pages/ProviderHome";

import CustomerProfile from "./pages/CustomerProfile";
import Wishlist from "./pages/Wishlist";
import MyBookings from "./pages/MyBookings";
import Search from "./pages/Search";

import Services from "./pages/Services";
import ProviderProfile from "./pages/ProviderProfile";
import Bookings from "./pages/Booking";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Card from "./components/Card";
import Help from "./pages/Help";

function App() {
  return (
    <>
      <Toaster position="top-center" />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* CUSTOMER + PROVIDER LAYOUT WRAPPER */}
        <Route element={<Layout />}>
          
          {/* CUSTOMER */}
          <Route path="/customer" element={<CustomerHome />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/help" element={<Help />} />

          {/* COMMON */}
          <Route path="/search" element={<Search />} />
          <Route path="/services" element={<Services />} />

          {/* PROVIDER */}
          <Route path="/provider" element={<ProviderHome />} />
          <Route path="/provider/:id" element={<ProviderProfile />} />
          <Route path="/book/:providerId" element={<Bookings />} />
          <Route path="/booking/:id" element={<Card/>} /> {/* for viewing booking details later */ }

        </Route>

        {/* ADMIN (separate layout optional later) */}
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </>
  );
}

export default App;