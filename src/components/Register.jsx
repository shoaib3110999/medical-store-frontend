import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    otp: ""
  });

  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.endsWith("@gmail.com")) {
      setError("Only @gmail.com emails are allowed");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/send-registration-otp", {
        email: formData.email,
        password: formData.password
      });
      setStep(2);
      setSuccess("OTP sent to your email!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setSuccess("Registration Successful! Redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

        {step === 1 ? (
          <form onSubmit={handleSendOTP}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
            />

            <label>Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ textAlign: "center", marginBottom: "15px" }}>
              OTP sent to <b>{formData.email}</b>
            </p>
            <label>Enter 6-Digit OTP</label>
            <input
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="XXXXXX"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Create Account"}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{ backgroundColor: "#6c757d", marginTop: "10px" }}
            >
              Back
            </button>
          </form>
        )}

        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
