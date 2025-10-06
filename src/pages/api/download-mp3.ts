import type { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';
import path from 'path';
import ffmpegPath from 'ffmpeg-static';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { url } = req.query;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing YouTube video URL' });
  }

  if (!ffmpegPath) return res.status(500).json({ error: 'FFmpeg not found' });

  const isWindows = process.platform === 'win32';
  const ytDlpPath = isWindows
    ? path.join(process.cwd(), 'bin', 'yt-dlp.exe')
    : path.join(process.cwd(), 'bin', 'yt-dlp');

  // Headers for MP3 streaming
  res.setHeader('Content-Disposition', 'attachment; filename="audio.mp3"');
  res.setHeader('Content-Type', 'audio/mpeg');

  // yt-dlp arguments for streaming audio + merging to MP3 via ffmpeg
  const args: string[] = [
    '-f',
    'bestaudio', // best audio only
    '--extract-audio',
    '--audio-format',
    'mp3',
    '--audio-quality',
    '0',
    '--ffmpeg-location',
    ffmpegPath,
    '-o',
    '-', // stream to stdout
    url,
  ];

  const ytDlp = spawn(ytDlpPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });

  ytDlp.stdout.pipe(res); // pipe directly to client

  ytDlp.stderr.setEncoding('utf8');
  ytDlp.stderr.on('data', (data) => console.error('stderr:', data));

  ytDlp.on('error', (err) => {
    console.error('failed to start:', err);
    if (!res.headersSent)
      res.status(500).json({ error: 'Failed to start download process' });
  });

  ytDlp.on('close', (code) => {
    if (code !== 0) {
      console.error(`exited with code ${code}`);
      if (!res.headersSent)
        res.status(500).json({ error: `exited with code ${code}` });
    }
    res.end();
  });
}
