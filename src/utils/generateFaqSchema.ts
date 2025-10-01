import { Faq } from 'interfaces/faq';

export function generateFaqSchema(faqs: Faq[], t: (key: string) => string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: t(faq.title),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(faq.description),
      },
    })),
  };
}
