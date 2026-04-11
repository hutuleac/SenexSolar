export const SITE = {
  name: 'Senex Solar Power',
  tagline: 'Energia ta, produsă de tine.',
  phone: '0754 457 239',
  phoneHref: 'tel:+40754457239',
  whatsapp: 'https://wa.me/40754457239',
  email: 'contact@senexsolarpower.ro',
  address: 'Șoseaua Arcu Nr. 6B, Iași 700259, România',
  addressShort: 'Iași, România',
  hours: 'Luni–Vineri 8:00–18:00, Sâmbătă 9:00–14:00',
  url: 'https://senexsolar.pages.dev',
  locale: 'ro',
  og: {
    image: '/og-image.webp',
    width: 1200,
    height: 630,
  },
} as const;

export const STATS = {
  systems: 150,
  rating: 4.9,
  warrantyYears: 25,
  grantRON: 20000,
} as const;

export const NAV_LINKS = [
  { label: 'Rezidențial', href: '/rezidential' },
  { label: 'Comercial', href: '/comercial' },
  { label: 'Subvenții AFM', href: '/subventii-casa-verde' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;
