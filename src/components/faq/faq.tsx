'use client';
import { useState } from 'react';
import styles from './FAQ.module.scss';

export default function FAQ({ faqs }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqList}>
      {faqs.map((faq: any, index: any) => (
        <div key={index} className={styles.faqItem}>
          <button
            className={`${styles.faqQuestion} ${
              openIndex === index ? styles.active : ''
            }`}
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
            <span className={styles.faqIcon}>
              {openIndex === index ? '−' : '+'}
            </span>
          </button>
          <div
            className={`${styles.faqAnswer} ${
              openIndex === index ? styles.show : ''
            }`}
          >
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
