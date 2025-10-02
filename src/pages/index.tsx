import FAQ from '../components/faq/faq';
import Grid from '../components/Grid/grid';
import Downloader from '../components/downloader/downloader';
import { getI18nStaticProps } from '../lib/with-i18n-props.server';
import { FaqInterface, GridInterface } from 'interfaces/general';

const cards: GridInterface[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    title: 'Web Development',
    description:
      'Create stunning websites with modern technologies and best practices for optimal performance and user experience.',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    title: 'Digital Marketing',
    description:
      'Boost your online presence with strategic marketing campaigns that drive real results and engagement.',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
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
  return (
    <>
      <Downloader />

      {/* About us */}
      <section className="about">
        <div className="container">
          <h2 className="text-center">Free YouTube to MP4 Converter</h2>
          <p>
            Yt1s is Popular YouTube to MP4 Converter. using this Free YouTube
            Downloader that Allow to Easily Download and save YouTube Videos in
            High quality.
          </p>
          <p>
            Follow Just simple process insert URL in to search box. Select
            Quality You can download YouTube MP4 Videos and save them different
            quality such as 144p, 240p, 360p, 480p, 720p, 1080p, 1440p (2k) and
            upto 2160p (4k). Our Youtube Video Downloader totally Safe and
            secure.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="text-center">Our Services</h2>
          <Grid cards={cards} />
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="text-center">Frequently Asked Questions</h2>
          <FAQ faqs={faqs} />
        </div>
      </section>
    </>
  );
}

export const getStaticProps = getI18nStaticProps(['common']);
