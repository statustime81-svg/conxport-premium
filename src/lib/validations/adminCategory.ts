import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z.string().trim().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/).max(120),
  description: z.string().trim().max(1200),
  parent_id: z.string().uuid().nullable(),
  is_published: z.boolean(),
  image_url: z.string().url().refine((url) => url.startsWith('https://'), 'HTTPS image URL required').nullable().optional(),
});
export type CategoryInput = z.infer<typeof categorySchema>;
