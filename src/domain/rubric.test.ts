import { describe, expect, it } from "@jest/globals";

import {
  RubricSchema,
  ScoreSchema,
  type Rubric,
  type Score,
} from "@/domain/rubric";
import { parserFor } from "@/domain/validation";

const rubric: Rubric = {
  id: "r1",
  competency: "state-management",
  criteria: [
    {
      id: "c1",
      description: "Names the ordering key and why a timestamp is not one.",
      weight: 0.6,
    },
    {
      id: "c2",
      description: "Explains how the state is reconstructed after a restart.",
      weight: 0.4,
    },
  ],
};

const score: Score = {
  id: "sc1",
  rubricId: "r1",
  criterionId: "c1",
  turnId: "t1",
  value: 0.75,
  rationale: "Named the sequence key, did not address clock movement.",
};

describe("RubricSchema", () => {
  it("round-trips a well-formed rubric unchanged", () => {
    expect(parserFor(RubricSchema)(rubric)).toEqual({
      ok: true,
      value: rubric,
    });
  });

  it("rejects a rubric with no criteria, which would score nothing", () => {
    const result = parserFor(RubricSchema)({ ...rubric, criteria: [] });

    if (result.ok) {
      throw new Error("expected an empty criteria list to be rejected");
    }
    expect(result.issues.join("\n")).toMatch(/^criteria: /);
  });
});

describe("ScoreSchema", () => {
  it("round-trips a well-formed score unchanged", () => {
    expect(parserFor(ScoreSchema)(score)).toEqual({ ok: true, value: score });
  });

  it("rejects a value outside the normalised range", () => {
    const result = parserFor(ScoreSchema)({ ...score, value: 1.5 });

    if (result.ok) {
      throw new Error("expected an out-of-range value to be rejected");
    }
    expect(result.issues.join("\n")).toMatch(/^value: /);
  });
});
