import { z } from "zod";

export const RubricCriterionSchema = z.object({
  id: z.string().min(1),
  description: z.string().min(1),
  weight: z.number().min(0).max(1),
});

export type RubricCriterion = z.infer<typeof RubricCriterionSchema>;

export const RubricSchema = z.object({
  id: z.string().min(1),
  // A string rather than an enum: the competency allowlist is content, and content owes a
  // fixture. It arrives with the planner that constrains against it.
  competency: z.string().min(1),
  criteria: z.array(RubricCriterionSchema).min(1),
});

export type Rubric = z.infer<typeof RubricSchema>;

export const ScoreSchema = z.object({
  id: z.string().min(1),
  rubricId: z.string().min(1),
  criterionId: z.string().min(1),
  // The turn that evidenced this score — the weakness report renders the answer behind each
  // ranked item, so the reference is stored rather than recomputed.
  turnId: z.string().min(1),
  value: z.number().min(0).max(1),
  rationale: z.string().min(1),
});

export type Score = z.infer<typeof ScoreSchema>;
