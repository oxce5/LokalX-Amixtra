import React, { useState, useEffect } from "react";
import "./HomeStyles.css";

const images = [
  "https://placehold.co/400x220?text=Art+1",
  "https://placehold.co/400x220?text=Art+2",
  "https://placehold.co/400x220?text=Art+3"
];

const CardSlideshow: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card-slideshow-root">
      <img
        src={images[index]}
        alt={`Artwork ${index + 1}`}
        className="card-slideshow-img"
      />
    </div>
  );
};

export default CardSlideshow;
