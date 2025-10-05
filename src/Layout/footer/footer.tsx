import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={`${styles.footerNav} d-flex justify-content-center`}>
        <Link href="/contact-us" className={styles.footerLink} locale={false}>
          Contact Us
        </Link>
        <Link
          href="/privacy-policy"
          className={styles.footerLink}
          locale={false}
        >
          Privacy Policy
        </Link>
        <Link href="/terms-of-use" className={styles.footerLink} locale={false}>
          Terms & Conditions
        </Link>
      </nav>
      <p className={styles.footerCopy}>
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </p>
    </footer>
  );
}
