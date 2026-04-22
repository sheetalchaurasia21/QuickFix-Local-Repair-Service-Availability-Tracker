import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>

        <h3 className="text-center mb-3">QuickFix Login</h3>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter Email"
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter Password"
        />

        <select className="form-select mb-3">
          <option>Customer</option>
          <option>Provider</option>
          <option>Admin</option>
        </select>

        <button
          className="btn btn-primary w-100"
          onClick={() => navigate("/customer")}
        >
          Login
        </button>

        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;