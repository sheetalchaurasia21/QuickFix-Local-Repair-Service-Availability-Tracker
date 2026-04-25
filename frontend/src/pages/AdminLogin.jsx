import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? "http://localhost:8000/api/admin/login"
        : "http://localhost:8000/api/admin/signup";

      const res = await axios.post(url, form, {
        withCredentials: true
      });

      toast.success(
        isLogin ? "Login Successful!" : "Signup Successful!"
      );

      // redirect after 2 sec
      setTimeout(() => {
        navigate("/admin");
      }, 2000);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT PANEL */}
      <div className="w-1/2 bg-[#0F3D2E] text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">QuickFix</h1>
        <p className="text-gray-300">
          Admin Dashboard Access
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 flex justify-center items-center">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "Admin Login" : "Admin Signup"}
          </h2>

          {/* SIGNUP ONLY */}
          {!isLogin && (
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded"
              required
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded"
            required
          />

          <button className="w-full bg-lime-400 py-3 rounded font-semibold hover:bg-lime-500">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <p className="text-center mt-4 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-500 cursor-pointer ml-1"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}