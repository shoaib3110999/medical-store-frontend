import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, calculateTotal } = useCart();
    const navigate = useNavigate();

    // Local state for form
    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        pincode: "",
        flat: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        paymentMethod: "cod" // Default to Cash on Delivery
    });

    // Local state for UPI payment
    const [upiId, setUpiId] = useState("");
    const [upiVerified, setUpiVerified] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'paymentMethod' && e.target.value !== 'online') {
            setUpiVerified(false);
            setPaymentSuccess(false);
        }
    };

    const handleVerifyUpi = () => {
        if (!upiId.includes('@')) {
            alert("Please enter a valid UPI ID (e.g. user@bank)");
            return;
        }
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setUpiVerified(true);
            alert("UPI ID Verified Successfully!");
        }, 1500);
    };

    const handleUpiPayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);
            alert("Payment Received Successfully! You can now place your order.");
        }, 2500);
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        const { fullName, mobile, pincode, flat, area, city, state, paymentMethod } = formData;

        if (!fullName || !mobile || !pincode || !flat || !area || !city || !state) {
            alert("Please fill in all the details before placing the order.");
            return;
        }

        if (paymentMethod === 'online' && !paymentSuccess) {
            alert("Please complete the UPI payment before placing the order.");
            return;
        }

        alert("Order Placed Successfully!");
        navigate("/");
    };

    const totalAmount = calculateTotal();

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <h2>Checkout</h2>
            </div>

            <div className="checkout-content">

                {/* Left Column: Address & Payment */}
                <div className="checkout-left">

                    {/* Delivery Address Section */}
                    <div className="section-box">
                        <h3>1. Delivery Address</h3>
                        <form className="address-form">
                            <div className="form-field">
                                <label>Full Name</label>
                                <input type="text" name="fullName" onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label>Mobile Number</label>
                                <input type="text" name="mobile" onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label>Pincode</label>
                                <input type="text" name="pincode" onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label>Flat, House no., Building, Company, Apartment</label>
                                <input type="text" name="flat" onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label>Area, Street, Sector, Village</label>
                                <input type="text" name="area" onChange={handleChange} />
                            </div>
                            <div className="row-fields">
                                <div className="form-field">
                                    <label>Town/City</label>
                                    <input type="text" name="city" onChange={handleChange} />
                                </div>
                                <div className="form-field">
                                    <label>State</label>
                                    <input type="text" name="state" onChange={handleChange} />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Payment Method Section */}
                    <div className="section-box">
                        <h3>2. Payment Method</h3>

                        <div className="payment-options">
                            <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'active' : ''}`}>
                                <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} />
                                <span style={{ fontWeight: "700" }}>Cash on Delivery / Pay on Delivery</span>
                            </label>
                            <label className={`payment-option ${formData.paymentMethod === 'online' ? 'active' : ''}`}>
                                <input type="radio" name="paymentMethod" value="online" checked={formData.paymentMethod === 'online'} onChange={handleChange} />
                                <span style={{ fontWeight: "700" }}>UPI / Net Banking / Credit Card</span>
                            </label>
                        </div>

                        {/* UPI Details Section */}
                        {formData.paymentMethod === 'online' && (
                            <div className="upi-section">
                                <h4 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "15px", color: "#333" }}>Enter UPI Details</h4>
                                <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
                                    <input
                                        type="text"
                                        placeholder="Mobile/UPI ID (e.g. 9876543210@upi)"
                                        value={upiId}
                                        onChange={(e) => {
                                            setUpiId(e.target.value);
                                            setUpiVerified(false);
                                            setPaymentSuccess(false);
                                        }}
                                        style={{ flex: 1, minWidth: "200px", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
                                    />
                                    <button
                                        onClick={handleVerifyUpi}
                                        disabled={!upiId || upiVerified || isProcessing}
                                        style={{
                                            flex: "0 0 100px",
                                            padding: "10px",
                                            backgroundColor: upiVerified ? "#28a745" : "#1b6ca8",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: (isProcessing || upiVerified) ? "default" : "pointer",
                                            fontWeight: "bold",
                                            fontSize: "14px"
                                        }}
                                    >
                                        {(isProcessing && !upiVerified) ? "..." : upiVerified ? "Verified ✓" : "Verify"}
                                    </button>
                                </div>

                                {upiVerified && (
                                    <div style={{ textAlign: "center", borderTop: "1px solid #eee", paddingTop: "15px" }}>
                                        <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>Verification successful. Please click below to proceed with the payment.</p>
                                        <button
                                            onClick={handleUpiPayment}
                                            disabled={isProcessing || paymentSuccess}
                                            style={{
                                                width: "100%",
                                                padding: "12px",
                                                backgroundColor: paymentSuccess ? "#28a745" : "#ffd814",
                                                border: "1px solid #fcd200",
                                                borderRadius: "4px",
                                                fontWeight: "bold",
                                                cursor: (isProcessing || paymentSuccess) ? "default" : "pointer",
                                                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                                color: paymentSuccess ? "white" : "#111"
                                            }}
                                        >
                                            {isProcessing ? "Processing Payment..." : paymentSuccess ? "Payment Successful ✓" : `Pay ₹${totalAmount} via Secure UPI`}
                                        </button>
                                        {paymentSuccess && (
                                            <p style={{ color: "#28a745", fontWeight: "700", marginTop: "10px", fontSize: "13px" }}>
                                                Transaction ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>

                {/* Right Column: Order Summary */}
                <div className="checkout-right">
                    <div className="order-summary">

                        <button onClick={handlePlaceOrder} style={{ width: "100%", padding: "12px", backgroundColor: "#ffd814", border: "1px solid #fcd200", borderRadius: "20px", cursor: "pointer", fontSize: "14px", marginBottom: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", fontWeight: "bold" }}>
                            Place your order
                        </button>

                        <div style={{ fontSize: "12px", textAlign: "center", color: "#565959", marginBottom: "20px" }}>
                            By placing your order, you agree to our privacy notice and conditions of use.
                        </div>

                        <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "15px" }}>Order Summary</h3>

                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontSize: "14px" }}>
                            <span>Items:</span>
                            <span>₹{totalAmount}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontSize: "14px" }}>
                            <span>Delivery:</span>
                            <span>₹0.00</span>
                        </div>
                        <hr style={{ margin: "10px 0", border: "0", borderTop: "1px solid #ddd" }} />
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", color: "#b12704", fontSize: "18px", fontWeight: "700" }}>
                            <span>Order Total:</span>
                            <span>₹{totalAmount}</span>
                        </div>

                        <div className="summary-items" style={{ marginTop: "20px" }}>
                            <h4 style={{ fontSize: "14px", marginBottom: "10px" }}>Items in your cart:</h4>
                            {cartItems.map((item, i) => (
                                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                    <img src={item.img || item.image} alt={item.title} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                                    <div style={{ fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                                        <strong>{item.title}</strong><br />
                                        Qty: {item.quantity}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
