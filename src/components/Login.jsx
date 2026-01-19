import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();  // <-- ADD THIS

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://medical-store-backend-sztf.onrender.com/api/auth/login", formData);



      console.log("User Data:", res.data);

      // Token & Email Store
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", res.data.user.email);

      // Redirect to Section Page
      navigate("/");   // <-- REDIRECT DONE

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <label>Username or Email</label>
        <input
          type="text"
          name="usernameOrEmail"
          value={formData.usernameOrEmail}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <Link to="/forgot-password" style={{ color: "#007bff", textDecoration: "none" }}>
            Forgot Password?
          </Link>
        </div>

        <p className="register-link">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
