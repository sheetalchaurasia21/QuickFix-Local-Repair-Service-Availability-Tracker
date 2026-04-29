export default function ProviderSettings() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <div className="bg-white p-6 rounded-lg shadow max-w-md space-y-4">
        <input placeholder="Full Name" className="w-full p-2 border rounded" />
        <input placeholder="Phone Number" className="w-full p-2 border rounded" />

        <select className="w-full p-2 border rounded">
          <option>Select Service</option>
          <option>Plumber</option>
          <option>Electrician</option>
        </select>

        <input
          placeholder="Availability (e.g. 9AM - 6PM)"
          className="w-full p-2 border rounded"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Save Changes
        </button>
      </div>
    </div>
  );
}