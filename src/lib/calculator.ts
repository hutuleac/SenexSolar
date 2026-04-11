import { COUNTIES } from './counties';

// ── Constants ────────────────────────────────────────────────────────────────
const TARIFF_RON_PER_KWH = 0.85;       // Average Romanian household tariff
const EUR_TO_RON = 5.0;                 // Exchange rate
const COST_PER_KWP_RESIDENTIAL = 1100; // EUR/kWp installed, residential
const COST_PER_KWP_COMMERCIAL = 900;   // EUR/kWp installed, commercial
const AFM_SUBSIDY_RON = 20_000;        // Casa Verde grant, residential only
const SYSTEM_EFFICIENCY = 0.80;        // Inverter + cable losses
const CO2_KG_PER_KWH = 0.44;          // Romanian grid emission factor

// ── Types ────────────────────────────────────────────────────────────────────
export type PropertyType = 'rezidential' | 'comercial';

export interface CalcInput {
  monthlyBillRON: number;
  propertyType: PropertyType;
  countyCode: string;
}

export interface CalcResult {
  systemKwp: number;
  annualProductionKwh: number;
  annualSavingsRON: number;
  systemCostRON: number;        // After AFM subsidy (residential)
  systemCostBeforeSubsidyRON: number;
  subsidyRON: number;
  paybackYears: number;
  savings25yrRON: number;
  co2OffsetKgPerYear: number;
  monthlyBillAfterRON: number;
}

// ── Helper ───────────────────────────────────────────────────────────────────
function roundToHalf(n: number): number {
  return Math.round(n * 2) / 2;
}

// ── Main calculation ─────────────────────────────────────────────────────────
export function calculate(input: CalcInput): CalcResult {
  const { monthlyBillRON, propertyType, countyCode } = input;

  // Step 1: Monthly & annual consumption
  const monthlyKwh = monthlyBillRON / TARIFF_RON_PER_KWH;
  const annualKwh = monthlyKwh * 12;

  // Step 2: County irradiance (fallback to Iași)
  const county = COUNTIES[countyCode] ?? COUNTIES['IS'];
  const peakSunHours = county.peakSunHours;

  // Step 3: Required system size
  const rawKwp = annualKwh / (peakSunHours * 365 * SYSTEM_EFFICIENCY);
  const systemKwp = Math.max(1.5, roundToHalf(rawKwp));

  // Step 4: Annual production
  const annualProductionKwh = systemKwp * peakSunHours * 365 * SYSTEM_EFFICIENCY;

  // Step 5: Annual savings (cap at 100% of consumption)
  const coveredKwh = Math.min(annualProductionKwh, annualKwh);
  const annualSavingsRON = coveredKwh * TARIFF_RON_PER_KWH;

  // Step 6: System cost
  const costPerKwp =
    propertyType === 'comercial' ? COST_PER_KWP_COMMERCIAL : COST_PER_KWP_RESIDENTIAL;
  const systemCostBeforeSubsidyRON = systemKwp * costPerKwp * EUR_TO_RON;
  const subsidyRON = propertyType === 'rezidential' ? AFM_SUBSIDY_RON : 0;
  const systemCostRON = Math.max(0, systemCostBeforeSubsidyRON - subsidyRON);

  // Step 7: Payback period
  const paybackYears = annualSavingsRON > 0 ? systemCostRON / annualSavingsRON : 99;

  // Step 8: 25-year total net savings
  const savings25yrRON = annualSavingsRON * 25 - systemCostRON;

  // Step 9: Estimated monthly bill after
  const remainingKwh = Math.max(0, annualKwh - annualProductionKwh);
  const monthlyBillAfterRON = (remainingKwh / 12) * TARIFF_RON_PER_KWH + 15; // +15 RON grid fee

  // Step 10: CO2 offset
  const co2OffsetKgPerYear = annualProductionKwh * CO2_KG_PER_KWH;

  return {
    systemKwp,
    annualProductionKwh: Math.round(annualProductionKwh),
    annualSavingsRON: Math.round(annualSavingsRON),
    systemCostRON: Math.round(systemCostRON),
    systemCostBeforeSubsidyRON: Math.round(systemCostBeforeSubsidyRON),
    subsidyRON,
    paybackYears: Math.round(paybackYears * 10) / 10,
    savings25yrRON: Math.round(savings25yrRON),
    co2OffsetKgPerYear: Math.round(co2OffsetKgPerYear),
    monthlyBillAfterRON: Math.round(monthlyBillAfterRON),
  };
}

// ── Quick sanity check (run in Node to verify) ───────────────────────────────
// calculate({ monthlyBillRON: 300, propertyType: 'rezidential', countyCode: 'IS' })
// Expected: ~5 kWp, ~3400 RON/yr savings, ~6 yr payback
