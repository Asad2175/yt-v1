import type { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import ffmpegPath from 'ffmpeg-static';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, quality } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'videoUrl is required' });
  }

  try {
    const outputFile = path.join(process.cwd(), `video_${Date.now()}.mp4`);

    // ✅ Choose format dynamically
    let format = 'bestvideo+bestaudio';
    if (quality === '360') {
      format = 'bv*[height<=360]+ba/best';
    }

    const ytDlpPath = path.join(
      process.cwd(),
      'bin',
      process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp'
    );

    // ✅ Build arguments
    const args =
      quality === '360'
        ? ['-f', 'best[ext=mp4]/best', url, '-o', '-'] // Direct stream for 360
        : [
            '-f',
            format,
            '--ffmpeg-location',
            ffmpegPath as string,
            '--merge-output-format',
            'mp4',
            '-o',
            outputFile,
            url,
          ];

    if (quality === '360') {
      // ✅ Direct streaming for 360
      const ytDlp = spawn(ytDlpPath, args, {
        stdio: ['ignore', 'pipe', 'pipe'],
      });

      ytDlp.stdout.pipe(res);

      ytDlp.stderr.setEncoding('utf8');
      ytDlp.stderr.on('data', (data) =>
        console.error(`yt-dlp stderr: ${data}`)
      );

      ytDlp.on('error', (err) => {
        console.error('yt-dlp failed to start:', err);
        if (!res.headersSent) {
          res
            .status(500)
            .json({ error: 'Something went wrong. Please try again.' });
        }
      });

      ytDlp.on('close', (code) => {
        if (code !== 0 && !res.headersSent) {
          res.status(500).json({ error: `yt-dlp exited with code ${code}` });
        }
        res.end(); // Ensure response is closed
      });
    } else {
      // ✅ Download to file for other qualities
      const ytDlp = spawn(ytDlpPath, args);

      ytDlp.stdout.on('data', (data) => console.log(`stdout: ${data}`));
      ytDlp.stderr.on('data', (data) => console.error(`stderr: ${data}`));

      ytDlp.on('close', (code) => {
        if (code === 0) {
          res.setHeader(
            'Content-Disposition',
            'attachment; filename="video.mp4"'
          );
          res.setHeader('Content-Type', 'video/mp4');

          const stream = fs.createReadStream(outputFile);
          stream.pipe(res);

          stream.on('end', () => {
            console.log('Download completed');
            res.status(200).end('Download COmpleted');
            fs.unlink(outputFile, (err) => {
              if (err) console.error('Failed to delete temp file:', err);
            });
          });

          stream.on('error', (err) => {
            console.error('Stream error:', err);
            res.status(500).end('Failed to stream file');
          });
        } else {
          res.status(500).json({ error: 'Failed to download video' });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process video' });
  }
}
