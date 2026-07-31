import { describe, expect, it } from "@jest/globals";
import { z } from "zod";

import { parserFor } from "@/domain/validation";

describe("parserFor", () => {
  const named = z.object({ name: z.string().min(1) });

  it("maps a valid input to ok with the parsed value", () => {
    const result = parserFor(named)({ name: "sparbox" });

    expect(result).toEqual({ ok: true, value: { name: "sparbox" } });
  });

  it("returns failure as data rather than throwing", () => {
    const parse = parserFor(named);

    expect(() => parse({ name: "" })).not.toThrow();
    expect(parse({ name: "" }).ok).toBe(false);
  });

  it("prefixes an issue with the path that produced it", () => {
    const result = parserFor(named)({ name: "" });
    const raw = named.safeParse({ name: "" });

    if (result.ok || raw.success) {
      throw new Error("expected both parses to fail");
    }
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]).toBe(`name: ${raw.error.issues[0]?.message}`);
  });

  it("leaves a root-level issue unprefixed", () => {
    const result = parserFor(z.string())(42);
    const raw = z.string().safeParse(42);

    if (result.ok || raw.success) {
      throw new Error("expected both parses to fail");
    }
    expect(result.issues[0]).toBe(raw.error.issues[0]?.message);
  });
});
