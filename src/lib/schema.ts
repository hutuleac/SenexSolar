import { SITE } from './constants';

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ElectricalContractor'],
    name: SITE.name,
    description:
      'Instalare panouri fotovoltaice pentru case și firme din Iași și Moldova. Partener oficial program Casa Verde AFM. Sisteme rezidențiale și comerciale, garanție 25 ani.',
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: '2019',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 12 },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Șoseaua Arcu Nr. 6B',
      addressLocality: 'Iași',
      postalCode: '700259',
      addressCountry: 'RO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 47.1585,
      longitude: 27.6014,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Iași', containedInPlace: { '@type': 'Country', name: 'Romania' } },
      { '@type': 'AdministrativeArea', name: 'Vaslui', containedInPlace: { '@type': 'Country', name: 'Romania' } },
      { '@type': 'AdministrativeArea', name: 'Neamț', containedInPlace: { '@type': 'Country', name: 'Romania' } },
      { '@type': 'AdministrativeArea', name: 'Bacău', containedInPlace: { '@type': 'Country', name: 'Romania' } },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sisteme fotovoltaice',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sistem fotovoltaic rezidențial', description: 'Sisteme 3–15 kWp pentru case, inclusiv dosar AFM' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sistem fotovoltaic comercial', description: 'Sisteme 10–500 kWp pentru firme și hale industriale' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Asistență grant Casa Verde AFM', description: 'Pregătire și depunere dosar AFM, grant nerambursabil 20.000 RON' } },
      ],
    },
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
    },
    sameAs: [
      'https://www.facebook.com/senexsolarpower',
    ],
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/logo-dark.svg`,
      width: 160,
      height: 36,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      contactType: 'customer service',
      areaServed: 'RO',
      availableLanguage: 'Romanian',
    },
    sameAs: [
      'https://www.facebook.com/senexsolarpower',
    ],
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function getFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getBlogPostSchema(post: {
  title: string;
  description: string;
  publishDate: Date;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishDate.toISOString(),
    dateModified: post.publishDate.toISOString(),
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/logo-dark.svg` },
    },
    url: post.url,
    inLanguage: 'ro',
    isPartOf: { '@type': 'Blog', name: `Blog — ${SITE.name}`, url: `${SITE.url}/blog` },
  };
}
