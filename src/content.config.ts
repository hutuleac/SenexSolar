import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/case-studies' }),
  schema: z.object({
    name: z.string(),
    location: z.string(),
    systemKwp: z.number(),
    panels: z.number(),
    investitieRON: z.number(),
    grantRON: z.number(),
    economieAnRON: z.number(),
    recuperareAni: z.number(),
    economie25aniRON: z.number(),
    quote: z.string(),
    author: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = { blog, caseStudies };
