import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger px-4">
        <span className="navbar-brand fw-bold">QuickFix</span>

        <div className="ms-auto">
          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="btn btn-light"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mt-5">
        <div className="row align-items-center">

          {/* Left */}
          <div className="col-md-6">
            <h1 className="fw-bold">
              Find <span className="text-success">Trusted Services</span> Near You
            </h1>

            <p className="text-muted">
              Book electricians, plumbers and more instantly based on availability.
            </p>

            {/* Search Bar */}
            <div className="d-flex gap-2 mt-4">
              <input className="form-control" placeholder="Search service..." />
              <input className="form-control" placeholder="Location" />
              <button className="btn btn-success">Search</button>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-md-6 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
              alt="hero"
              width="300"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Landing;