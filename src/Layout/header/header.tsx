'use client';

import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import Dropdown from '../../components/dropdown/dropdown';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              <Link href="/">
                <img src="/icons/logoIcon.svg" alt="ttmp3" />
              </Link>
            </div>

            <div className={styles.lang}>
              <Dropdown />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
