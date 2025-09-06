import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { works } from "../data/works";
import FilterBar from "../components/FilterBar/FilterBar";
import WorkCard from "../components/WorkCard/WorkCard";

const categories = [
  "Featured Works",
  "Visual Arts",
  "Music",
  "Dance & Performance",
  "Literary Arts",
  "Design & Multimedia",
];

// Convert categories to URL-safe slugs
const categoryToSlug = (name: string) =>
  name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");

const slugToCategory = (slug: string) => {
  return (
    categories.find((cat) => categoryToSlug(cat) === slug) || "Featured Works"
  );
};

const GalleryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const currentCategory = slugToCategory(category || "featured-works");

  const filteredWorks =
    currentCategory === "Featured Works"
      ? works
      : works.filter((w) => w.category === currentCategory);

  const handleCategorySelect = (cat: string) => {
    const slug = categoryToSlug(cat);
    navigate(`/gallery/${slug}`);
  };

  return (
    <main style={{ flex: 1, padding: "2rem 13.2rem" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        alignContent: "center",
        marginBottom: "1.5rem",
        flexWrap: "wrap",
        gap: "1rem"
      }}
    >
      <h2 style={{ margin: 0 }}>{currentCategory}</h2>
      <FilterBar
        categories={categories}
        activeCategory={currentCategory}
        onCategorySelect={handleCategorySelect}
      />
    </div>

    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center" }}>
      {filteredWorks.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  </main>

  );
};

export default GalleryPage;
