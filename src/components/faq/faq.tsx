'use client';
import { useState } from 'react';
import styles from './FAQ.module.scss';
import { FaqInterface } from 'interfaces/general';

export default function FAQ({ faqs }: { faqs: FaqInterface[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`${styles.faqList} overflow-hidden`}>
      {faqs.map((faq: FaqInterface, index: number) => (
        <div key={index} className={styles.faqItem}>
          <button
            className={`${styles.faqQuestion} ${
              openIndex === index ? styles.active : ''
            } d-flex align-items-center justify-content-between cursor-pointer w-100 position-relative`}
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
            } overflow-hidden`}
          >
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
