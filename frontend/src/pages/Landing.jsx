import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="font-sans">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-4 bg-green-900 text-white">
        <h1 className="text-xl font-bold">QuickFix</h1>

        <div className="space-x-3">
          <button
            onClick={() => navigate("/login")}
            className="border px-4 py-1 rounded hover:bg-white hover:text-black transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-lime-400 text-black px-4 py-1 rounded hover:bg-lime-300 transition"
          >
            Signup
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="flex items-center justify-between px-16 py-20 bg-gradient-to-r from-green-900 to-green-700 text-white">

        {/* LEFT */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold leading-tight">
            Find <span className="text-lime-400">Trusted Services</span> Near You
          </h1>

          <p className="mt-4 text-gray-200">
            Book electricians, plumbers and more instantly based on availability.
          </p>

          {/* SEARCH */}
          <div className="flex mt-6 space-x-3">
            <input
              type="text"
              placeholder="Search service..."
              className="px-4 py-2 rounded text-black w-48"
            />
            <input
              type="text"
              placeholder="Location"
              className="px-4 py-2 rounded text-black w-40"
            />
            <button className="bg-lime-400 text-black px-6 rounded hover:bg-lime-300">
              Search
            </button>
          </div>

          {/* FEATURES */}
          <div className="mt-5 space-x-4 text-sm text-gray-200">
            <span>✔ Verified professionals</span>
            <span>✔ Fast booking</span>
            <span>✔ 24/7 support</span>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
            alt="worker"
            className="w-80"
          />
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 text-center py-12 bg-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-green-700">15+</h2>
          <p>Years Experience</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-700">₹40K+</h2>
          <p>Jobs Completed</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-700">20K+</h2>
          <p>Customers</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-700">24/7</h2>
          <p>Support</p>
        </div>
      </div>

      {/* BENEFITS */}
      <div className="px-16 py-12">
        <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>

        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 bg-gray-100 rounded-xl shadow">
            Verified Professionals
          </div>
          <div className="p-6 bg-gray-100 rounded-xl shadow">
            Compare Services
          </div>
          <div className="p-6 bg-gray-100 rounded-xl shadow">
            Quick & Reliable Service
          </div>


          
        </div>
      </div>

    </div>
  );
}

export default Landing;