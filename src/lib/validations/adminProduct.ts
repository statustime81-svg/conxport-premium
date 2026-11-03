import { z } from 'zod';
export const adminProductSchema = z.object({
  name: z.string().trim().min(2).max(160),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and hyphens').max(160),
  sku: z.string().trim().min(2).max(80),
  summary: z.string().trim().max(600),
  description: z.string().trim().max(10000),
  primary_category_id: z.string().uuid().nullable(),
  is_published: z.boolean(),
});
export type AdminProductInput = z.infer<typeof adminProductSchema>;
