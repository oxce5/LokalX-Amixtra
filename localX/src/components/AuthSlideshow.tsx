import React from "react";

import SL1 from "../assets/SL1.png";  
import SL2 from "../assets/SL2.png";
import SL3 from "../assets/SL3.png";

const AuthSlideshow: React.FC = () => {
  return (
    <div
      id="authCarousel"
      className="carousel slide auth-slideshow"
      data-bs-ride="carousel"
      data-bs-interval="7000"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={SL1} className="d-block w-100" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src={SL2} className="d-block w-100" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src={SL3} className="d-block w-100" alt="Slide 3" />
        </div>
      </div>

      {/* Courtesy text */}
      <div className="auth-credit">
        © Artwork courtesy of LocalX Artists
      </div>

      {/* Optional navigation */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#authCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#authCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default AuthSlideshow;
