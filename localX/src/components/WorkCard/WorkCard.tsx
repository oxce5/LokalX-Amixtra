import React from "react";
import type { Work } from "../../types/Work";
import styles from "./WorkCard.module.css";

const WorkCard: React.FC<{ work: Work }> = ({ work }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image} style={{ backgroundImage: `url(${work.imageUrl})` }} />
      <div className={styles.details}>
        <h3>{work.title}</h3>
        <div className={styles.artist}>
          <div className={styles.avatar}></div>
          <p>{work.artist}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
