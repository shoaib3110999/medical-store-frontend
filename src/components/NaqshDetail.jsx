import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { naqshList } from "../data/naqshData";
import { useCart } from "../context/CartContext";

const NaqshDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const item = naqshList.find((n) => n.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Item Not Found</h2>
        <Link to="/naqsh" className="text-amber-700 hover:underline">← Back to Collection</Link>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(item);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-6xl mx-auto mb-8">
        <Link to="/naqsh" className="inline-flex items-center text-amber-700 hover:text-amber-900 font-medium transition-colors">
          <span className="mr-2">←</span> Back to Collection
        </Link>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gray-100 p-8 flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[500px] w-auto object-contain shadow-lg rounded-lg"
            />
          </div>
          <div className="md:w-1/2 p-12 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">{item.title}</h1>
            <p className="text-2xl text-amber-800 font-bold mb-6">Rs. {item.price}</p>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">{item.description}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addToCart(item)}
                className="bg-amber-100 text-amber-900 py-3 px-8 rounded-full font-bold hover:bg-amber-200 transition-colors border border-amber-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-amber-700 text-white py-3 px-8 rounded-full font-bold hover:bg-amber-800 transition-colors shadow-lg"
              >
                Buy Now
              </button>
            </div>

            <p className="mt-8 text-sm text-gray-500 italic border-t pt-4">
              Note: To obtain special permission (Ijazat-e-khas) for this Naqsh, please contact us directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaqshDetail;
