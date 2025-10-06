// components/Grid/grid.js
import React from 'react';
import styles from './grid.module.scss';
import { GridInterface } from '../../interfaces/general';

export default function Grid({ cards }: { cards: GridInterface[] }) {
  return (
    <div className={styles.grid}>
      {cards && cards.length > 0 ? (
        cards.map((card: GridInterface, index: number) => (
          <div
            className={`${styles.card} overflow-hidden cursor-pointer position-relative`}
            key={card.id}
          >
            <div
              className={`${styles.cardCount} d-flex align-items-center justify-content-center`}
            >
              {index + 1}
            </div>
            <div className={styles.cardContent}>
              <h3 className="text-center">{card.title}</h3>
              <p className="small m-0 text-center">{card.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noCards}>No cards available</p>
      )}
    </div>
  );
}
