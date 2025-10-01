export default function imageLoader({ src }) {
  const url = new URL(src);
  if (url.hostname.includes('tiktok') || url.hostname.includes('yt')) {
    return src;
  }
  throw new Error('Image host not allowed');
}
