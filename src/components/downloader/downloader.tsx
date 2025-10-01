import styles from './Downloader.module.scss';

export default function Downloader() {
    return (
        <>
            <div className={`${styles['downloader']}`}>
                <div className="container">
                    <div className="box">
                        <h1 className='text-center'>TikTokmp3 - Youtube Video Downloader Online</h1>
                        <h2 className='text-center mt-2 mb-4'>TikTokmp3 offers to download fast, free, & Unlimited TikTok videos without Watermark – Safe, Secure & Subscription-free</h2>
<div className={styles.inputGroup}>
  <input className={styles.input} placeholder="Enter URL..." />
  <button className={styles.paste}>Paste</button>
</div>
                    </div>
                </div>
            </div>
        </>
    );
}