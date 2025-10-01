import { ReactNode } from 'react';
import Footer from './footer/footer';
import Header from './header/header';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { Gulzar, Noto_Naskh_Arabic, Poppins } from 'next/font/google';

const gulzar = Gulzar({
  weight: '400',
  display: 'swap',
  subsets: ['arabic'],
  preload: true, // preload font for faster LCP
});

const arabic = Noto_Naskh_Arabic({
  weight: '400',
  display: 'swap',
  subsets: ['arabic'],
  preload: true, // preload font for faster LCP
});

export const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  preload: true, // preload font for faster LCP
});

export default function Layout({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation('common');

  const direction =
    i18n.language === 'ar' || i18n.language === 'ur' ? 'rtl' : 'ltr';

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="32x32"
          href="/favicon-32x32.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="180x180"
          href="/favicon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon-512x512.png"
        />
        <meta name="apple-mobile-web-app-title" content="ttmp3.io" />
      </Head>
      <div
        dir={direction}
        lang={i18n.language}
        className={
          i18n.language === 'ur'
            ? gulzar.className
            : i18n.language === 'ar'
              ? arabic.className
              : poppins.className
        }
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
