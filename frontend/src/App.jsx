import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerHome from "./pages/CustomerHome";
import ProviderHome from "./pages/ProviderHome";
import Services from "./pages/Services";
import ProviderProfile from "./pages/ProviderProfile";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/customer" element={<CustomerHome />} />
      <Route path="/provider" element={<ProviderHome />} />
      <Route path="/services" element={<Services />} />
      <Route path="/provider/:id" element={<ProviderProfile />} />
      
    </Routes>
  );
}

export default App;