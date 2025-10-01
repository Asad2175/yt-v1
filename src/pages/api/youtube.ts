import { Youtube } from 'interfaces/youtube';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res
      .status(400)
      .json({ error: 'Please provide a valid YouTube URL as ?url=' });
  }

  try {
    // Build oEmbed API URL
    const oEmbedUrl = new URL('https://www.youtube.com/oembed');
    oEmbedUrl.searchParams.set('url', url);
    oEmbedUrl.searchParams.set('format', 'json');

    // Fetch data from YouTube oEmbed
    const response = await fetch(oEmbedUrl.toString());
    console.log('response', response);
    if (!response.ok) {
      throw new Error(`YouTube oEmbed request failed: ${response.status}`);
    }

    const oembed = await response.json();
    console.log('oembed', oembed);

    // Extract video ID for fallback thumbnail or embed URL
    const videoId = extractVideoId(url);

    const data: Youtube = {
      title: oembed.title || '',
      author: oembed.author_name || '',
      provider: oembed.provider_name || 'YouTube',
      thumbnail:
        oembed.thumbnail_url ||
        `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      embedHtml:
        oembed.html ||
        `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`,
      videoUrl: url,
    };

    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: 'Failed to fetch video details.' });
  }
}

function extractVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    if (u.searchParams.has('v')) return u.searchParams.get('v');
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts[0] === 'shorts' || parts[0] === 'live') return parts[1];
    return null;
  } catch {
    return null;
  }
}
