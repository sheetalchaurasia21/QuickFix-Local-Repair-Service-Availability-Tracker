import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function CustomerProfile() {
  const { currentUser, login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    pinCode: "",
    profileImageFile: null,
    preview: null,
  });

  const [editing, setEditing] = useState(false);

  // Load user data
  useEffect(() => {
    if (currentUser) {
      setForm((prev) => ({
        ...prev,
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        addressLine1: currentUser.address?.addressLine1 || "",
        city: currentUser.address?.city || "",
        state: currentUser.address?.state || "",
        pinCode: currentUser.address?.pinCode || "",
        preview: null,
      }));
    }
  }, [currentUser]);

  // UPDATE PROFILE
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("addressLine1", form.addressLine1);
      formData.append("city", form.city);
      formData.append("state", form.state);
      formData.append("pinCode", form.pinCode);

      if (form.profileImageFile) {
        formData.append("profileImage", form.profileImageFile);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/customer/update-profile`,
        formData,
        { withCredentials: true }
      );

      login(res.data.user, "customer");

      alert("Updated successfully");

      setEditing(false);
      setForm((prev) => ({
        ...prev,
        profileImageFile: null,
        preview: null,
      }));

    } catch (error) {
      alert(error.response?.data?.message || "Update failed ❌");
    }
  };

  if (!currentUser) {
    return <p className="p-6">⚠️ Please login again</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row justify-center gap-10 px-4 py-10">

      {/* PROFILE IMAGE */}
     <div className="w-64 flex flex-col items-center py-20">

  {/* Hidden file input */}
  <input
    type="file"
    accept="image/*"
    id="profileUpload"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        setForm((prev) => ({
          ...prev,
          profileImageFile: file,
          preview: URL.createObjectURL(file),
        }));
      }
    }}
  />

  {/* Image */}
  <div className="relative w-60 h-60 rounded-full overflow-hidden ">
    {form.preview || currentUser.profileImage ? (
      <img
        src={
          form.preview
            ? form.preview
            : `${import.meta.env.VITE_BACKEND_URL}${currentUser.profileImage}?t=${Date.now()}`
        }
        alt="Profile"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <FontAwesomeIcon icon={faUser} className="text-5xl text-gray-400" />
      </div>
    )}
  </div>

  {/* ✅ Select Image Button */}
  {editing && (
    <label
      htmlFor="profileUpload"
      className="mt-4 px-5 py-2 bg-green-700 text-white text-sm rounded-lg cursor-pointer hover:bg-green-800 transition"
    >
      Select Image
    </label>
  )}

</div>

      {/* FORM */}
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md p-10">

        <h1 className="text-3xl font-bold py-2 text-center ">My Profile</h1>

        <div className="grid grid-cols-1 gap-6">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              disabled={!editing}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border rounded-md mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              disabled
              value={form.email}
              className="w-full p-3 border rounded-md bg-gray-100 mt-1"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              disabled={!editing}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-3 border rounded-md mt-1"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              disabled={!editing}
              value={form.addressLine1}
              onChange={(e) =>
                setForm({ ...form, addressLine1: e.target.value })
              }
              className="w-full p-3 border rounded-md mt-1"
            />
          </div>

          {/* City */}
          <div>
            <label className="text-sm font-medium text-gray-700">City</label>
            <input
              disabled={!editing}
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full p-3 border rounded-md mt-1"
            />
          </div>

          {/* State */}
          <div>
            <label className="text-sm font-medium text-gray-700">State</label>
            <input
              disabled={!editing}
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full p-3 border rounded-md mt-1"
            />
          </div>

          {/* Pin Code */}
          <div>
            <label className="text-sm font-medium text-gray-700">Pin Code</label>
            <input
              disabled={!editing}
              value={form.pinCode}
              onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
              className="w-full p-3 border rounded-md mt-1"
            />
          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-10 flex gap-4">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-lime-400 px-6 py-2 rounded font-medium hover:bg-lime-500"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700"
            >
              Save
            </button>
          )}
        </div>

      </div>
    </div>
  );
}