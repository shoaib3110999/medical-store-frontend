// src/components/Slider.jsx
import React, { useState } from "react";
import { slides } from "../data/slides";
import "./Slider.css";

export default function Slider() {
  const [current, setCurrent] = useState(0);

  // Auto play
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     }, 5000); // 3 seconds interval
//     return () => clearInterval(interval);
//   }, []);

  return (
    <div className="slider-container">
      {/* Previous Button */}
      <button
        className="prev"
        onClick={() =>
          setCurrent(current === 0 ? slides.length - 1 : current - 1)
        }
      >
        {"<"}
      </button>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          className={index === current ? "slide active" : "slide"}
          key={index}
        >
          {index === current && (
            <div className="content">
              <img src={slide.image} alt={slide.title} />
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          )}
        </div>
      ))}

      {/* Next Button */}
      <button
        className="next"
        onClick={() =>
          setCurrent(current === slides.length - 1 ? 0 : current + 1)
        }
      >
        {">"}
      </button>

      {/* Dots */}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={current === index ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
