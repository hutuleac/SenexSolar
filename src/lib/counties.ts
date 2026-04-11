export interface County {
  name: string;
  peakSunHours: number;
}

export const COUNTIES: Record<string, County> = {
  AB: { name: 'Alba', peakSunHours: 4.3 },
  AR: { name: 'Arad', peakSunHours: 4.4 },
  AG: { name: 'Argeș', peakSunHours: 4.5 },
  BC: { name: 'Bacău', peakSunHours: 4.3 },
  BH: { name: 'Bihor', peakSunHours: 4.2 },
  BN: { name: 'Bistrița-Năsăud', peakSunHours: 4.1 },
  BT: { name: 'Botoșani', peakSunHours: 4.2 },
  BV: { name: 'Brașov', peakSunHours: 4.3 },
  BR: { name: 'Brăila', peakSunHours: 4.6 },
  B:  { name: 'București', peakSunHours: 4.7 },
  BZ: { name: 'Buzău', peakSunHours: 4.5 },
  CS: { name: 'Caraș-Severin', peakSunHours: 4.4 },
  CL: { name: 'Călărași', peakSunHours: 4.7 },
  CJ: { name: 'Cluj', peakSunHours: 4.2 },
  CT: { name: 'Constanța', peakSunHours: 4.8 },
  CV: { name: 'Covasna', peakSunHours: 4.2 },
  DB: { name: 'Dâmbovița', peakSunHours: 4.5 },
  DJ: { name: 'Dolj', peakSunHours: 4.6 },
  GL: { name: 'Galați', peakSunHours: 4.6 },
  GR: { name: 'Giurgiu', peakSunHours: 4.7 },
  GJ: { name: 'Gorj', peakSunHours: 4.3 },
  HR: { name: 'Harghita', peakSunHours: 4.1 },
  HD: { name: 'Hunedoara', peakSunHours: 4.2 },
  IL: { name: 'Ialomița', peakSunHours: 4.7 },
  IS: { name: 'Iași', peakSunHours: 4.5 },
  IF: { name: 'Ilfov', peakSunHours: 4.7 },
  MM: { name: 'Maramureș', peakSunHours: 4.0 },
  MH: { name: 'Mehedinți', peakSunHours: 4.5 },
  MS: { name: 'Mureș', peakSunHours: 4.2 },
  NT: { name: 'Neamț', peakSunHours: 4.3 },
  OT: { name: 'Olt', peakSunHours: 4.6 },
  PH: { name: 'Prahova', peakSunHours: 4.5 },
  SM: { name: 'Satu Mare', peakSunHours: 4.1 },
  SJ: { name: 'Sălaj', peakSunHours: 4.1 },
  SB: { name: 'Sibiu', peakSunHours: 4.3 },
  SV: { name: 'Suceava', peakSunHours: 4.1 },
  TR: { name: 'Teleorman', peakSunHours: 4.7 },
  TM: { name: 'Timiș', peakSunHours: 4.4 },
  TL: { name: 'Tulcea', peakSunHours: 4.8 },
  VS: { name: 'Vaslui', peakSunHours: 4.4 },
  VL: { name: 'Vâlcea', peakSunHours: 4.4 },
  VN: { name: 'Vrancea', peakSunHours: 4.4 },
};

/** Sorted alphabetically for dropdown display */
export const COUNTIES_SORTED = Object.entries(COUNTIES)
  .map(([code, county]) => ({ code, ...county }))
  .sort((a, b) => a.name.localeCompare(b.name, 'ro'));
