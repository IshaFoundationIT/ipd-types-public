import { z } from "zod";

export const ConfSessionEligibleHostOptionSchema = z.object({
  ssoId: z.string(),
  // TODO(contract-tighten): backend validator is still t.String(); switch to z.email() after it is tightened.
  email: z.string(),
});
export type ConfSessionEligibleHostOption = z.infer<typeof ConfSessionEligibleHostOptionSchema>;

export const ConfSessionCoHostOptionSchema = z.object({
  ssoId: z.string(),
  // TODO(contract-tighten): backend validator is still t.String(); switch to z.email() after it is tightened.
  email: z.string(),
});
export type ConfSessionCoHostOption = z.infer<typeof ConfSessionCoHostOptionSchema>;
