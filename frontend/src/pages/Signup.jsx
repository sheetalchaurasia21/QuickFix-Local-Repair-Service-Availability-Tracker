import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [role, setRole] = useState("customer");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

    // customer
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    pinCode: "",

    // provider
    businessType: "",
    experience: "",
    selectedDays: [],
    startTime: "",
    endTime: "",

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
    if (!form.name || !form.email) {
      toast.error("Fill all fields");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Enter a valid email");
      return false;
    }

    if (role === "provider" && !form.businessType) {
      toast.error("Enter service type");
      return false;
    }

    if (role === "provider" && !form.experience) {
      toast.error("Enter your experience");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    // STEP 1 VALIDATION
    if (step === 1 && !validateStep1()) return;

    // STEP 2 VALIDATION
    if (step === 2) {
      if (!form.phone) {
        toast.error("Enter phone number");
        return;
      }

      if (role === "customer") {
        if (!form.addressLine1 || !form.city || !form.state || !form.pinCode) {
          toast.error("Fill all address fields");
          return;
        }
      } else {
        if (form.selectedDays.length === 0) {
          toast.error("Select at least one day");
          return;
        }
        if (!form.startTime || !form.endTime) {
          toast.error("Enter start and end time");
          return;
        }
      }
    }

    setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log("FORM 👉", form);

      // Validation
      if (!form.agree) {
        toast.error("Accept terms first");
        setLoading(false);
        return;
      }

      if (!form.password || !form.confirmPassword) {
        toast.error("Enter password and confirm password");
        return;
      }

      if (form.password !== form.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      if (form.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      // Build payload based on role
      let payload;
      if (role === "customer") {
        payload = {
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          address: {
            addressLine1: form.addressLine1,
            city: form.city,
            state: form.state,
            pinCode: form.pinCode,
          },
        };
      } else {
        payload = {
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          serviceType: form.businessType,
          experience: form.experience,
          availability: form.selectedDays.map((day) => ({
            day,
            startTime: form.startTime,
            endTime: form.endTime,
          })),
        };
      }

      const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const url = `${apiBaseUrl}/api/${role}/signup`;

      const res = await axios.post(url, payload, { withCredentials: true });

      toast.success("Signup successful 🚀 Redirecting...");
      console.log("SUCCESS 👉", res.data);

      setTimeout(() => {
        navigate(role === "customer" ? "/customer" : "/provider");
      }, 2000);
      } catch (err) {
        console.log("FULL ERROR 👉", err);
        console.log("BACKEND ERROR 👉", err.response?.data);

        toast.error(err.response?.data?.message || "Signup failed");
      }
     finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === "customer") {
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        addressLine1: "",
        city: "",
        state: "",
        pinCode: "",
        agree: false,
      });
    } else {
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        businessType: "",
        experience: "",
        phone: "",
        selectedDays: [],
        startTime: "",
        endTime: "",
        agree: false,
      });
    }

    setStep(1);
  }, [role]);

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
            <h3 className="font-semibold mb-4 text-lg">Choose account type</h3>

            <div
              onClick={() => setRole("customer")}
              className={`p-4 rounded-lg cursor-pointer mb-3 border ${
                role === "customer"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              <p className="font-semibold">I'm a Customer</p>
              <p className="text-sm text-gray-500">Book services near you</p>
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
              <p className="text-sm text-gray-500">Offer your services</p>
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
              {role === "customer" ? "Customer Sign Up" : "Provider Sign Up"}
            </h2>

            <p className="text-center text-gray-500 mb-6">
              Create your account to get started
            </p>

            {/* STEP INDICATOR */}
            <div className="relative flex justify-center items-center gap-6 mb-6">

  {/* BACK BUTTON (LEFT CORNER) */}
  {step > 1 && (
    <button
      onClick={handleBack}
      className="absolute left-0 w-10 h-10 rounded-full font-extrabold bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center"
    >
      ←
    </button>
  )}

  {/* STEP INDICATOR (UNCHANGED) */}
  {[1, 2, 3].map((s) => (
    <div
      key={s}
      className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
        step === s ? "bg-lime-400 text-black" : "bg-gray-300"
      }`}
    >
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
            <div className="flex flex-col gap-4">
              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  />

                  {role === "provider" && (
                    <>
                      <input
                        name="businessType"
                        placeholder="Service Type (plumber, electrician)"
                        value={form.businessType}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                      />
                      <input
                        name="experience"
                        placeholder="Experience (years)"
                        value={form.experience}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                      />
                    </>
                  )}
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  />

                  {role === "customer" ? (
                    <>
                      <input
                        name="addressLine1"
                        placeholder="Address"
                        value={form.addressLine1}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                      />
                      <input
                        name="city"
                        placeholder="City"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                      />
                      <input
                        name="state"
                        placeholder="State"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                      />
                      <input
                        name="pinCode"
                        placeholder="Pin Code"
                        value={form.pinCode}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-2">
  <label className="font-semibold">Available Days</label>

  {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((day) => (
    <label key={day} className="flex items-center gap-2">
      <input
        type="checkbox"
        value={day}
        checked={form.selectedDays?.includes(day) || false}
        onChange={(e) => {
          if (e.target.checked) {
            setForm({
              ...form,
              selectedDays: [...(form.selectedDays || []), day],
            });
          } else {
            setForm({
              ...form,
              selectedDays: form.selectedDays.filter((d) => d !== day),
            });
          }
        }}
      />
      {day}
    </label>
  ))}
</div>

                      <input
                        type="time"
                        name="startTime"
                        value={form.startTime}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                      />
                      <input
                        type="time"
                        name="endTime"
                        value={form.endTime}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                      />
                    </>
                  )}
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  />

                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg"
                    />
                  

                  <label className="flex gap-2">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={form.agree}
                      onChange={handleChange}
                    />
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
                className="w-full bg-lime-400 text-black py-3 rounded-lg font-semibold hover:bg-lime-500 transition"
              >
                Next →
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-lime-400 text-black py-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-lime-500 transition"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            )}

            <p className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-orange-500 cursor-pointer"
              >
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
