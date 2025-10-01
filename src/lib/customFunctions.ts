export const cleanYouTubeUrl = (originalUrl: string): string => {
  const url = new URL(originalUrl);
  console.log('url', url);

  // // ✅ Remove 'list' if it exists
  // if (url.searchParams.has('list')) {
  //   url.searchParams.delete('list');
  // }

  // // ✅ Remove 'start_radio' if it exists
  // if (url.searchParams.has('start_radio')) {
  //   url.searchParams.delete('start_radio');
  // }
  // console.log('get watch', url.searchParams.get('v'));
  const searchId = url.searchParams.get('v');

  const returnUrl = `${url.origin}${url.pathname}?v=${searchId}`;

  return returnUrl.toString();
};
