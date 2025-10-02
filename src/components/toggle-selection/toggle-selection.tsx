import { useState } from 'react';
import styles from './toggle-selection.module.scss';

export default function ToggleSelection() {
  const [format, setFormat] = useState('mp3');
  return (
    <>
      <div className={`${styles.toggler} d-flex align-items-center`}>
        <span
          className={`${format === 'mp4' ? styles.active : ''} cursor-pointer`}
          onClick={() => setFormat('mp4')}
        >
          Mp4
        </span>
        <span
          className={`${format === 'mp3' ? styles.active : ''} cursor-pointer`}
          onClick={() => setFormat('mp3')}
        >
          Mp3
        </span>
      </div>
    </>
  );
}
