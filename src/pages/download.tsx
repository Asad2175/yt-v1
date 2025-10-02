import router from "next/router";

export default function Download() {
    return <>
        <div className="container">
            <div className="result w-100 d-flex justify-content-center align-items-start overflow-hidden">
                <div className="img">
                    <img className="w-100" src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80" />
                </div>
                <div className="right-side">
                    <h3 className="mb-4 text-center">Youtube Video Info</h3>
                    <p><strong>Title:</strong> Ikko Mikke - Sanu ajkal sheesha bada ched da | Satinder Sartaaj | New Punjabi Song 2020 | New Song</p>
                    <p><strong>Author Nickname:</strong> SagaHits</p>
                    <p><strong>Provider:</strong> YouTube</p>
                    <p><strong>Video URL:</strong> https://www.youtube.com/watch?v=jZ7LFwaggyI</p>

                    <div className="buttons mt-4">
                        <div className="mp3">
                            <button className="btn download-btn w-100 cursor-pointer mb-2">Download Mp3</button>
                        </div>
                        <div className="mp4">
                            <button className="btn download-btn w-100 cursor-pointer">Download Mp4: 144p</button>
                            <button className="btn download-btn w-100 cursor-pointer">Download Mp4: 240p</button>
                            <button className="btn download-btn w-100 cursor-pointer">Download Mp4: 360p</button>
                            <button className="btn download-btn w-100 cursor-pointer">Download Mp4: 480p</button>
                            <button className="btn download-btn w-100 cursor-pointer">Download Mp4: 720p</button>
                            <button className="btn download-btn w-100 cursor-pointer">Download Mp4: Best Quality</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-100 next">
                <button onClick={() => router.push({pathname: '/'})} className="w-100 btn cursor-pointer">Next</button>
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
                <h3 className="mb-2">
                    Paste the URL to ttmp3
                </h3>
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
}