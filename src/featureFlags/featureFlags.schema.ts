import { z } from "zod";

export const FeatureFlagSchema = z.object({
  key: z.string(),
  enabled: z.boolean(),
});
export type FeatureFlag = z.infer<typeof FeatureFlagSchema>;

export const FeatureFlagListSchema = z.array(FeatureFlagSchema);
export type FeatureFlagList = z.infer<typeof FeatureFlagListSchema>;

// GET /feature-flags/:key params.
export const FeatureFlagKeyParamsSchema = z.object({
  key: z.string().min(1),
});
export type FeatureFlagKeyParams = z.infer<typeof FeatureFlagKeyParamsSchema>;
