import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Maria Dumitriu',
    role: 'Educatoare, Iași - Tătărași',
    stars: 5,
    date: 'Martie 2025',
    source: 'Google',
    text: 'Nu știam nimic despre panouri solare și mă temeam că o să fie complicat. Echipa Senex a venit la noi, ne-a explicat totul în 2 ore și s-a ocupat de toată hârtia pentru AFM. Instalarea a durat o singură zi. Acum, în iulie, facturam mai mult decât consumam. Recomand cu toată încrederea.',
  },
  {
    name: 'Ioan Rotaru',
    role: 'Inginer, Iași - Bucium',
    stars: 5,
    date: 'Ianuarie 2025',
    source: 'Google',
    text: 'Profesioniști adevărați. De la prima discuție și până la montaj, totul a decurs perfect. Grant-ul AFM l-am primit în 3 luni. Acum factura lunară e 45 RON față de 320 RON cât aveam înainte. Îmi pare rău că n-am instalat mai devreme.',
  },
  {
    name: 'Daniela și Costel Munteanu',
    role: 'Iași, Zona Nicolina',
    stars: 5,
    date: 'Decembrie 2024',
    source: 'Facebook',
    text: 'Am ales Senex Solar după 3 oferte. Au fost cei mai transparenți la costuri și la așteptări. Nu au promis luna de pe cer, ci s-au ținut de ce au promis. Sistemul produce exact cât au estimat. 5 stele meritate.',
  },
  {
    name: 'Petru Agache',
    role: 'Antreprenor, Vaslui',
    stars: 5,
    date: 'Octombrie 2024',
    source: 'Google',
    text: 'Am instalat 8 kWp pentru un depozit mic. ROI-ul iese în 4 ani. Echipa a venit la timp, a curățat totul după montaj și ne-au livrat aplicația de monitorizare configurată. Serviciu complet, fără surprize.',
  },
  {
    name: 'Alina Bejan',
    role: 'Medic, Iași',
    stars: 5,
    date: 'August 2024',
    source: 'Google',
    text: 'Recomand fără rezerve. Am primit oferta în 24h de la primul contact, graficul de lucrări a fost respectat, iar sistemul funcționează impecabil. Economisesc 280 RON/lună. Investiție inteligentă.',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F5A623" aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
}

export function TestimonialCarousel() {
  return (
    <div className="tc-wrapper">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="tc-swiper"
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div className="tc-card">
              <div className="tc-header">
                <Stars count={t.stars} />
                <span className="tc-source">{t.source}</span>
              </div>
              <p className="tc-text">"{t.text}"</p>
              <div className="tc-footer">
                <div className="tc-avatar" aria-hidden="true">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="tc-name">{t.name}</p>
                  <p className="tc-role">{t.role} · {t.date}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .tc-wrapper { padding-bottom: 2.5rem; }
        .tc-swiper .swiper-pagination-bullet { background: #1E6B3A; opacity: 0.3; }
        .tc-swiper .swiper-pagination-bullet-active { opacity: 1; }
        .tc-card {
          background: white;
          border-radius: 12px;
          padding: 1.75rem;
          border: 1px solid #E2E0D8;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 100%;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .tc-header { display: flex; align-items: center; justify-content: space-between; }
        .tc-source { font-size: 0.72rem; font-weight: 700; color: #9B9B9B; text-transform: uppercase; letter-spacing: 0.06em; }
        .tc-text { font-size: 0.9rem; color: #4A4A4A; line-height: 1.7; flex: 1; font-style: italic; }
        .tc-footer { display: flex; align-items: center; gap: 0.75rem; margin-top: auto; }
        .tc-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: #1E6B3A; color: white;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 1rem; flex-shrink: 0;
        }
        .tc-name { font-size: 0.875rem; font-weight: 700; color: #1A1A1A; margin: 0; }
        .tc-role { font-size: 0.75rem; color: #9B9B9B; margin: 0; }
      `}</style>
    </div>
  );
}
