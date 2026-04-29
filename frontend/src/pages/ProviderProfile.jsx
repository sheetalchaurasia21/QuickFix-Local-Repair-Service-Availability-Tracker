import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function ProviderProfile() {
  const { currentUser, login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    serviceType: "",
    isAvailableNow: false,

    availability: [],

    tempDay: "",
    tempStart: "",
    tempEnd: "",

    profileImageFile: null,
    preview: null,
  });

  const [editing, setEditing] = useState(false);

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    if (currentUser) {
      setForm((prev) => ({
        ...prev,
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        city: currentUser.address?.city || "",
        state: currentUser.address?.state || "",
        serviceType: currentUser.serviceType?.join(", ") || "",
        isAvailableNow: currentUser.isAvailableNow || false,

        availability: currentUser.availability || [],

        preview: null,
      }));
    }
  }, [currentUser]);

  // =========================
  // UPDATE PROFILE
  // =========================
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("city", form.city);
      formData.append("state", form.state);

      const servicesArray = form.serviceType
        .split(",")
        .map((s) => s.trim().toLowerCase());

      formData.append("serviceType", JSON.stringify(servicesArray));
      formData.append("isAvailableNow", form.isAvailableNow);

      // ✅ IMPORTANT FIX
      formData.append("availability", JSON.stringify(form.availability));

      if (form.profileImageFile) {
        formData.append("profileImage", form.profileImageFile);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/provider/update-profile`,
        formData,
        { withCredentials: true }
      );

      login(res.data.user, "provider");

      alert("Profile updated successfully");

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
    return <p className="p-6">Please login again</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row justify-center gap-10 px-4 py-10">

      {/* ================= IMAGE ================= */}
      <div className="w-64 flex flex-col items-center py-20">

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

        <div className="w-60 h-60 rounded-full overflow-hidden">
          {form.preview || currentUser.profileImage ? (
            <img
              src={
                form.preview
                  ? form.preview
                  : `${import.meta.env.VITE_BACKEND_URL}${currentUser.profileImage}?t=${Date.now()}`
              }
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <FontAwesomeIcon icon={faUser} className="text-5xl text-gray-400" />
            </div>
          )}
        </div>

        {editing && (
          <label
            htmlFor="profileUpload"
            className="mt-4 px-5 py-2 bg-green-700 text-white text-sm rounded-lg cursor-pointer"
          >
            Select Image
          </label>
        )}
      </div>

      {/* ================= FORM ================= */}
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md p-10">

        <h1 className="text-3xl font-bold text-center mb-6">
          Provider Profile
        </h1>

        <div className="grid gap-6">

          <input
            disabled={!editing}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border rounded"
            placeholder="Name"
          />

          <input
            disabled
            value={form.email}
            className="w-full p-3 border rounded bg-gray-100"
          />

          <input
            disabled={!editing}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full p-3 border rounded"
            placeholder="Phone"
          />

          <input
            disabled={!editing}
            value={form.serviceType}
            onChange={(e) =>
              setForm({ ...form, serviceType: e.target.value })
            }
            className="w-full p-3 border rounded"
            placeholder="Service Types"
          />

          <input
            disabled={!editing}
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full p-3 border rounded"
            placeholder="City"
          />

          <input
            disabled={!editing}
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            className="w-full p-3 border rounded"
            placeholder="State"
          />

          {/* ================= AVAILABILITY ================= */}
          <div>
            <label className="text-sm font-semibold">Availability</label>

            {!editing ? (
              <div className="p-3 border rounded mt-1">
                {form.availability.length === 0 ? (
                  <span className="text-gray-400">Not set</span>
                ) : (
                  form.availability.map((a, i) => (
                    <div key={i} className="text-sm">
                      {a.day} : {a.startTime} - {a.endTime}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <>
                {/* ADD SLOT */}
                <div className="border p-4 rounded mt-2">
                  <div className="grid grid-cols-3 gap-2">

                    <select
                      value={form.tempDay}
                      onChange={(e) =>
                        setForm({ ...form, tempDay: e.target.value })
                      }
                      className="border p-2 rounded"
                    >
                      <option value="">Day</option>
                      {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(d => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>

                    <input
                      type="time"
                      value={form.tempStart}
                      onChange={(e) =>
                        setForm({ ...form, tempStart: e.target.value })
                      }
                      className="border p-2 rounded"
                    />

                    <input
                      type="time"
                      value={form.tempEnd}
                      onChange={(e) =>
                        setForm({ ...form, tempEnd: e.target.value })
                      }
                      className="border p-2 rounded"
                    />
                  </div>

                  <button
                    type="button"
                    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => {
  if (!form.tempDay || !form.tempStart || !form.tempEnd) return;

  const filtered = form.availability.filter(
    (a) => a.day !== form.tempDay
  );

  setForm({
    ...form,
    availability: [
      ...filtered,
      {
        day: form.tempDay,
        startTime: form.tempStart,
        endTime: form.tempEnd,
      },
    ],
    tempDay: "",
    tempStart: "",
    tempEnd: "",
  });
}}
                  >
                    Add
                  </button>
                </div>

                {/* LIST */}
                <div className="mt-3">
                  {form.availability.map((a, i) => (
                    <div
                      key={i}
                      className="flex justify-between p-2 border rounded mt-2"
                    >
                      <span>
                        {a.day} ({a.startTime} - {a.endTime})
                      </span>

                      <button
                        className="text-red-500"
                        onClick={() =>
                          setForm({
                            ...form,
                            availability: form.availability.filter((_, idx) => idx !== i),
                          })
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>

        {/* BUTTON */}
        <div className="mt-8">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-lime-400 px-6 py-2 rounded"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Save
            </button>
          )}
        </div>

      </div>
    </div>
  );
}