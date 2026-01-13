import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.quantity * (item.price || 100)), 0);
  };

  return (
    <div className="container cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="cart-empty-state">
          <p style={{ fontSize: "1.2rem", color: "#666" }}>Your cart is empty.</p>
          <Link to="/medicines" className="book-btn" style={{ marginTop: "20px", display: "inline-block" }}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="cart-items-list">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item-row">
                <div className="cart-item-info">
                  <img
                    src={item.img || item.image || "https://via.placeholder.com/80"}
                    alt={item.title}
                    className="cart-item-image"
                  />
                  <div>
                    <h3 className="cart-item-name">{item.title}</h3>
                    <p className="sub-text">{item.category}</p>
                    <p style={{ color: "#b45309", fontWeight: "bold" }}>₹{item.price || 100}</p>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.title, item.quantity - 1)}
                    >-</button>
                    <span className="quantity-value">
                      {item.quantity}
                    </span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.title, item.quantity + 1)}
                    >+</button>
                  </div>

                  <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                    <button
                      onClick={() => {
                        const message = `Hello, I want to buy this medicine: *${item.title}*\n\nQuantity: ${item.quantity}\nPrice: ₹${item.price || 100}`;
                        const whatsappUrl = `https://wa.me/918153906236?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, "_blank");
                      }}
                      className="book-btn"
                      style={{ fontSize: "0.9rem", padding: "8px 16px" }}
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => removeFromCart(item.title)}
                      style={{ color: "red", background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem" }}
                      title="Remove Item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-section">
            <div className="cart-total">
              Total: ₹{calculateTotal()}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
              <button onClick={clearCart} className="book-btn">
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart;