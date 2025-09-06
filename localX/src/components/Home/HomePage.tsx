import React, { useState } from "react";
import logo from "../../assets/logo.png";
import ProfilePage from "./ProfilePage";
import CardSlideshow from "./CardSlideshow";
import "./HomeStyles.css";

const choices = {
  explore: [
    "Featured Works",
    "Visual Arts",
    "Music",
    "Dance & Performance",
    "Literary Arts",
    "Design & Multimedia"
  ],
  hire: [
    "Artist Directory",
    "Commission Board",
    "Buy Artworks"
  ],
  community: [
    "Forum",
    "Events",
    "Groups"
  ],
  how: [
    "Getting Started",
    "FAQ",
    "Contact Support"
  ]
};

const artistServices = [
  {
    title: "Custom Portraits",
    img: "https://placehold.co/80x80?text=Portrait",
    type: "image"
  },
  {
    title: "Digital Illustrations",
    img: "https://placehold.co/80x80?text=Illustration",
    type: "image"
  },
  {
    title: "Music Composition",
    media: (
      <audio controls style={{ width: 70 }}>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    ),
    type: "audio"
  },
  {
    title: "Performance Art",
    media: (
      <video width="80" height="80" controls>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ),
    type: "video"
  }
];

const HomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<keyof typeof choices>("explore");
  const [activeChoice, setActiveChoice] = useState<string>(choices["explore"][0]);
  const [showProfile, setShowProfile] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<keyof typeof choices | null>(null);

  const handleSectionClick = (section: keyof typeof choices) => {
    setActiveSection(section);
    setActiveChoice(choices[section][0]);
    setShowProfile(false);
    setHoveredSection(null);
  };

  const renderChoicePage = () => {
    if (activeSection === "explore" && activeChoice === "Featured Works") {
      return (
        <div>
          <div className="home-big-card">
            <div style={{ marginBottom: "1rem" }}>
              Discover and Support Mindanao’s Creative Talent
            </div>
            <CardSlideshow />
          </div>
          <h2 className="home-section-title">Featured Works of the Artists</h2>
          <div className="home-media-grid">
            <div className="home-media-card">
              <img src="https://placehold.co/180x180?text=Art+1" alt="Art 1" className="home-media-img" />
              <div className="home-media-title">Artwork Title 1</div>
            </div>
            <div className="home-media-card">
              <img src="https://placehold.co/180x180?text=Art+2" alt="Art 2" className="home-media-img" />
              <div className="home-media-title">Artwork Title 2</div>
            </div>
            <div className="home-media-card">
              <img src="https://placehold.co/180x180?text=Art+3" alt="Art 3" className="home-media-img" />
              <div className="home-media-title">Artwork Title 3</div>
            </div>
          </div>
          <h3 className="home-sub-title">Services the Artist Can Offer</h3>
          <div className="home-services-grid">
            {artistServices.map((service, idx) => (
              <div key={idx} className="home-service-card">
                {service.type === "image" && (
                  <img src={service.img} alt={service.title} className="home-service-img" />
                )}
                {service.type === "audio" && service.media}
                {service.type === "video" && service.media}
                <div className="home-service-title">{service.title}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="home-big-card">
          <div style={{ marginBottom: "1rem" }}>
            Discover and Support Mindanao’s Creative Talent
          </div>
          <CardSlideshow />
        </div>
        <h2 className="home-section-title">{activeChoice}</h2>
        <p className="home-main-text">Content for {activeChoice} will appear here.</p>
      </div>
    );
  };

  const artistPhoto = "https://i.pravatar.cc/80?img=3";

  return (
    <div className="home-root">
      {/* Header */}
      <div className="home-header">
        {/* Left: Navigation Toggles */}
        <div className="home-header-left">
          {Object.keys(choices).map(section => (
            <div
              key={section}
              style={{ position: "relative", display: "inline-block" }}
              onMouseEnter={() => setHoveredSection(section as keyof typeof choices)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <button
                className={`home-nav-btn${activeSection === section ? " active" : ""}`}
                onClick={() => handleSectionClick(section as keyof typeof choices)}
              >
                {section === "explore" && "Explore Art"}
                {section === "hire" && "Hire Artist"}
                {section === "community" && "Community"}
                {section === "how" && "How it Works"}
              </button>
              {hoveredSection === section && (
                <div className="home-choice-dropdown">
                  {choices[section as keyof typeof choices].map(choice => (
                    <button
                      key={choice}
                      className={`home-choice-btn${choice === activeChoice ? " active" : ""}`}
                      onClick={() => {
                        setActiveSection(section as keyof typeof choices);
                        setActiveChoice(choice);
                        setShowProfile(false);
                        setHoveredSection(null);
                      }}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Center: Logo */}
        <div className="home-header-center">
          <img src={logo} alt="LokalX Logo" style={{ width: 40, height: 40 }} />
        </div>
        {/* Right: Profile Avatar */}
        <div className="home-header-right">
          <img
            src={artistPhoto}
            alt="Profile"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #2e8b57",
              cursor: "pointer"
            }}
            onClick={() => setShowProfile(true)}
            title="View Profile"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="home-main">
        {showProfile ? (
          <ProfilePage />
        ) : (
          <>
            {renderChoicePage()}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
