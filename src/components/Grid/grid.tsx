// components/Grid/grid.js
import React from 'react';
import styles from './grid.module.scss';
import { GridInterface } from '../../interfaces/general';

export default function Grid({ cards }: { cards: GridInterface[] }) {
  return (
    <div className={styles.gridContainer}>
      {/* Grid Section */}
      <div className={styles.grid}>
        {cards && cards.length > 0 ? (
          cards.map((card: GridInterface) => (
            <div className={styles.card} key={card.id}>
              <div className={styles.cardImage}>
                <img src={card.image} alt={card.title} />
              </div>
              <div className={styles.cardContent}>
                <h3>{card.title}</h3>
                <p className="small">{card.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noCards}>No cards available</p>
        )}
      </div>
    </div>
  );
}
