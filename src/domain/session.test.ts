import { describe, expect, it } from "@jest/globals";

import {
  InterviewSessionSchema,
  SESSION_SCHEMA_VERSION,
  TurnSchema,
  type InterviewSession,
  type Turn,
} from "@/domain/session";
import { parserFor } from "@/domain/validation";

const answered: Turn = {
  id: "t1",
  index: 0,
  question: "How would you test a reducer that drives an interview loop?",
  answer: "Fold a fixed event log and assert the resulting state.",
};

const unanswered: Turn = {
  id: "t2",
  index: 1,
  question: "Describe a native module you shipped end to end.",
  answer: null,
};

const session: InterviewSession = {
  id: "s1",
  schemaVersion: SESSION_SCHEMA_VERSION,
  jobDescription:
    "Senior React Native engineer. TypeScript, CI, native modules.",
  turns: [answered, unanswered],
};

describe("TurnSchema", () => {
  it("round-trips an answered turn unchanged", () => {
    expect(parserFor(TurnSchema)(answered)).toEqual({
      ok: true,
      value: answered,
    });
  });

  it("accepts a turn that has been asked but not answered", () => {
    expect(parserFor(TurnSchema)(unanswered)).toEqual({
      ok: true,
      value: unanswered,
    });
  });

  it("rejects an empty question", () => {
    const result = parserFor(TurnSchema)({ ...answered, question: "" });

    if (result.ok) {
      throw new Error("expected an empty question to be rejected");
    }
    expect(result.issues.join("\n")).toMatch(/^question: /);
  });
});

describe("InterviewSessionSchema", () => {
  it("round-trips a well-formed session unchanged", () => {
    expect(parserFor(InterviewSessionSchema)(session)).toEqual({
      ok: true,
      value: session,
    });
  });

  it("rejects a schema version it was not written for", () => {
    const result = parserFor(InterviewSessionSchema)({
      ...session,
      schemaVersion: SESSION_SCHEMA_VERSION + 1,
    });

    if (result.ok) {
      throw new Error("expected a future schema version to be rejected");
    }
    expect(result.issues.join("\n")).toMatch(/^schemaVersion: /);
  });

  it("names the path of a failure nested inside turns", () => {
    const result = parserFor(InterviewSessionSchema)({
      ...session,
      turns: [{ ...answered, question: "" }],
    });

    if (result.ok) {
      throw new Error("expected an empty nested question to be rejected");
    }
    expect(result.issues[0]).toMatch(/^turns\.0\.question: /);
  });
});
