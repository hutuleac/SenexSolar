import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Cât costă un sistem fotovoltaic în 2025?',
    answer:
      'Un sistem rezidențial complet (5 kWp) costă între 18.000 și 25.000 RON cu TVA. Prin finanțarea în rate TBI Bank, poți începe fără să plătești toată suma dintr-o dată. Grant-ul AFM de 20.000 RON este estimat pentru toamna 2026 — te ajutăm să te pregătești din timp. Pentru sisteme comerciale, prețul scade proporțional per kWp instalat.',
  },
  {
    question: 'Pot aplica la programul Casa Verde dacă locuiesc la bloc?',
    answer:
      'Momentan, programul AFM Casa Verde Fotovoltaice este disponibil doar pentru case unifamiliale. Dacă ai o firmă sau o clădire comercială, există alte programe de finanțare europene și naționale — consultați-ne gratuit pentru detalii.',
  },
  {
    question: 'Cât durează instalarea?',
    answer:
      'Instalarea propriu-zisă durează 1–2 zile. Procesul complet (proiect tehnic, autorizații, racordare la rețea, înregistrare prosumator) durează 30–60 de zile în funcție de furnizorul de rețea (E.ON, Electrica, Enel).',
  },
  {
    question: 'Ce se întâmplă noaptea sau când e noros?',
    answer:
      'Noaptea sistemul preia energie din rețea (la preț redus). Ziua, când produci mai mult decât consumi, dai înapoi în rețea și primești credit energetic — ești prosumator. Cu baterii de stocare, poți fi complet independent de rețea.',
  },
  {
    question: 'Are rost solar în Moldova unde e mai noros?',
    answer:
      'Da. Județul Iași are în medie 1.650 ore de soare pe an — suficient pentru un sistem profitabil. Sistemele noastre sunt calibrate pe iradiantul solar local. Chiar și cu zile înnorate, sistemele produc energie din lumina difuză.',
  },
  {
    question: 'Ce garanții oferiți?',
    answer:
      '25 ani garanție performanță panouri (minim 80% din puterea nominală), 10 ani garanție invertor, 5 ani garanție lucrări. Toate echipamentele sunt înregistrate la producător. Oferim și contract opțional de monitorizare și mentenanță anuală.',
  },
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
            <button
              className="faq-question"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
            >
              <span>{faq.question}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  flexShrink: 0,
                }}
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${i}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="faq-answer">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      <style>{`
        .faq-list { display: flex; flex-direction: column; gap: 0; }
        .faq-item {
          border-bottom: 1px solid #E2E0D8;
        }
        .faq-item:first-child { border-top: 1px solid #E2E0D8; }
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.25rem 0;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 600;
          color: #1A1A1A;
          text-align: left;
          transition: color 0.15s;
        }
        .faq-item.is-open .faq-question {
          color: #1E6B3A;
        }
        .faq-answer {
          padding: 0 0 1.25rem;
          font-size: 0.95rem;
          color: #4A4A4A;
          line-height: 1.7;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

export { faqs };
