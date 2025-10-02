import { FaqInterface } from 'interfaces/general';

export function generateFaqSchema(
  faqs: FaqInterface[],
  t: (key: string) => string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: t(faq.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(faq.answer),
      },
    })),
  };
}
