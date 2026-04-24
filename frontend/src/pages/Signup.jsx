import { useState } from "react";

export default function Signup() {
  const [role, setRole] = useState("customer");

  const input =
    "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400";

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">

      {/* MAIN */}
      <div className="flex flex-1 p-6 gap-6">

        {/* LEFT PANEL */}
        <div className="w-1/3 bg-gradient-to-b from-green-900 to-green-700 text-white p-8 rounded-3xl flex flex-col justify-between">

          <div>
            <h1 className="text-xl font-bold mb-6">QuickFix</h1>

            <h2 className="text-3xl font-bold">
              Create your <span className="text-lime-400">account</span>
            </h2>

            <p className="mt-4 text-gray-300">
              Join thousands of customers and professionals.
            </p>
          </div>

          {/* SELECT CARD */}
          <div className="bg-white text-black p-5 rounded-xl shadow">

            <h3 className="font-semibold mb-4">Choose account type</h3>

            {/* CUSTOMER */}
            <div
              onClick={() => setRole("customer")}
              className={`flex items-center justify-between p-4 rounded-xl mb-3 cursor-pointer border ${
                role === "customer"
                  ? "bg-green-50 border-green-500"
                  : "border-gray-300"
              }`}
            >
              <div>
                <p className="font-semibold">I'm a Customer</p>
                <p className="text-sm text-gray-500">
                  Book services near you
                </p>
              </div>
              {role === "customer" && <span>✔</span>}
            </div>

            {/* PROVIDER */}
            <div
              onClick={() => setRole("provider")}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border ${
                role === "provider"
                  ? "bg-green-50 border-green-500"
                  : "border-gray-300"
              }`}
            >
              <div>
                <p className="font-semibold">I'm a Provider</p>
                <p className="text-sm text-gray-500">
                  Offer your services
                </p>
              </div>
              {role === "provider" && <span>✔</span>}
            </div>

            <div className="mt-4 text-sm text-gray-500">
              🔒 Your data is safe with us.
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-2/3 flex gap-6">

          {/* FORM CARD */}
          <div className="bg-white p-8 rounded-2xl shadow w-full">

            {/* HEADER */}
            <div className="text-center mb-6">
              <div className="text-3xl mb-2">
                {role === "customer" ? "👤" : "🧰"}
              </div>

              <h2 className="text-2xl font-bold">
                <span className="text-orange-500">
                  {role === "customer" ? "Customer" : "Provider"}
                </span>{" "}
                Sign Up
              </h2>

              <p className="text-gray-500 text-sm">
                Create your account to get started
              </p>
            </div>

            {/* STEPS */}
            <div className="flex justify-between items-center mb-6 text-sm">
              {["1", "2", "3"].map((step, i) => (
                <div key={i} className="flex-1 text-center">
                  <div
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                      i === 0
                        ? "bg-lime-400 text-black"
                        : "bg-gray-200"
                    }`}
                  >
                    {step}
                  </div>
                  <p className="mt-1 text-gray-500">
                    {i === 0
                      ? role === "customer"
                        ? "Account Info"
                        : "Business Info"
                      : i === 1
                      ? "Contact Info"
                      : "Verify"}
                  </p>
                </div>
              ))}
            </div>

            {/* SECTION TITLE */}
            <h3 className="font-semibold mb-4">
              {role === "customer"
                ? "Account Information"
                : "Business Information"}
            </h3>

            {/* FORM */}
            <div className="space-y-3 ">

              {/* COMMON */}
              <input className={input} placeholder="Full Name" />
              <input className={input} placeholder="Email" />
              <input type="password" className={input} placeholder="Password" />

              {/* CONDITIONAL */}
              {role === "customer" ? (
                <>
                  <input className={input} placeholder="Confirm Password" />
                </>
              ) : (
                <>
                  <input className={input} placeholder="Business Type" />
                  <input className={input} placeholder="Experience" />
                </>
              )}

            </div>

            {/* BUTTON */}
            <button className="w-full mt-6 bg-lime-400 py-3 rounded-lg font-semibold hover:bg-lime-500">
              Next Step →
            </button>

            {/* LOGIN */}
            <p className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <span className="text-orange-500 cursor-pointer">
                Login
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-white mx-6 mb-6 rounded-2xl shadow p-6 flex justify-between text-sm">

        <div className="flex items-center gap-2">
          ✔ Trusted Platform
        </div>

        <div className="flex items-center gap-2">
          ⭐ Quality Service
        </div>

        <div className="flex items-center gap-2">
          ⏱ 24/7 Support
        </div>

        <div className="flex items-center gap-2">
          🔒 Secure & Safe
        </div>

      </div>
    </div>
  );
}