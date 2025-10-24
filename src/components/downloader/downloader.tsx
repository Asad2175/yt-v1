import { useState } from 'react';
import styles from './Downloader.module.scss';
import ToggleSelection from '../../components/toggle-selection/toggle-selection';
import router from 'next/router';
import { cleanYouTubeUrl } from 'lib/customFunctions';
import { useVideoStore } from 'store/videoStore';
import { Err } from 'interfaces/general';
import { useTranslation } from 'next-i18next';

// interface DownloaderProps {
//   title: string;
//   description: string;
//   search: string;
// }

export default function Downloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setSelectedVideo = useVideoStore((state) => state.setSelectedVideo);
  const { i18n } = useTranslation('common');

  const direction =
    i18n.language === 'ar' || i18n.language === 'ur' ? 'rtl' : 'ltr';

  const handlePaste = async () => {
    const text = await navigator.clipboard?.readText();
    setUrl(text);
  };

  const handleClear = async () => {
    setUrl('');
  };

  const handleSearch = async () => {
    if (!url.trim()) return;
    setError('');
    setLoading(true);
    const updatedURL = cleanYouTubeUrl(url.trim());
    try {
      const res = await fetch(
        `/api/youtube?url=${encodeURIComponent(updatedURL)}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to fetch video info');

      setSelectedVideo({
        video: data,
        url: updatedURL,
      });
      router.push({
        pathname: '/download',
      });
    } catch (err: unknown) {
      const error = err as Err;
      setError(error.message || 'Something went wrong. Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`${styles['downloader']}`}>
        <div className="container">
          <div className="box">
            <h1 className="text-center">
              YouTube Video Downloader – Free MP3, MP4, Shorts & Thumbnail Downloader Online
            </h1>
            <h2 className="text-center mt-2 mb-4">
              Download YouTube videos, Shorts, audio (MP3), and thumbnails for free. Fast, secure, and supports all formats including HD 1080p MP4 and 320kbps MP3.
            </h2>
            <ToggleSelection />
            <div className={`${styles.inputGroup} position-relative d-flex`}>
              <div
                className={`${styles.inputField} d-flex flex-1 ${direction === 'rtl' ? styles.right : ''}`}
              >
                <input
                  type="text"
                  value={url}
                  className={`${styles.input} w-100`}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter URL..."
                />
                {url ? (
                  <button
                    className={`${styles.paste} btn cursor-pointer`}
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                ) : (
                  <button
                    className={`${styles.paste} btn cursor-pointer`}
                    onClick={handlePaste}
                  >
                    Paste
                  </button>
                )}
              </div>
              <button
                className={`${styles.search} btn cursor-pointer ${direction === 'rtl' ? styles.right : ''}`}
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Search'}
              </button>
            </div>
            <div className={`${styles.notification}`}>
              {loading && (
                <p className={`${styles.loading}`}>
                  Please wait while we are fetching details for you...
                </p>
              )}
              {error && <p className={`${styles.loading}`}>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
