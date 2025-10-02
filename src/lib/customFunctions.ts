export const cleanYouTubeUrl = (originalUrl: string): string => {
  try {
    const url = new URL(originalUrl);
    const searchId = url.searchParams.get('v');
    const returnUrl = `${url.origin}${url.pathname}?v=${searchId}`;
    return returnUrl.toString();
  } catch {
    return originalUrl;
  }
};
