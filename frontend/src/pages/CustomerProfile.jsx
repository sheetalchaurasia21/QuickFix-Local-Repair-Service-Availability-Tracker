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
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <input
        disabled={!editing}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        disabled
        value={form.email}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        disabled={!editing}
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        disabled={!editing}
        placeholder="Address Line"
        value={form.addressLine1}
        onChange={(e) =>
          setForm({ ...form, addressLine1: e.target.value })
        }
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        disabled={!editing}
        placeholder="City"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        disabled={!editing}
        placeholder="State"
        value={form.state}
        onChange={(e) => setForm({ ...form, state: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        disabled={!editing}
        placeholder="Pin Code"
        value={form.pinCode}
        onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />

      {!editing ? (
        <button
          onClick={() => setEditing(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Edit
        </button>
      ) : (
        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded mr-2"
        >
          Save
        </button>
      )}

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}