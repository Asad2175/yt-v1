// pages/api/download-image.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    // Fetch the image as-is
    const imageResponse = await fetch(url);

    if (!imageResponse.ok) {
      return res
        .status(imageResponse.status)
        .json({ error: 'Failed to fetch image' });
    }

    // Pass through the original content type and pipe the data
    res.setHeader(
      'Content-Type',
      imageResponse.headers.get('content-type') || 'application/octet-stream'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=image_${Date.now()}.jpg`
    );

    const arrayBuffer = await imageResponse.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error('Error downloading image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
