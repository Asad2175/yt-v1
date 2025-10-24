'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { languages } from 'constants/languages';

const defaultLocale = 'en';

export default function Dropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { locale, locales, asPath } = router;
  const localeNames: Record<string, string> = languages;
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${styles.dropdown} w-100 position-relative`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={`${styles.dropdownToggle} ${isOpen ? styles.open : ''} cursor-pointer w-100`}
        onClick={handleToggle}
      >
        <span className={styles.selectedText}>
          {localeNames[locale || defaultLocale]}
        </span>
      </button>
      {isOpen && (
        <ul
          className={`${styles.dropdownMenu} m-0 ${locale === 'ur' || locale === 'ar' ? styles.right : ''}`}
        >
          {locales?.map((lang) => {
            const href =
              lang === locale
                ? asPath
                : lang === defaultLocale
                  ? asPath // no prefix for default locale
                  : `/${lang}${asPath}`;
            return (
              <li key={lang}>
                <Link
                  href={href}
                  locale={lang}
                  onClick={() => setIsOpen(false)}
                  className={`${styles.dropdownItem} ${lang === locale ? styles.selected : ''} text-decoration`}
                >
                  {localeNames[lang]}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
