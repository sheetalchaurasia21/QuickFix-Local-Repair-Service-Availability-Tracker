import "../App.css"

function Login() {
    return (
        <div className="login-container">
            <h1>QuickFix</h1>
            <p>Find services instantly</p>
            <h2>Login
            </h2>
            <input type="email" placeholder="Enter Email" />
            <br />
            <input type="password" placeholder="Enter Password" />
            <br />
            <select>
                <option>User</option>
                <option>Worker</option>
            </select>
            <br />
            <button>Login</button>

            </div>
    );
}

export default Login;