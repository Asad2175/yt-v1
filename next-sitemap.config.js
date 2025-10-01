/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'http://localhost:3000',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  changefreq: 'monthly',
  priority: 0.8,
  autoLastmod: true,
  robotsTxtOptions: {
    transformRobotsTxt: async (_, robotsTxt) => {
      const withoutHost = robotsTxt.replace(
        /# Host\nHost: https:\/\/ttmp3\.io\n\n/g,
        ''
      );
      return withoutHost;
    },
  },
  exclude: [
    '/404',
    '/en/404',
    '/id/404',
    '/vi/404',
    '/cs/404',
    '/es/404',
    '/fr/404',
    '/de/404',
    '/it/404',
    '/hu/404',
    '/ms/404',
    '/nl/404',
    '/pl/404',
    '/pt/404',
    '/th/404',
    '/tr/404',
    '/el/404',
    '/ru/404',
    '/ar/404',
    '/ko/404',
    '/ja/404',
    '/ro/404',
    '/bn/404',
    '/ur/404',
    '/hi/404',
  ],
  i18n: {
    locales: [
      'en',
      'id',
      'vi',
      'cs',
      'es',
      'fr',
      'de',
      'it',
      'hu',
      'ms',
      'nl',
      'pl',
      'pt',
      'th',
      'tr',
      'el',
      'ru',
      'ar',
      'ko',
      'ja',
      'ro',
      'bn',
      'ur',
      'hi',
    ],
    defaultLocale: 'en',
  },
  transform: async (config, path) => {
    if (path.startsWith('/en')) {
      path = path.replace(/^\/en/, '');
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
