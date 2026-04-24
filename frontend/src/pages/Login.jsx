import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [role, setRole] = useState("customer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 🔥 Change API routes accordingly
      const url =
        role === "customer"
          ? "http://localhost:5000/api/customer/login"
          : "http://localhost:5000/api/provider/login";

      const res = await axios.post(url, formData);

      if (res.status === 200) {
        const user = res.data;

        // store user (optional)
        localStorage.setItem("user", JSON.stringify(user));

        // 🔥 Redirect based on role
        if (role === "customer") {
          navigate("/customer/home");
        } else {
          navigate("/provider/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* LEFT PANEL */}
      <div className="w-1/3 bg-[#0F3D2E] text-white p-10 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold">QuickFix</h1>
          <h2 className="text-2xl mt-10 font-semibold">
            Welcome <span className="text-[#A3E635]">Back</span>
          </h2>
          <p className="mt-4 text-gray-300">
            Login to continue using our services.
          </p>
        </div>

        {/* Role Toggle */}
        <div className="bg-white text-black p-5 rounded-xl">
          <h3 className="font-semibold mb-3">Login as</h3>

          <div
            onClick={() => setRole("customer")}
            className={`p-3 rounded-lg cursor-pointer mb-3 border ${
              role === "customer"
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
          >
            👤 Customer
          </div>

          <div
            onClick={() => setRole("provider")}
            className={`p-3 rounded-lg cursor-pointer border ${
              role === "provider"
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
          >
            🛠 Provider
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-2/3 flex items-center justify-center p-10">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {role === "customer" ? "Customer Login" : "Provider Login"}
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded"
            required
          />

          <button className="w-full bg-[#A3E635] text-black font-semibold py-3 rounded hover:bg-lime-400">
            Login
          </button>

          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-orange-500 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}