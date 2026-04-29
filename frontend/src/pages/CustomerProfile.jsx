import { useState } from "react";
import axios from "axios";

export default function CustomerProfile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    addressLine1: user?.address?.addressLine1 || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    pinCode: user?.address?.pinCode || "",
  });

  const [editing, setEditing] = useState(false);

  const handleUpdate = async () => {
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        address: {
          addressLine1: form.addressLine1,
          city: form.city,
          state: form.state,
          pinCode: form.pinCode,
        },
      };

      const res = await axios.put(
        "http://localhost:8000/api/customer/update-profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("UPDATE SUCCESS ✅", res.data);
      alert("Updated successfully");

      setEditing(false);
    } catch (error) {
      console.log("FULL ERROR 👉", error);
      console.log("BACKEND ERROR 👉", error.response?.data);

      alert(error.response?.data?.message || "Update failed ❌");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (!user || !user._id) {
    return <p className="p-6">⚠️ Please login again</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            My Profile
          </h1>

          
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            disabled={!editing}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
            placeholder="Full Name"
          />

          <input
            disabled
            value={form.email}
            className="w-full p-2.5 border rounded-md bg-gray-100 text-gray-500"
            placeholder="Email"
          />

          <input
            disabled={!editing}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
            placeholder="Phone"
          />

          <input
            disabled={!editing}
            placeholder="Address Line"
            value={form.addressLine1}
            onChange={(e) =>
              setForm({ ...form, addressLine1: e.target.value })
            }
            className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
          />

          <input
            disabled={!editing}
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
          />

          <input
            disabled={!editing}
            placeholder="State"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
          />

          <input
            disabled={!editing}
            placeholder="Pin Code"
            value={form.pinCode}
            onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
            className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          <div>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="bg-[#A3E635] text-black px-5 py-2 rounded-md font-medium hover:bg-lime-400 transition"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-5 py-2 rounded-md font-medium hover:bg-green-700 transition"
              >
                Save
              </button>
            )}
          </div>

          
        </div>
      </div>
    </div>
  );
}