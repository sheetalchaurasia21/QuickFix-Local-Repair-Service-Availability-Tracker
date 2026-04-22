function Signup() {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        {/* LEFT - Customer */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-light">

          <h2 className="text-success mb-2">Customer Sign Up</h2>
          <p className="text-muted">Create your account to get started</p>

          <div className="w-50 mt-3">
            <input className="form-control mb-3" placeholder="Full Name" />
            <input className="form-control mb-3" placeholder="Email Address" />
            <input type="password" className="form-control mb-3" placeholder="Password" />
            <input type="password" className="form-control mb-3" placeholder="Confirm Password" />

            <button className="btn btn-success w-100">
              Next Step →
            </button>

            <p className="text-center mt-3">
              Already have an account? <span className="text-success">Login</span>
            </p>
          </div>
        </div>

        {/* RIGHT - Provider */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-white">

          <h2 className="text-warning mb-2">Provider Sign Up</h2>
          <p className="text-muted">Create your account to get started</p>

          <div className="w-50 mt-3">
            <input className="form-control mb-3" placeholder="Business Name" />

            <select className="form-select mb-3">
              <option>Business Type</option>
              <option>Electrician</option>
              <option>Plumber</option>
            </select>

            <select className="form-select mb-3">
              <option>Years of Experience</option>
              <option>1-3</option>
              <option>3-5</option>
              <option>5+</option>
            </select>

            <input className="form-control mb-3" placeholder="Registration Number" />

            <select className="form-select mb-3">
              <option>Services Offered</option>
              <option>Repair</option>
              <option>Installation</option>
            </select>

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">
                I confirm all information is accurate
              </label>
            </div>

            <button className="btn btn-warning w-100">
              Next Step →
            </button>

            <p className="text-center mt-3">
              Already have an account? <span className="text-warning">Login</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;