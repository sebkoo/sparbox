import type { ZodType } from "zod";

export type ParseResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly issues: readonly string[] };

export type Parser<T> = (input: unknown) => ParseResult<T>;

// The seam that lets src/agent/ validate without naming the validator: it receives a
// Parser<T>, so the restricted-import rule on that layer can forbid zod outright.
export function parserFor<T>(schema: ZodType<T>): Parser<T> {
  return (input) => {
    const result = schema.safeParse(input);
    if (result.success) {
      return { ok: true, value: result.data };
    }
    return {
      ok: false,
      issues: result.error.issues.map((issue) =>
        issue.path.length > 0
          ? `${issue.path.join(".")}: ${issue.message}`
          : issue.message,
      ),
    };
  };
}
