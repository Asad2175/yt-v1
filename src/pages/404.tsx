import { getI18nStaticProps } from '../lib/with-i18n-props.server';

export const getStaticProps = getI18nStaticProps(['common']);
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <div className="not-found container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="mb-4">Oops! Page not found</h2>
        <p className="mb-4">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <Link href="/" className="btn btn-primary px-4">
          Back to Home
        </Link>
      </div>
    </>
  );
}
