// components/Grid/grid.js
import React from 'react';
import styles from './grid.module.scss';
import { GridInterface } from '../../interfaces/general';

export default function Grid({ cards }: { cards: GridInterface[] }) {
  return (
    <div className={styles.grid}>
      {cards && cards.length > 0 ? (
        cards.map((card: GridInterface) => (
          <div className={`${styles.card} overflow-hidden cursor-pointer`} key={card.id}>
            <div className={`${styles.cardImage} overflow-hidden w-100 position-relative`}>
              <img src={card.image} alt={card.title} className='w-100' />
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
  );
}
