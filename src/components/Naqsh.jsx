import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { naqshList } from "../data/naqshData";
import { useCart } from "../context/CartContext";

const Naqsh = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (item) => {
    addToCart(item);
    navigate("/cart");
  };

  return (
    <section className="py-16 px-4 bg-stone-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-amber-800 mb-12 font-serif">
          Naqsh & Tawiz Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {naqshList.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
              <Link to={`/naqsh/${item.id}`} className="h-64 overflow-hidden relative group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>

              <div className="p-6 flex flex-col flex-grow">
                <Link to={`/naqsh/${item.id}`}>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-amber-700 transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                  {item.description}
                </p>
                <div className="text-lg font-bold text-amber-900 mb-4">
                  Rs. {item.price}
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-amber-100 text-amber-800 py-2 rounded-lg font-semibold hover:bg-amber-200 transition-colors border border-amber-200"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleBuyNow(item)}
                    className="flex-1 bg-amber-700 text-white py-2 rounded-lg font-semibold hover:bg-amber-800 transition-colors shadow-md"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Naqsh;
