import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { books } from "../data/booksData";
import { useCart } from "../context/CartContext";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const book = books.find((b) => b.id === parseInt(id));

  // Scroll to top when book changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Book Not Found</h2>
        <Link to="/books" className="text-amber-700 hover:underline">← Back to Collection</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book);
  };

  const handleBuyNow = () => {
    const productLink = window.location.href;
    const message = `Hello, I want to buy this book: *${book.title}*\n\nBook Link: ${productLink}`;
    const whatsappUrl = `https://wa.me/918153906236?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const otherBooks = books.filter((b) => b.id !== book.id);

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      {/* Breadcrumb / Back Link */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link to="/books" className="inline-flex items-center text-amber-700 hover:text-amber-900 font-medium transition-colors">
          <span className="mr-2">←</span> Back to All Books
        </Link>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/2 lg:w-2/5 bg-slate-50 max-h-[600px] flex items-center justify-center p-8 md:p-12">
            <div className="relative shadow-2xl rounded-lg overflow-hidden transform transition-transform hover:scale-105 duration-500 bg-white">
              <img
                src={book.image}
                alt={book.title}
                className="max-h-[500px] w-auto object-contain"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif leading-tight">
              {book.title}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-amber-700">₹{book.price}</span>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Premium Edition</span>
            </div>

            <div className="w-20 h-1 bg-amber-500 mb-8"></div>

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {book.description}
            </p>

            {book.info && (
              <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-400 mb-8">
                <p className="text-gray-800 italic">{book.info}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white border-2 border-amber-700 text-amber-700 font-bold py-4 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1 hover:bg-amber-50 text-center"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1 text-center"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Books */}
      {otherBooks.length > 0 && (
        <div className="max-w-6xl mx-auto mt-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">Other Books You Might Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {otherBooks.map((other) => (
              <Link
                key={other.id}
                to={`/books/${other.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group"
              >
                <div className="h-48 overflow-hidden">
                  <img src={other.image} alt={other.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="font-bold text-gray-900 mb-1 group-hover:text-amber-700 line-clamp-1">{other.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2">{other.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
