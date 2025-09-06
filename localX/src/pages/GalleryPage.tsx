import React, { useState } from "react";
import { works as mockWorks } from "../data/works";
import type { Work } from "../types/Work";
import WorkCard from "../components/WorkCard/WorkCard";
import FilterBar from "../components/FilterBar/FilterBar";
import Footer from "../components/Footer";

const categories = [
  "Featured Works",
  "Visual Arts",
  "Music",
  "Dance & Performance",
  "Literary Arts",
  "Design & Multimedia",
];

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Featured Works");

  const filteredWorks: Work[] =
    selectedCategory === "Featured Works"
      ? mockWorks
      : mockWorks.filter((w) => w.category === selectedCategory);

  return (
    <>
      <main style={{ padding: "2rem 4rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Featured Works</h2>
        <FilterBar
          categories={categories}
          activeCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
          {filteredWorks.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </main>
      
    </>
  );
};

export default GalleryPage;
