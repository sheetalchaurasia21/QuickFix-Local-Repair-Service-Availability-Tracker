import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerHome from "./pages/CustomerHome";
import ProviderHome from "./pages/ProviderHome";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="top-center" />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/customer" element={<CustomerHome />} />
      <Route path="/provider" element={<ProviderHome />} />
    </Routes>
    </>
  );
}
export default App;
