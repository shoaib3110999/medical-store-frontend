import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { books } from "../data/booksData";
import { useCart } from "../context/CartContext";

const Books = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e, book) => {
    e.preventDefault();
    addToCart(book);
  };

  const handleBuyNow = (e, book) => {
    e.preventDefault();
    const productLink = window.location.origin + `/books/${book.id}`;
    const message = `Hello, I want to buy this book: *${book.title}*\n\nBook Link: ${productLink}`;
    const whatsappUrl = `https://wa.me/918153906236?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-16 px-4 bg-amber-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-amber-800 mb-12 font-serif">
          Our Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {books.map((book) => (
            <Link
              to={`/books/${book.id}`}
              key={book.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 flex flex-col"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold border-2 border-white px-4 py-2 rounded-full">View Details</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-700 transition-colors">
                  {book.title}
                </h3>
                <p className="text-gray-600 line-clamp-2 text-sm mb-4">
                  {book.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-amber-700">₹{book.price}</span>
                  <span className="text-amber-600 font-medium text-sm">
                    Read More &rarr;
                  </span>
                </div>
                <div className="mt-auto flex gap-3">
                  <button
                    onClick={(e) => handleAddToCart(e, book)}
                    className="flex-1 bg-white border-2 border-amber-700 text-amber-700 font-bold py-2 rounded-lg hover:bg-amber-50 transition-colors text-sm"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => handleBuyNow(e, book)}
                    className="flex-1 bg-amber-700 text-white font-bold py-2 rounded-lg hover:bg-amber-800 transition-colors shadow-md text-sm"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Books;
