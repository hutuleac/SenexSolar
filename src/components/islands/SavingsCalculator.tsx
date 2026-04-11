import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { calculate, type PropertyType } from '../../lib/calculator';
import { COUNTIES_SORTED } from '../../lib/counties';

function formatRON(n: number) {
  return new Intl.NumberFormat('ro-RO').format(n) + ' RON';
}

export function SavingsCalculator() {
  const [bill, setBill] = useState(300);
  const [propertyType, setPropertyType] = useState<PropertyType>('rezidential');
  const [countyCode, setCountyCode] = useState('IS');

  const result = useMemo(
    () => calculate({ monthlyBillRON: bill, propertyType, countyCode }),
    [bill, propertyType, countyCode]
  );

  return (
    <div className="calc-wrapper">
      {/* Inputs */}
      <div className="calc-inputs">
        <div className="calc-field">
          <label className="calc-label" htmlFor="bill">
            Valoarea medie a facturii lunare
            <span className="calc-bill-val">{bill} RON</span>
          </label>
          <input
            id="bill"
            type="range"
            min={100}
            max={2000}
            step={50}
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
            className="calc-slider"
            aria-valuetext={`${bill} RON`}
          />
          <div className="calc-slider-labels">
            <span>100 RON</span>
            <span>2.000 RON</span>
          </div>
        </div>

        <div className="calc-field">
          <span className="calc-label">Tip proprietate</span>
          <div className="calc-toggle">
            {(['rezidential', 'comercial'] as PropertyType[]).map((type) => (
              <button
                key={type}
                onClick={() => setPropertyType(type)}
                className={`calc-toggle-btn ${propertyType === type ? 'active' : ''}`}
                aria-pressed={propertyType === type}
              >
                {type === 'rezidential' ? '🏠 Casa' : '🏭 Firma / Hala'}
              </button>
            ))}
          </div>
        </div>

        <div className="calc-field">
          <label className="calc-label" htmlFor="county">Județul</label>
          <select
            id="county"
            value={countyCode}
            onChange={(e) => setCountyCode(e.target.value)}
            className="calc-select"
          >
            {COUNTIES_SORTED.map(({ code, name }) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${result.systemKwp}-${result.annualSavingsRON}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="calc-results"
        >
          <div className="calc-result-header">
            <div className="calc-system-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
              </svg>
              Sistemul recomandat: <strong>{result.systemKwp} kWp</strong>
            </div>
          </div>

          <div className="calc-metrics">
            <div className="calc-metric primary">
              <span className="calc-metric-val">{formatRON(result.annualSavingsRON)}</span>
              <span className="calc-metric-label">economie anuală estimată</span>
            </div>
            <div className="calc-metric">
              <span className="calc-metric-val">{result.paybackYears} ani</span>
              <span className="calc-metric-label">recuperezi investiția</span>
            </div>
            <div className="calc-metric">
              <span className="calc-metric-val">{formatRON(result.systemCostRON)}</span>
              <span className="calc-metric-label">
                cost net{propertyType === 'rezidential' ? ' (după grant AFM estimat)' : ''}
              </span>
            </div>
            <div className="calc-metric">
              <span className="calc-metric-val">{formatRON(result.savings25yrRON)}</span>
              <span className="calc-metric-label">economie pe 25 ani</span>
            </div>
          </div>

          {propertyType === 'rezidential' && (
            <div className="calc-grant-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              Grant AFM de <strong>20.000 RON</strong> inclus estimativ (program estimat toamna 2026)
            </div>
          )}

          <div className="calc-co2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17 8C8 10 5.9 16.17 3.82 19.07L5.71 20l1-2h1c.27 0 .54-.01.8-.04C9.66 17.95 12 16 12 16s.25.97 1.07 2.5c.46-.27.89-.57 1.28-.9.39-1.05.65-2.16.65-3.35 0-2.78-1.3-5.25-3.32-6.86A11.4 11.4 0 0017 8z"/>
            </svg>
            Reduci emisiile cu ~<strong>{result.co2OffsetKgPerYear} kg CO₂/an</strong>
          </div>

          <a href="/cerere-oferta" className="calc-cta">
            Vreau ofertă personalizată gratuită
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
