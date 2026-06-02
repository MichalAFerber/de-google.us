import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
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
