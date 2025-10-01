import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.footerNav}>
        <a href="/contact" className={styles.footerLink}>Contact Us</a>
        <a href="/privacy-policy" className={styles.footerLink}>Privacy Policy</a>
        <a href="/terms-and-conditions" className={styles.footerLink}>Terms & Conditions</a>
      </nav>
      <p className={styles.footerCopy}>
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </p>
    </footer>
  );
}
