import { ReactNode } from 'react';
import Footer from './footer/footer';
import Header from './header/header';
import { useTranslation } from 'next-i18next';
import { ABeeZee, Gulzar, Noto_Naskh_Arabic } from 'next/font/google';

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

export const poppins = ABeeZee({
  weight: ['400'],
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
