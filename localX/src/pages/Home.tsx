import Hero from "../components/Hero";
import WorkCard from "../components/WorkCard";
import FeatureCard from "../components/FeatureCard";
import StepCard from "../components/StepCard";
import { useState } from "react";


export default function Home() {
  const [selectedRole, setSelectedRole] = useState<"patron" | "artist">("patron");

  const featuredWorks = [
    { title: "Sunset Over Mt. Apo", artist: "Juan D.", imageUrl: "" },
    { title: "Harvest Dance", artist: "Maria L.", imageUrl: "" },
    { title: "Lumad Dreams", artist: "Carlos P.", imageUrl: "" },
  ];

  const patronSteps = [
    {
      title: "Browse & Discover",
      description:
        "Pick a category — visual arts, music, dance & performance, literary arts, and design & multimedia.",
    },
    {
      title: "Post a Request",
      description:
        "Can’t find exactly what you’re looking for? Post a request describing what you need, and artists can respond.",
    },
    {
      title: "Hire or Purchase",
      description:
        "Once you’ve found the right artist or artwork, agree on the details and complete the transaction directly with them.",
    },
    {
      title: "Enjoy & Support Lokal Art!",
      description:
        "Enjoy your new artwork or experience, knowing you’re helping Mindanao’s creative community grow.",
    },
  ];

  const artistSteps = [
    {
      title: "Create Your Profile",
      description:
        "Sign up, add your bio, location, and showcase images of your best work.",
    },
    {
      title: "Upload Your Works",
      description:
        "Categorize and display your artworks so patrons can easily browse and discover what you offer.",
    },
    {
      title: "Respond to Requests",
      description:
        "Check for new project requests posted by patrons, and reach out if you can create what they need.",
    },
    {
      title: "Get Hired or Sell Your Work",
      description:
        "Agree on details directly with patrons, complete the work or arrange delivery, and build your reputation.",
    },
  ];

  return (
    <>
      <Hero />

      {/* Featured Works */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4 fw-bold">Featured Works</h2>
          <div className="row g-4">
            {featuredWorks.map((work, idx) => (
              <div className="col-md-4" key={idx}>
                <WorkCard {...work} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* See What Our Artists Offer */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">See What Our Artists Offer</h2>
          <p className="text-muted mb-4">
            Commission custom work, book talent for events, or collect ready-made
            pieces — all in one place.
          </p>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <FeatureCard
                title="COMMISSION"
                description="Post a request or contact an artist to create something just for you."
              />
            </div>
            <div className="col-md-4">
              <FeatureCard
                title="SHOP"
                description="Browse finished pieces, crafts, and merch available for immediate purchase."
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">How It Works</h2>
          <div className="mb-4">
            <button
              className="btn me-2"
              style={{
                backgroundColor: selectedRole === "artist" ? "#B6B6B6" : "transparent",
                border: "1px solid #B6B6B6",
                color: selectedRole === "artist" ? "#000" : "#000",
              }}
              onClick={() => setSelectedRole("artist")}
            >
              I’m an Artist
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: selectedRole === "patron" ? "#B6B6B6" : "transparent",
                border: "1px solid #B6B6B6",
                color: selectedRole === "patron" ? "#000" : "#000",
              }}
              onClick={() => setSelectedRole("patron")}
            >
              I’m a Patron
            </button>
          </div>

        </div>

        <div className="container">
          {selectedRole === "patron" && (
            <>
              <h3 className="fw-bold mb-3">For Patrons</h3>
              <div className="row g-4 mb-5">
                {patronSteps.map((s, idx) => (
                  <div className="col-md-3" key={idx}>
                    <StepCard
                      number={idx + 1}
                      title={s.title}
                      description={s.description}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {selectedRole === "artist" && (
            <>
              <h3 className="fw-bold mb-3">For Artists</h3>
              <div className="row g-4">
                {artistSteps.map((s, idx) => (
                  <div className="col-md-3" key={idx}>
                    <StepCard
                      number={idx + 1}
                      title={s.title}
                      description={s.description}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
