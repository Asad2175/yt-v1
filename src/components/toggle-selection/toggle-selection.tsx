import { useState } from 'react';
import styles from './toggle-selection.module.scss';
import { useTranslation } from 'next-i18next';

export default function ToggleSelection() {
  const [format, setFormat] = useState('mp3');
  const { i18n } = useTranslation('common');

  const direction =
    i18n.language === 'ar' || i18n.language === 'ur' ? 'rtl' : 'ltr';

  return (
    <>
      <div
        className={`${styles.toggler} d-flex align-items-center d-flex justify-content-center`}
      >
        <button
          className={`${format === 'mp4' ? styles.active : ''} btn cursor-pointer`}
          onClick={() => setFormat('mp4')}
        >
          Youtube Mp4 Downloader
        </button>
        <button
          className={`${format === 'mp3' ? styles.active : ''} btn cursor-pointer ${direction === 'ltr' ? 'ml-20' : 'mr-20'}`}
          onClick={() => setFormat('mp3')}
        >
          Youtube Mp3 Downloader
        </button>
        <button
          className={`${format === 'shorts' ? styles.active : ''} btn cursor-pointer ${direction === 'ltr' ? 'ml-20' : 'mr-20'}`}
          onClick={() => setFormat('shorts')}
        >
          Youtube Shorts Downloader
        </button>
        <button
          className={`${format === 'image' ? styles.active : ''} btn cursor-pointer ${direction === 'ltr' ? 'ml-20' : 'mr-20'}`}
          onClick={() => setFormat('image')}
        >
          Youtube Thumbnail Downloader
        </button>
      </div>
    </>
  );
}
