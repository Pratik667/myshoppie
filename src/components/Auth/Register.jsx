import './Login.css';
import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import axios from "axios";  // Import Axios

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState("");  // Error state
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  // If token exists, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error state
    setError("");
    setLoading(true);  // Start loading

    try {
      // Make the login request using Axios
      const response = await axios.post(
        "https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/users/register",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Check if the response contains a token
      if (response.status === 201) {
        alert(JSON.stringify(response.data));
        // Redirect to the dashboard
        navigate("/login");
      }
    } catch (err) {
      setError("Username or Password is incorrect.");
    } finally {
      setLoading(false);  // Stop loading
    }
  };
  return (
    <section className="register-page">
      <div className="login-container">
        <h2 className="login-heading">Register</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="goto-link m-2 ml-0">Already an User? <Link to="/login">Login</Link></div>
        </form>
        {/* Display error message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>

    </section>
  );
};

export default Register;
