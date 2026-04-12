import { z } from "zod";

export const ConfSessionEligibleHostOptionSchema = z.object({
  ssoId: z.string(),
  email: z.email(),
});
export type ConfSessionEligibleHostOption = z.infer<typeof ConfSessionEligibleHostOptionSchema>;

export const ConfSessionCoHostOptionSchema = z.object({
  ssoId: z.string(),
  email: z.email(),
});
export type ConfSessionCoHostOption = z.infer<typeof ConfSessionCoHostOptionSchema>;
