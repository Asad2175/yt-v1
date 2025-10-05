import { Youtube } from 'interfaces/general';
import type { NextApiRequest, NextApiResponse } from 'next';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Proxy configuration
// const PROXY_URL = 'http://db635aa4857a7189:DvOcrwTI@res.proxy-seller.com:10000';

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

    // Create proxy agent
    // const proxyAgent = new HttpsProxyAgent(PROXY_URL);

    // console.log('🔒 Proxy configured');

    // Fetch data from YouTube oEmbed
    const response = await fetch(oEmbedUrl.toString(), {
      // @ts-ignore - agent is valid but TypeScript doesn't recognize it
      // agent: proxyAgent,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    console.log('✅ Response status:', response.status);

    if (!response.ok) {
      throw new Error(`YouTube oEmbed request failed: ${response.status}`);
    }

    const oembed = await response.json();
    console.log('✅ Video title:', oembed.title);

    // Extract video ID for fallback thumbnail or embed URL
    const videoId = extractVideoId(url);

    const data: Youtube = {
      title: oembed.title || '',
      author: oembed.author_name || '',
      thumbnail:
        oembed.thumbnail_url ||
        `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error('❌ Error:', error);
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
