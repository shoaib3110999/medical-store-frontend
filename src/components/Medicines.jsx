import React from "react";
import { Link, useLocation } from "react-router-dom";
import { products } from "../data/medicinesData";
import { useCart } from "../context/CartContext";

const Medicines = () => {
  const { addToCart } = useCart();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const filteredProducts = searchQuery
    ? products.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : products;

  const handleAddToCart = (product) => {
    addToCart(product);
  };
  const handleBuyNow = (product) => {
    const productLink = window.location.origin + `/product/${encodeURIComponent(product.title)}`;
    const message = `Hello, I want to buy this medicine: *${product.title}*\n\nProduct Link: ${productLink}`;
    const whatsappUrl = `https://wa.me/918153906236?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mt-10">Medicines</h1>
      <div className="main-product">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <Link
              to={`/product/${encodeURIComponent(product.title)}`}
              key={index}
            >
              <div className="product-card">
                <img
                  src={product.img}
                  alt={product.title}
                  className="product-image"
                />
                <h2 className="product-title">{product.title}</h2>
                <p className="product-description">
                  Experience premium quality medicine and care.
                </p>
                <div className="product-buttons">
                  <button
                    className="add-to-cart"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="buy-now"
                    onClick={(e) => {
                      e.preventDefault();
                      handleBuyNow(product);
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No medicines found for "{searchQuery}"</p>
        )}
      </div>
    </div>
  );
};

export default Medicines;
