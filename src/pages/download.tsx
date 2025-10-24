import router from 'next/router';
import { useVideoStore } from 'store/videoStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Err } from 'interfaces/general';
import Loader from '../components/loader/loader';

export default function Download() {
  const data = useVideoStore((state) => state.selectedVideo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [type, setType] = useState('');
  const [loader, setLoader] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        console.log('prev', prev);
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const downloadMp4 = async (type: string) => {
    try {
      setType(type);
      setLoading(true);
      setProgress(0);
      setError('');
      setLoader(true);

      const response = await fetch(
        `/api/download?url=${encodeURIComponent(data?.url.trim() as string)}&quality=${type === 'Best Quality' ? '' : type}`
      );

      if (!response.ok) {
        let errorMessage = 'Download failed. Try another link.';
        try {
          const errorData = await response.json(); // parse JSON from BE
          errorMessage = errorData.message || errorMessage;
        } catch {
          const text = await response.text(); // fallback if not JSON
          if (text) errorMessage = text;
        }
        throw new Error(errorMessage);
      }

      // Convert response to blob
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      // Trigger browser download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${data?.video.title.replace(' ', '_')}.mp4`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Revoke object URL
      URL.revokeObjectURL(downloadUrl);
    } catch (err: unknown) {
      const e = err as Err;
      setError(e.message || 'Something went wrong. Please try again');
    } finally {
      setLoader(false);
      setLoading(false);
      setProgress(100);
    }
  };

  const downloadMp3 = async () => {
    try {
      setType('Mp3');
      setLoader(true);
      setLoading(true);
      setProgress(0);
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
      setLoader(false);
      setLoading(false);
      setProgress(100);
    }
  };

  const downloadImage = async () => {
    try {
      setType(type);
      setLoading(true);
      setError('');
      // Fetch the upscaled image from your API

      const thumbnailUrl = data?.video?.thumbnail;

      if (!thumbnailUrl) {
        console.error('No thumbnail URL found');
        return;
      }

      const response = await fetch(
        `/api/download-image?url=${encodeURIComponent(thumbnailUrl)}`
      );

      if (!response.ok) {
        throw new Error('Failed to download Thumbnail');
      }

      // Convert to blob (binary data)
      const blob = await response.blob();

      // Create a temporary link element
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `image_hd_${Date.now()}.jpg`; // filename
      document.body.appendChild(a);
      a.click();

      // Cleanup
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err: unknown) {
      const e = err as Err;
      setError(e.message || 'Something went wrong. Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        {data?.video ? (
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
                  <div className="mp4 mb-2">
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
                      onClick={() => downloadMp4('Best Quality')}
                      disabled={loading}
                    >
                      Download Mp4: Best Quality
                    </button>
                  </div>
                  <div className="mp3">
                    <button
                      className="btn download-btn w-100 cursor-pointer mb-2"
                      onClick={downloadImage}
                      disabled={loading}
                    >
                      Download Thumbnail
                    </button>
                  </div>
                </div>
                {error && <p className="mt-4 error">{error}</p>}
                {loader && <Loader progress={progress} />}
                {loading && (
                  <p className="mt-4">
                    Please wait while we prepare your{' '}
                    {type === 'Best Quality' || 'Mp3' ? type : type + 'p'} file
                    for download. The downloading time may vary depending on
                    your internet speed.
                  </p>
                )}
              </div>
            </div>

            <div className="w-100 next">
              <div className="note mb-4">
                <p className="m-0">
                  <strong>Note:</strong>{' '}
                </p>
                <p className="m-0">
                  We can only grab videos in the resolutions that YouTube
                  actually provides.
                </p>
                <p className="m-0">
                  If the resolution you pick isn't available, we won't be able
                  to fetch it — instead, you'll see an error message letting you
                  know.
                </p>
              </div>
              <button
                onClick={() => router.push({ pathname: '/' })}
                className="w-100 btn cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center mt-2">No Data Found</p>
        )}
      </section>
    </>
  );
}
