import router from 'next/router';
import { useVideoStore } from 'store/videoStore';
import Image from 'next/image';
import { useState } from 'react';

export default function Download() {
  const data = useVideoStore((state) => state.selectedVideo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [type, setType] = useState('');

  const downloadMp4 = (type: string) => {
    setType(type);
  };

  const downloadMp3 = async () => {
    try {
      setType('Mp3');
      setLoading(true);
      setError('');

      const response = await fetch(
        `/api/download-mp3?url=${encodeURIComponent(data?.url as string)}`
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Download failed. Try another link.');
      }

      // Convert response to blob
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      // Trigger browser download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${data?.video.title.replace(' ', '_')}.mp3`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Revoke object URL
      URL.revokeObjectURL(downloadUrl);
    } catch {
      setError('Something went wrong during download.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="result w-100 overflow-hidden">
          <div className="img w-100">
            <Image
              src={data?.video.thumbnail || ''}
              alt="Youtube Thumbnail"
              className="w-100"
              width={500}
              height={500}
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
          <div className="right-side">
            <h3 className="mb-4 text-center">Youtube Video Info</h3>
            <p className="text-center">
              <strong>Title:</strong> {data?.video.title}
            </p>
            <p className="text-center">
              <strong>Author Nickname:</strong> {data?.video.author}
            </p>

            <div className="buttons mt-4">
              <div className="mp3">
                <button
                  className="btn download-btn w-100 cursor-pointer mb-2"
                  onClick={downloadMp3}
                  disabled={loading}
                >
                  Download Mp3
                </button>
              </div>
              <div className="mp4">
                <button
                  className="btn download-btn w-100 cursor-pointer"
                  onClick={() => downloadMp4('144')}
                  disabled={loading}
                >
                  Download Mp4: 144p
                </button>
                <button
                  className="btn download-btn w-100 cursor-pointer"
                  onClick={() => downloadMp4('240')}
                  disabled={loading}
                >
                  Download Mp4: 240p
                </button>
                <button
                  className="btn download-btn w-100 cursor-pointer"
                  onClick={() => downloadMp4('360')}
                  disabled={loading}
                >
                  Download Mp4: 360p
                </button>
                <button
                  className="btn download-btn w-100 cursor-pointer"
                  onClick={() => downloadMp4('480')}
                  disabled={loading}
                >
                  Download Mp4: 480p
                </button>
                <button
                  className="btn download-btn w-100 cursor-pointer"
                  onClick={() => downloadMp4('720')}
                  disabled={loading}
                >
                  Download Mp4: 720p
                </button>
                <button
                  className="btn download-btn w-100 cursor-pointer"
                  onClick={() => downloadMp4('best')}
                  disabled={loading}
                >
                  Download Mp4: Best Quality
                </button>
              </div>
            </div>
            {error && (
              <p className="mt-4 error">
                Something went wrong during download. Please try again.
              </p>
            )}
            {loading && (
              <p className="mt-4">
                Please wait while we prepare your {type} file for download. The
                downloading time may vary depending on your internet speed.
              </p>
            )}
          </div>
        </div>

        <div className="w-100 next">
          <div className="note mb-4">
            <p>
              <strong>Note:</strong> We download videos only in the resolutions
              available on YouTube. If your selected resolution is not
              available, the system will automatically download the next lower
              resolution.
            </p>
          </div>
          <button
            onClick={() => router.push({ pathname: '/' })}
            className="w-100 btn cursor-pointer"
          >
            Next
          </button>
        </div>

        <section>
          <h1 className="text-center mb-4">
            How to Download TikTok Videos from ttmp3?
          </h1>
          <p>
            Ttmp3 is a tool that provides you with the facility to download free
            TikTok videos in a safe and secure environment. An unlimited number
            of videos can be downloaded without a watermark. This TikTok video
            downloader has multiple tools.
          </p>
          <p>
            The process of using this tool for free video downloading is quite
            simple. Here is a step-by-step process for downloading these videos.
          </p>
          <h3 className="mb-2">Copy TikTok Video URL</h3>
          <p>
            Open the TikTok app and search for the desired video to copy its
            URL. This process is quite easy. Just click on the share button, and
            you will find an option for “Copy Link” there. Just click on it, and
            a URL will be copied to your computer clipboard.
          </p>
          <h3 className="mb-2">Paste the URL to ttmp3</h3>
          <p>
            Open the website ttmp3.io and go to your desired page. This can be a
            video downloader, an audio downloader, a slideshow downloader, a
            thumbnail downloader, and a story downloader. Place your cursor in
            the textbox and click on the “Paste” button. The URL will be pasted
            into the textbox. Now click on the “Search” button.
          </p>
          <h3 className="mb-2">Download Video</h3>
          <p>
            You will be redirected to a download page where you will be given
            the option to download this video or go for another search. Click on
            your desired option.
          </p>
        </section>
      </div>
    </>
  );
}
