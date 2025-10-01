import '../styles/globals.scss';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Layout from '../Layout/layout';
import '../styles/custom.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default appWithTranslation(MyApp);
