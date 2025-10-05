/** @type {import('next-sitemap').IConfig} */
const fs = require('fs');
const path = require('path');

const locales = [
  'en',
  'id',
  'vi',
  'cs',
  'es',
  'fr',
  'de',
  'it',
  'ms',
  'nl',
  'pt',
  'tr',
  'el',
  'ar',
  'ro',
  'bn',
  'ur',
  'hi',
];

const footerPages = ['/terms-of-use', '/privacy-policy', '/contact-us'];

const localizedFooterPages = footerPages.flatMap((page) =>
  locales.map((locale) => `/${locale}${page}`)
);

/** Get last modified date for a route's source file */
function getPageLastMod(route, locales) {
  // Remove leading slash
  let clean = route.replace(/^\/+/, '');
  if (!clean) clean = 'index';

  // Build possible paths, e.g. /about (about.tsx) or about/index.tsx
  const candidates = [
    path.join(process.cwd(), 'pages', `${clean}.tsx`),
    path.join(process.cwd(), 'pages', `${clean}.js`),
    path.join(process.cwd(), 'pages', clean, 'index.tsx'),
  ];

  for (const file of candidates) {
    if (fs.existsSync(file)) {
      return fs.statSync(file).mtime.toISOString();
    }
  }

  return new Date().toISOString(); // fallback
}

module.exports = {
  siteUrl: 'http://localhost:3000',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  priority: 1,
  robotsTxtOptions: {
    transformRobotsTxt: async (_, robotsTxt) => {
      const withoutHost = robotsTxt.replace(
        /# Host\nHost: https:\/\/ttmp3\.org\n\n/g,
        ''
      );
      return withoutHost;
    },
  },
  exclude: [
    '/404',
    '/download',
    ...locales.map((l) => `/${l}/404`),
    ...locales.map((l) => `/${l}/download`),
    ...localizedFooterPages,
  ],
  i18n: {
    locales,
    defaultLocale: 'en',
  },
  transform: async (config, url) => {
    const lastmod = getPageLastMod(url, config.i18n.locales);
    return {
      loc: url,
      priority: url === '/' ? 1 : 0.8,
      lastmod,
    };
  },
};
