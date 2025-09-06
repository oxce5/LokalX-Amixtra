import React from "react";
import styles from "./FilterBar.module.css";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategorySelect: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <div className={styles.filterBar}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles.button} ${activeCategory === cat ? styles.active : ""}`}
          onClick={() => onCategorySelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
