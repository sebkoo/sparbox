import { z } from "zod";

export const SESSION_SCHEMA_VERSION = 1;

export const TurnSchema = z.object({
  id: z.string().min(1),
  // Turns order by index, never by a timestamp: same-millisecond writes are unordered and the
  // device clock moves backwards on NTP correction and sleep.
  index: z.number().int().nonnegative(),
  question: z.string().min(1),
  answer: z.string().nullable(),
});

export type Turn = z.infer<typeof TurnSchema>;

export const InterviewSessionSchema = z.object({
  id: z.string().min(1),
  // Ships before the first write rather than with it: a version cannot be added to records
  // already on disk, so the alternative is a migration instead of a field.
  schemaVersion: z.literal(SESSION_SCHEMA_VERSION),
  jobDescription: z.string().min(1),
  turns: z.array(TurnSchema),
});

export type InterviewSession = z.infer<typeof InterviewSessionSchema>;
