'use client';

import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import Dropdown from '../../components/dropdown/dropdown';
import Link from 'next/link';
import { useRouter } from 'next/router';

const footerPages = ['/terms-of-use', '/privacy-policy', '/contact-us'];

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const isFooterPage = footerPages.includes(router.pathname);

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
              <Link href="/">
                <img src="/icons/logoIcon.svg" alt="ttmp3" />
              </Link>
            </div>

            <div className="d-flex align-items-center gap-24">
              <div className={styles.lang}>{!isFooterPage && <Dropdown />}</div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
