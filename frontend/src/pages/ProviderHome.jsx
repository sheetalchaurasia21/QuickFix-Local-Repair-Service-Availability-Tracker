function ProviderHome() {
  return (
    <div className="container mt-4">
      <h2>Provider Dashboard</h2>

      <button className="btn btn-success mb-3">
        Go Online
      </button>

      <div className="card p-3">
        <h5>Incoming Requests</h5>
        <p>No requests yet</p>
      </div>
    </div>
  );
}

export default ProviderHome;