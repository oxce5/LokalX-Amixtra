import { Link } from "react-router-dom";
import './Navbar.css';


export default function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm" id="navbar">
      <div className="container">

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">

          {/* Left Links */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            {/* Explore Art Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="exploreDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Explore Art
              </a>
              <ul className="dropdown-menu" aria-labelledby="exploreDropdown">
                <li><Link className="dropdown-item" to="/featured-works">Featured Works</Link></li>
                <li><Link className="dropdown-item" to="/visual-arts">Visual Arts</Link></li>
                <li><Link className="dropdown-item" to="/music">Music</Link></li>
                <li><Link className="dropdown-item" to="/dance-performance">Dance & Performance</Link></li>
                <li><Link className="dropdown-item" to="/literary-arts">Literary Arts</Link></li>
                <li><Link className="dropdown-item" to="/design-multimedia">Design & Multimedia</Link></li>
              </ul>
            </li>

            {/* Hire Artists Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="hireDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hire Artists
              </a>
              <ul className="dropdown-menu" aria-labelledby="hireDropdown">
                <li><Link className="dropdown-item" to="/artist-directory">Artist Directory</Link></li>
                <li><Link className="dropdown-item" to="/commission-board">Commission Board</Link></li>
                <li><Link className="dropdown-item" to="/buy-artworks">Buy Artworks</Link></li>
              </ul>
            </li>

            {/* How It Works */}
            <li className="nav-item">
              <Link className="nav-link" to="/how-it-works">How It Works</Link>
            </li>
          </ul>

          {/* Center Logo */}
          <Link className="navbar-brand position-absolute start-50 translate-middle-x fw-bold" to="/">
            <img
              src="src/assets/logo v1.png"
              alt="LokalX"
              style={{ height: "40px" }}
            />
          </Link>

          {/* Right Auth Buttons */}
          <div className="d-flex gap-2 ms-auto">
            <Link className="btn btn-outline-dark" to="/signup">Sign up</Link>
            <Link className="btn btn-dark" to="/login">Log in</Link>
          </div>

        </div>
      </div>
    </nav>

    <div className="navbar-accent"></div>
    </>
    
  );
}
