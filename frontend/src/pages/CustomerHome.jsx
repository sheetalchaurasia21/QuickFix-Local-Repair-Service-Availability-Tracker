function CustomerHome() {
  return (
    <div className="container mt-4">
      <h2>Customer Dashboard</h2>

      <input
        className="form-control mb-3"
        placeholder="Search service..."
      />

      <div className="card p-3">
        <h5>Available Providers</h5>
        <p>No providers yet</p>
      </div>
    </div>
  );
}

export default CustomerHome;