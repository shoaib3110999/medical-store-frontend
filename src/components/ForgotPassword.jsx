import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await axios.post("https://medical-store-backend-sztf.onrender.com/api/auth/forgot-password", { email });
            setMessage(res.data.message);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post("https://medical-store-backend-sztf.onrender.com/api/auth/reset-password", {
                email,
                otp,
                newPassword
            });

            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Reset failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Forgot Password</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {message && <p style={{ color: "green" }}>{message}</p>}

                {step === 1 ? (
                    <form onSubmit={handleSendOTP}>
                        <label>Enter your registered Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="example@gmail.com"
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword}>
                        <label>OTP sent to {email}</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            placeholder="Enter 6-digit OTP"
                        />
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            placeholder="Enter new password"
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? "Resetting..." : "Reset Password"}
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
                <div style={{ marginTop: "15px", textAlign: "center" }}>
                    <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
