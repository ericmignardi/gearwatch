import { z } from "zod";

export const WatchlistSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  query: z.string().min(3),
  filters: z.record(z.any()).optional().nullable(),
  createdAt: z.date().optional(),
});

export type WatchlistInput = z.infer<typeof WatchlistSchema>;
