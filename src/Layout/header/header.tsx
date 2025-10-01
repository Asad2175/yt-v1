'use client';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { languages, languagesArray } from 'constants/languages';
import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import Dropdown from '../../components/dropdown/dropdown';

const navLinks = [
  { href: '/', label: 'Youtube Downloader' },
  { href: '/', label: 'Youtube to Mp4' },
  { href: '/', label: 'Youtube to Mp3' },
];

export default function Header() {
  const router = useRouter();
  const { locale } = router;
  const localeNames: Record<string, string> = languages;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMobileMenuOpen &&
        !target.closest(`.${styles['mobile-menu']}`) &&
        !target.closest(`.${styles.hamburger}`)
      ) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={styles.navbar}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between gap-4">
            <div className={styles.logo}>
              <img src="/icons/logoIcon.svg" alt="ttmp3" />
            </div>

            <div className="d-flex gap-24">
              {/* Desktop Menu */}
              <div className={`${styles['menu-items']} gap-24`}>
                <div className={`${styles['nav-items']} d-flex align-items-center gap-24`}>
                  {navLinks.map(({ href, label }) => (
                    <Link key={label} href={href} className="text-decoration">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.lang}>
                <Dropdown
                  options={languagesArray}
                  placeholder="Choose Language"
                  onChange={(val) => console.log('Selected language:', val)}
                  defaultValue="en"
                />
              </div>

              {/* Hamburger Menu Button */}
              <button
                className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`${styles['mobile-overlay']} ${isMobileMenuOpen ? styles.active : ''}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu */}
      <div className={`${styles['mobile-menu']} ${isMobileMenuOpen ? styles.active : ''}`}>
        <div className={styles['mobile-menu-header']}>
          <div className={styles.logo}>
            <img src="/icons/logoIcon.svg" alt="ttmp3" />
          </div>
          <button className={styles['close-btn']} onClick={closeMobileMenu} aria-label="Close menu">
            ✕
          </button>
        </div>

        <div className={styles['mobile-nav-items']}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={styles['mobile-nav-link']}
              onClick={closeMobileMenu}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
