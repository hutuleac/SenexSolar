import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'motion/react';
import { Turnstile } from '@marsidev/react-turnstile';

const schema = z.object({
  name: z.string().min(2, 'Introduceți numele (minim 2 caractere)'),
  phone: z.string().min(10, 'Introduceți un număr de telefon valid'),
  billAmount: z.number({ invalid_type_error: 'Introduceți valoarea facturii' }).min(50).max(10000),
  propertyType: z.enum(['casa', 'firma', 'apartament'], {
    errorMap: () => ({ message: 'Selectați tipul proprietății' }),
  }),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (!turnstileToken) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, turnstileToken }),
      });
      if (res.ok) {
        setStatus('success');
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'contact',
            event_label: 'contact_form',
          });
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="form-success"
        >
          <div className="success-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <h3>Mesajul a fost primit!</h3>
          <p>Am primit solicitarea ta. Te vom contacta în curând pentru analiza gratuită.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          className="contact-form"
          noValidate
        >
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name" className="form-label">Nume și prenume *</label>
              <input
                id="name"
                type="text"
                className={`form-input ${errors.name ? 'has-error' : ''}`}
                placeholder="Ion Popescu"
                {...register('name')}
              />
              {errors.name && <span className="form-error">{errors.name.message}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="phone" className="form-label">Telefon (WhatsApp) *</label>
              <input
                id="phone"
                type="tel"
                className={`form-input ${errors.phone ? 'has-error' : ''}`}
                placeholder="0754 xxx xxx"
                {...register('phone')}
              />
              {errors.phone && <span className="form-error">{errors.phone.message}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="billAmount" className="form-label">Factură medie lunară (RON) *</label>
              <input
                id="billAmount"
                type="number"
                className={`form-input ${errors.billAmount ? 'has-error' : ''}`}
                placeholder="250"
                min={50}
                max={10000}
                {...register('billAmount', { valueAsNumber: true })}
              />
              {errors.billAmount && <span className="form-error">{errors.billAmount.message}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="propertyType" className="form-label">Tip proprietate *</label>
              <select
                id="propertyType"
                className={`form-input ${errors.propertyType ? 'has-error' : ''}`}
                {...register('propertyType')}
              >
                <option value="">Selectează...</option>
                <option value="casa">Casă / Vilă</option>
                <option value="apartament">Apartament</option>
                <option value="firma">Firmă / Spațiu comercial</option>
              </select>
              {errors.propertyType && <span className="form-error">{errors.propertyType.message}</span>}
            </div>
          </div>

          <p className="form-privacy">
            Datele tale sunt confidențiale. Nu spam, nu apeluri repetate — doar informații utile.
          </p>

          <Turnstile
            siteKey="0x4AAAAAAC8Z8HBQ2LEWhhKy"
            onSuccess={setTurnstileToken}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
            options={{ theme: 'light', language: 'ro' }}
          />

          <button
            type="submit"
            className="form-submit"
            disabled={status === 'loading' || !turnstileToken}
          >
            {status === 'loading' ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="spin">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                Se trimite...
              </>
            ) : (
              <>
                Solicită analiza gratuită
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </>
            )}
          </button>

          {status === 'error' && (
            <p className="form-error-global">
              A apărut o eroare. Vă rugăm să ne contactați direct la {' '}
              <a href="tel:+40754457239">0754 457 239</a>.
            </p>
          )}
        </motion.form>
      )}

      <style>{`
        .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .form-row { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        @media (min-width: 640px) { .form-row { grid-template-columns: 1fr 1fr; } }
        .form-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .form-label { font-size: 0.875rem; font-weight: 600; color: #1A1A1A; }
        .form-input {
          padding: 0.75rem 1rem;
          border: 2px solid #E2E0D8;
          border-radius: 8px;
          font-size: 0.95rem;
          font-family: inherit;
          color: #1A1A1A;
          background: white;
          transition: border-color 0.15s;
          outline: none;
          width: 100%;
        }
        .form-input:focus { border-color: #1E6B3A; }
        .form-input.has-error { border-color: #c0392b; }
        .form-error { font-size: 0.8rem; color: #c0392b; }
        .form-privacy { font-size: 0.8rem; color: #9B9B9B; line-height: 1.5; }
        .form-submit {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          background: #F5A623; color: #1A1A1A;
          font-weight: 700; font-size: 1rem; padding: 0.875rem 1.5rem;
          border: none; border-radius: 8px; cursor: pointer;
          font-family: inherit;
          transition: background 0.15s, transform 0.15s;
        }
        .form-submit:hover:not(:disabled) { background: #d4891a; transform: translateY(-2px); }
        .form-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .form-error-global { font-size: 0.85rem; color: #c0392b; text-align: center; }
        .form-error-global a { color: #1E6B3A; font-weight: 600; }
        .form-success {
          text-align: center; padding: 2.5rem 1rem;
          display: flex; flex-direction: column; align-items: center; gap: 1rem;
        }
        .success-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: #1E6B3A;
          display: flex; align-items: center; justify-content: center;
        }
        .form-success h3 { font-size: 1.5rem; font-weight: 700; color: #1A1A1A; margin: 0; }
        .form-success p { color: #6B6B6B; margin: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </AnimatePresence>
  );
}
