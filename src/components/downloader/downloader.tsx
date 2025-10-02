import { useState } from 'react';
import styles from './Downloader.module.scss';
import ToggleSelection from '../../components/toggle-selection/toggle-selection';

export default function Downloader() {
  const [url, setUrl] = useState('');

  const handlePaste = async () => {
    const text = await navigator.clipboard?.readText();
    setUrl(text);
  };

  const handleClear = async () => {
    setUrl('');
  };
  return (
    <>
      <div className={`${styles['downloader']}`}>
        <div className="container">
          <div className="box">
            <h1 className="text-center">
              TikTokmp3 - Youtube Video Downloader Online
            </h1>
            <h2 className="text-center mt-2 mb-4">
              TikTokmp3 offers to download fast, free, & Unlimited TikTok videos
              without Watermark – Safe, Secure & Subscription-free
            </h2>
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={url}
                className={styles.input}
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
              {/* <ToggleSelection /> */}
              <button className={`${styles.search} btn cursor-pointer`}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
