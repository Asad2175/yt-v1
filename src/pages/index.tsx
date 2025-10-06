import FAQ from '../components/faq/faq';
import Grid from '../components/Grid/grid';
import Downloader from '../components/downloader/downloader';
import { FaqInterface, GridInterface } from 'interfaces/general';
import { useTranslation } from 'next-i18next';
import type { GetStaticProps } from 'next';
import { getI18nStaticProps } from 'lib/with-i18n-props.server';

export const getStaticProps: GetStaticProps = getI18nStaticProps;

const cards: GridInterface[] = [
  {
    id: 1,
    title: 'Web Development',
    description:
      'Create stunning websites with modern technologies and best practices for optimal performance.',
  },
  {
    id: 2,
    title: 'Digital Marketing',
    description:
      'Boost your online presence with strategic marketing campaigns that drive real results and engagement.',
  },
  {
    id: 3,
    title: 'Data Analytics',
    description:
      'Transform raw data into actionable insights with powerful analytics and visualization tools.',
  },
];

const faqs: FaqInterface[] = [
  {
    question: 'What is your return policy?',
    answer:
      'You can return any unused product within 30 days for a full refund. Conditions apply.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we ship worldwide. Shipping charges may vary depending on your location.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order has shipped, we will send you a tracking number by email.',
  },
  {
    question: 'Can I change or cancel my order?',
    answer:
      'Orders can be changed or canceled within 24 hours of placing them.',
  },
];

export default function Home() {
  const { t } = useTranslation('common');
  return (
    <>
      <Downloader />

      {/* Youtube Video Downloader */}
      <section className="about">
        <div className="container">
          <h2 className="text-center">{t('features.title1')}</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <p>
            If you are going to use a passage of Lorem Ipsum, you need to be
            sure there isn't anything embarrassing hidden in the middle of text.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="text-center">Features</h2>
          <Grid cards={cards} />
        </div>
      </section>

      {/* YouTube to MP3 Converter */}
      <section className="about">
        <div className="container">
          <h2 className="text-center">Free YouTube to MP3 Converter</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <p>
            If you are going to use a passage of Lorem Ipsum, you need to be
            sure there isn't anything embarrassing hidden in the middle of text.
          </p>
        </div>
      </section>

      {/* YouTube to MP4 Converter */}
      <section className="about">
        <div className="container">
          <h2 className="text-center">Free YouTube to MP4 Converter</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <p>
            If you are going to use a passage of Lorem Ipsum, you need to be
            sure there isn't anything embarrassing hidden in the middle of text.
          </p>
        </div>
      </section>

      {/* YouTube Shorts Downloader */}
      <section className="about">
        <div className="container">
          <h2 className="text-center">Free YouTube Shorts Downloader</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <p>
            If you are going to use a passage of Lorem Ipsum, you need to be
            sure there isn't anything embarrassing hidden in the middle of text.
          </p>
        </div>
      </section>

      {/* YouTube Thumbnail Downloader */}
      <section className="about">
        <div className="container">
          <h2 className="text-center">Free YouTube Thumbnail Downloader</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <p>
            If you are going to use a passage of Lorem Ipsum, you need to be
            sure there isn't anything embarrassing hidden in the middle of text.
          </p>
        </div>
      </section>

      {/* How to Download */}
      <section>
        <div className="container">
          <h2 className="text-center">How to Download</h2>
          <p>
            <strong>Step 1:</strong> Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book.
          </p>
          <p>
            <strong>Step 2:</strong> If you are going to use a passage of Lorem
            Ipsum, you need to be sure there isn't anything embarrassing hidden
            in the middle of text.
          </p>
          <p>
            <strong>Step 3:</strong> Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book.
          </p>
          <p>
            <strong>Step 4:</strong> If you are going to use a passage of Lorem
            Ipsum, you need to be sure there isn't anything embarrassing hidden
            in the middle of text.
          </p>
          <p>
            <strong>Step 5:</strong> Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book.
          </p>
          <p>
            <strong>Step 6:</strong> If you are going to use a passage of Lorem
            Ipsum, you need to be sure there isn't anything embarrassing hidden
            in the middle of text.
          </p>
        </div>
      </section>

      {/* FAQ  */}
      <section>
        <div className="container">
          <h2 className="text-center">Frequently Asked Questions</h2>
          <FAQ faqs={faqs} />
        </div>
      </section>
    </>
  );
}
