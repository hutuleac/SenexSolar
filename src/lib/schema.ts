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

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getServiceSchema(type: 'rezidential' | 'comercial') {
  const isRez = type === 'rezidential';
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isRez
      ? 'Instalare sistem fotovoltaic rezidențial'
      : 'Instalare sistem fotovoltaic comercial',
    description: isRez
      ? 'Sisteme fotovoltaice 3–15 kWp pentru case și vile din Iași și Moldova. Include instalare, racordare ANRE și asistență dosar AFM.'
      : 'Sisteme fotovoltaice 10–500 kWp pentru firme, hale și spații comerciale din Iași și Moldova. ROI 3–5 ani.',
    provider: {
      '@type': 'LocalBusiness',
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Iași' },
      { '@type': 'AdministrativeArea', name: 'Suceava' },
      { '@type': 'AdministrativeArea', name: 'Botoșani' },
      { '@type': 'AdministrativeArea', name: 'Bacău' },
      { '@type': 'AdministrativeArea', name: 'Neamț' },
      { '@type': 'AdministrativeArea', name: 'Vaslui' },
    ],
    serviceType: isRez ? 'Solar Panel Installation — Residential' : 'Solar Panel Installation — Commercial',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      areaServed: 'RO',
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
