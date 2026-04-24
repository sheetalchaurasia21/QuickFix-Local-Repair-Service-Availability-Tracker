import { useState } from "react";

export default function Signup() {
  const [role, setRole] = useState("customer");
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessType: "",
    experience: "",
    phone: "",
    address: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ STEP 1 VALIDATION
  const validateStep1 = () => {
    if (!form.name || !form.email || !form.password) {
      alert("Fill all fields");
      return false;
    }
    if (role === "customer" && form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  const handleSubmit = () => {
    if (!form.agree) {
      alert("Accept terms first");
      return;
    }
    console.log(form);
    alert("Signup Done 🚀");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      
      {/* MAIN CONTENT */}
      <div className="flex flex-1 p-4 gap-4">

        {/* LEFT PANEL (UNCHANGED) */}
        <div className="w-1/3 bg-gradient-to-b from-green-800 to-green-900 text-white rounded-2xl p-8 flex flex-col justify-between">
          
          <div>
            <h1 className="text-3xl font-bold">QuickFix</h1>

            <h2 className="text-2xl mt-8 font-semibold">
              Create your <span className="text-lime-400">account</span>
            </h2>

            <p className="mt-3 text-gray-300">
              Join thousands of customers and professionals.
            </p>
          </div>

          <div className="bg-white text-black p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-4 text-lg">
              Choose account type
            </h3>

            <div
              onClick={() => setRole("customer")}
              className={`p-4 rounded-lg cursor-pointer mb-3 border ${
                role === "customer"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              <p className="font-semibold">I'm a Customer</p>
              <p className="text-sm text-gray-500">
                Book services near you
              </p>
            </div>

            <div
              onClick={() => setRole("provider")}
              className={`p-4 rounded-lg cursor-pointer border ${
                role === "provider"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              <p className="font-semibold">I'm a Provider</p>
              <p className="text-sm text-gray-500">
                Offer your services
              </p>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              🔒 Your data is safe with us.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-2/3 bg-white rounded-2xl shadow p-8 flex flex-col justify-between">
          
          <div>
            <h2 className="text-2xl font-bold text-center">
              {role === "customer"
                ? "Customer Sign Up"
                : "Provider Sign Up"}
            </h2>

            <p className="text-center text-gray-500 mb-6">
              Create your account to get started
            </p>

            {/* STEP INDICATOR */}
            <div className="flex justify-center items-center gap-6 mb-6">
              {[1,2,3].map((s)=>(
                <div key={s}
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                    step===s ? "bg-lime-400 text-black":"bg-gray-300"
                  }`}>
                  {s}
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-4">
              {step === 1
                ? role === "customer"
                  ? "Account Information"
                  : "Business Information"
                : step === 2
                ? "Additional Details"
                : "Verification"}
            </h3>

            {/* FORM */}
            <div className="space-y-4">

              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 border rounded-lg" />
                  <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded-lg" />
                  <input name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 border rounded-lg" />

                  {role === "customer" && (
                    <input name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full p-3 border rounded-lg" />
                  )}

                  {role === "provider" && (
                    <>
                      <input name="businessType" placeholder="Business Type" onChange={handleChange} className="w-full p-3 border rounded-lg" />
                      <input name="experience" placeholder="Experience" onChange={handleChange} className="w-full p-3 border rounded-lg" />
                    </>
                  )}
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <input name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-3 border rounded-lg" />

                  {role === "customer" ? (
                    <input name="address" placeholder="Address" onChange={handleChange} className="w-full p-3 border rounded-lg" />
                  ) : (
                    <input placeholder="Service Area / City" className="w-full p-3 border rounded-lg" />
                  )}
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <>
                  <label className="flex gap-2">
                    <input type="checkbox" name="agree" onChange={handleChange} />
                    I agree to Terms & Conditions
                  </label>
                </>
              )}
            </div>
          </div>

          {/* BUTTONS */}
          <div>
            {step < 3 ? (
              <button
                onClick={handleNext}
                className="w-full bg-lime-400 py-3 rounded-lg font-semibold hover:bg-lime-500 transition"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
              >
                Sign Up
              </button>
            )}

            <p className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <span className="text-orange-500 cursor-pointer">
                Login
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER (only text improved, layout same) */}
      <div className="bg-white mx-4 mb-4 rounded-2xl shadow p-4 flex justify-around text-sm">
        <div>
          ✔ Trusted Platform
          <p className="text-xs text-gray-500">Verified professionals</p>
        </div>
        <div>
          ⭐ Quality Service
          <p className="text-xs text-gray-500">Best experience</p>
        </div>
        <div>
          🕒 24/7 Support
          <p className="text-xs text-gray-500">Always available</p>
        </div>
        <div>
          🔒 Secure & Safe
          <p className="text-xs text-gray-500">Your data is protected</p>
        </div>
      </div>
    </div>
  );
}