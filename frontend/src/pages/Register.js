import "../App.css"

function Register() {
    return (
        <div className="login-container">
            <h1>QuickFix</h1>
            <p>Find services instantly</p>
            <h2>Register

            </h2>
            <input type="text" placeholder="Enter Name" />
            <br />
            <input type="email" placeholder="Enter Email" />
            <br />
            <input type="password" placeholder="Enter Password" />
            <br />
            <input type="number" placeholder="Enter Phone Number" />
            <br />
            <select>
                <option>User</option>
                <option>Worker</option>
            </select>
            <select>
                <option>Select Service</option>
                <option>Electrician</option>
                <option>Plumber</option>
            </select>
            <br />
            <button>Register</button>

            </div>
    );
}

export default Register;