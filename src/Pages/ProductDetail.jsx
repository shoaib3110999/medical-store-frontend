import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

import img from "../assets/img.jpeg";
import abdul from "../assets/abdul.jpeg";
import jode from "../assets/jode.jpeg";
import athra from "../assets/athra.jpeg";
import bakhoor from "../assets/bakhoor.jpeg";
import banjh from "../assets/banjh.jpeg";
import chambal from "../assets/chambal.jpeg";
import gurda from "../assets/gurda.jpeg";
import pain from "../assets/pain.jpeg";
import hayat from "../assets/hayat.jpeg";
import rasoli from "../assets/rasoli.jpeg";
import sugar from "../assets/sugar.jpeg";
import Hoil from "../assets/Hoil.jpeg";
import meda from "../assets/meda.jpeg";
import taviz from "../assets/taviz.jpeg";
import bavasir from "../assets/bavasir.jpeg";
import itter from "../assets/itter.jpeg";
import kil from "../assets/kil.jpeg";
import motapa from "../assets/motapa.jpeg";
import mustari from "../assets/mustari.jpeg";
import papataikas from "../assets/papataikas.jpeg";
import powder from "../assets/powder.jpeg";
import shifa from "../assets/shifa.jpeg";

const products = [
  { img: powder, title: "Powder" },
  { img: shifa, title: "Shifa" },
  { img: kil, title: "Kil" },
  { img: motapa, title: "Motapa" },
  { img: mustari, title: "Mustari" },
  { img: papataikas, title: "Papataikas" },
  { img: bavasir, title: "Bavasir" },
  { img: itter, title: "Itter" },
  { img: Hoil, title: "Hoil" },
  { img: meda, title: "Meda" },
  { img: taviz, title: "Taviz" },
  { img: abdul, title: "Abdul" },
  { img: jode, title: "Jode" },
  { img: athra, title: "Athra" },
  { img: bakhoor, title: "Bakhoor" },
  { img: banjh, title: "Banjh" },
  { img: chambal, title: "Chambal" },
  { img: gurda, title: "Gurda" },
  { img: pain, title: "Pain" },
  { img: sugar, title: "Sugar" },
  { img: rasoli, title: "Rasoli" },
  { img: hayat, title: "Hayat" },
  { img: img, title: "General" }
];

const ProductDetail = () => {
  const { title } = useParams();
  const { addToCart } = useCart();

  const product = products.find(
    (p) => p.title.toLowerCase() === decodeURIComponent(title).toLowerCase()
  );

  if (!product) return <p>Product not found!</p>;

  return (
    <div className="product-detail-page">
      <div className="detail-container">
        <div className="product-main-section">
          <div className="image-container">
            <img
              src={product.img}
              alt={product.title}
              className="detail-image"
            />
          </div>

          <div className="product-info-section">
            <h1 className="detail-title">{product.title}</h1>
            <div className="rating-badge">
              <span>⭐⭐⭐⭐⭐</span>
              <span className="rating-text">(4.9/5 based on 100+ reviews)</span>
            </div>

            <p className="detail-price">Contact for Price</p>

            <p className="detail-desc">
              Experience the healing power of genuine Unani medicine. Our {product.title}
              is crafted with premium ingredients to ensure the best results for your health.
              Reliable, natural, and trusted by thousands.
            </p>

            <div className="action-buttons">
              <button
                className="btn-add-cart"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="btn-buy-now"
                onClick={() => {
                  const productLink = window.location.href;
                  const message = `Hello, I want to buy this medicine: *${product.title}*\n\nProduct Link: ${productLink}`;
                  const whatsappUrl = `https://wa.me/918153906236?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, "_blank");
                }}
              >
                Buy Now
              </button>
            </div>

            <div className="delivery-info">
              <p>🚚 Free Delivery on orders above ₹999</p>
              <p>🛡️ 100% Authentic Products</p>
            </div>
          </div>
        </div>

        <div className="related-products-section">
          <h2 className="section-heading">You might also like</h2>
          <div className="related-grid">
            {products
              .filter((p) => p.title !== product.title)
              .slice(0, 4) // Show only 4 related products
              .map((p, i) => (
                <Link
                  to={`/product/${encodeURIComponent(p.title)}`}
                  key={i}
                  className="related-item-link"
                >
                  <div className="related-card">
                    <img src={p.img} alt={p.title} className="related-img" />
                    <p className="related-title">{p.title}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
