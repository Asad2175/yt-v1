// pages/api/instagram-scrape.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Instagram username is required' });
  }

  try {
    // Fetch the profile HTML
    const response = await axios.get(`https://www.instagram.com/${username}/`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      },
    });

    const html = response.data as string;

    // Extract JSON data embedded in the HTML
    const regex = /<script type="application\/ld\+json">(.+?)<\/script>/;
    const match = html.match(regex);

    let profileData: any = null;
    if (match && match[1]) {
      profileData = JSON.parse(match[1]);
    }

    // Another script (window._sharedData) contains posts
    const sharedDataRegex =
      /<script type="text\/javascript">window\._sharedData = (.+?);<\/script>/;
    const sharedMatch = html.match(sharedDataRegex);

    let posts: any[] = [];
    if (sharedMatch && sharedMatch[1]) {
      const sharedJson = JSON.parse(sharedMatch[1]);
      const edges =
        sharedJson?.entry_data?.ProfilePage?.[0]?.graphql?.user
          ?.edge_owner_to_timeline_media?.edges || [];
      posts = edges.map((edge: any) => ({
        id: edge.node.id,
        shortcode: edge.node.shortcode,
        isVideo: edge.node.is_video,
        caption: edge.node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
        displayUrl: edge.node.display_url,
        thumbnail: edge.node.thumbnail_src,
        videoUrl: edge.node.is_video ? edge.node.video_url : null,
        comments: edge.node.edge_media_to_comment?.count || 0,
        likes: edge.node.edge_liked_by?.count || 0,
      }));
    }

    res.status(200).json({
      profile: {
        name: profileData?.name,
        description: profileData?.description,
        image: profileData?.image,
      },
      posts,
    });
  } catch (error: any) {
    console.error('Scraping error:', error.message);
    res
      .status(500)
      .json({ error: 'Failed to scrape Instagram', details: error.message });
  }
}
