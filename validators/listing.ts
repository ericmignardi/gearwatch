import z from 'zod';

export const ConditionSchema = z.enum([
  'NEW',
  'EXCELLENT',
  'GOOD',
  'FAIR',
  'POOR',
]);

export const SourceSchema = z.enum([
  'REVERB',
  'EBAY',
  'GUITAR_CENTER',
  'SWEETWATER',
  'KIJIJI',
  'FACEBOOK_MARKETPLACE',
]);

export const ListingSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3).max(255),
  brand: z.string().min(1),
  model: z.string().min(1),
  condition: ConditionSchema,
  price: z.number().positive(),
  currency: z.string().default('USD'),
  source: SourceSchema,
  url: z.string().url(),
  imageUrl: z.string().url().nullable().optional(),
  listedAt: z.date().optional(),
  scrapedAt: z.date().optional(),
  isActive: z.boolean().default(true),
});

export type ListingInput = z.infer<typeof ListingSchema>;
