import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    tier: z.enum(['home', 'philosophy', 'tier-0', 'tier-1', 'tier-2']),
    cta: z
      .object({
        label: z.string(),
        href: z.string(),
        note: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { pages };
