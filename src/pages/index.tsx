import Grid from '../components/Grid/grid';
import Downloader from '../components/downloader/downloader';
import { getI18nStaticProps } from '../lib/with-i18n-props.server';
import { useTranslation } from 'next-i18next';

const cards = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    title: "Web Development",
    description: "Create stunning websites with modern technologies and best practices for optimal performance and user experience."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    title: "Digital Marketing",
    description: "Boost your online presence with strategic marketing campaigns that drive real results and engagement."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with powerful analytics and visualization tools."
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&q=80",
    title: "Cloud Solutions",
    description: "Scale your infrastructure with reliable cloud services and seamless deployment strategies."
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    title: "UI/UX Design",
    description: "Design beautiful and intuitive user experiences that engage and delight your audience."
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80",
    title: "AI & Machine Learning",
    description: "Leverage artificial intelligence to automate processes and create intelligent solutions."
  }
];

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>
      <Downloader />

      {/* About us */}
      <section className='about'>
        <div className='container'>
          <h2 className='text-center'>Free YouTube to MP4 Converter</h2>
          <p>Yt1s is Popular YouTube to MP4 Converter. using this Free YouTube Downloader that Allow to Easily Download and save YouTube Videos in High quality.</p>
          <p>Follow Just simple process insert URL in to search box. Select Quality You can download YouTube MP4 Videos and save them different quality such as 144p, 240p, 360p, 480p, 720p, 1080p, 1440p (2k) and upto 2160p (4k). Our Youtube Video Downloader totally Safe and secure.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className='text-center'>Our Services</h2>
          <Grid cards={cards} />
        </div>
      </section>
    </>
  );
}

export const getStaticProps = getI18nStaticProps(['common']);
