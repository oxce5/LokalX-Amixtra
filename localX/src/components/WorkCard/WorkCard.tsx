import React from "react";
import type { Work } from "../../types/Work";
import styles from "./WorkCard.module.css";

const WorkCard: React.FC<{ work: Work }> = ({ work }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image} style={{ backgroundImage: `url(${work.imageUrl})` }}>
        <h3 className={styles.title}>{work.title}</h3>
      </div>
      <div className={styles.details}>
        <div className={styles.artist}>
          <div className={styles.avatar}></div>
          <p className={styles.p}>{work.artist}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
