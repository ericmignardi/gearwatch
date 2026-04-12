import { z } from "zod";
import { ConditionSchema } from "./listing";

export const PriceAlertSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  query: z.string().min(3),
  targetPrice: z.number().positive(),
  condition: ConditionSchema,
  sources: z.array(z.string()).optional().nullable(),
  isActive: z.boolean().default(true),
  triggeredAt: z.date().optional().nullable(),
});

export type PriceAlertInput = z.infer<typeof PriceAlertSchema>;
