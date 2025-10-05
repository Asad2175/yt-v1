import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <section>
        <div className="container">
          <h1 className="text-center">404</h1>
          <h2 className="mb-4 text-center">Oops! Page not found</h2>
          <p className="mb-4 text-center">
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>
          <Link className="justify-content-center d-flex" href="/">
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
