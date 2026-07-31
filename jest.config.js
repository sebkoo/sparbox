/** @type {import('jest').Config} */
module.exports = {
  projects: [
    {
      // The pure layers run with no React Native transform and no jest-expo preset, so an
      // accidental react-native import fails to resolve instead of passing quietly. That is
      // what makes "node-testable" a property the runner enforces rather than a note.
      displayName: "node",
      testEnvironment: "node",
      // Selected by extension, not by listing layer directories: a directory listed before it
      // exists can be typo'd silently, and one not listed means a test file that never runs.
      // Component tests are .tsx and land in their own project at their first commit.
      testMatch: ["<rootDir>/src/**/*.test.ts"],
      transform: {
        // diagnostics off because tsconfig.json already includes **/*.ts, so npm run typecheck
        // reads these files — first in the pre-commit hook, and again in CI.
        "^.+\\.ts$": ["ts-jest", { diagnostics: false }],
      },
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    },
  ],
};
