import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-light text-center py-5">
      <div className="container">
        <h1 className="display-4 fw-bold mb-3">
          Discover and Support Mindanao’s Creative Talent
        </h1>
        <p className="lead text-muted mb-4">
          A platform connecting Mindanaoan artists with people looking to explore,
          hire, or collect their work.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/gallery/featured-works" className="btn btn-dark btn-lg">
            Browse Works
          </Link>
          <Link to="/signup" className="btn btn-outline-dark btn-lg">
            Join as Artist
          </Link>
        </div>
      </div>
    </section>
  );
}
