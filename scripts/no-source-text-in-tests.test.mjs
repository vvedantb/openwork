import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkTestSource, MESSAGE } from "./no-source-text-in-tests.mjs";

const testFile = "thing.test.ts";

describe("checkTestSource", () => {
  it("flags readFileSync of a .ts source path", () => {
    const source =
      'const s = readFileSync(join(dir, "convex/mcp/tools.ts"), "utf8");\n';
    const violations = checkTestSource(testFile, source);
    assert.equal(violations.length, 1);
    assert.equal(violations[0]?.message, MESSAGE);
  });

  it("flags readSource of a .tsx file", () => {
    const violations = checkTestSource(
      testFile,
      'const s = readSource("ThemeContext.tsx");\n',
    );
    assert.equal(violations.length, 1);
  });

  it("flags read() of a .css path in a template literal", () => {
    const violations = checkTestSource(
      testFile,
      "expect(read(`${dir}/app.css`)).toContain('x');\n",
    );
    assert.equal(violations.length, 1);
  });

  it("flags source() of an html file", () => {
    const violations = checkTestSource(testFile, 'source("../index.html");\n');
    assert.equal(violations.length, 1);
  });

  it("flags read of markdown", () => {
    const violations = checkTestSource(
      testFile,
      'readFileSync("README.md", "utf8");\n',
    );
    assert.equal(violations.length, 1);
  });

  it("allows path strings used as plain test data", () => {
    const violations = checkTestSource(
      testFile,
      'expect(toPath("src/app.tsx")).toBe("app");\n',
    );
    assert.equal(violations.length, 0);
  });

  it("allows importing modules", () => {
    const violations = checkTestSource(
      testFile,
      'import { a } from "./a.ts";\n',
    );
    assert.equal(violations.length, 0);
  });

  it("allows reading fixture.json", () => {
    const violations = checkTestSource(
      testFile,
      'readFileSync(join(dir, "fixture.json"), "utf8");\n',
    );
    assert.equal(violations.length, 0);
  });

  it("ignores non-test files", () => {
    const violations = checkTestSource(
      "helper.ts",
      'readSource("convex/mcp/tools.ts");\n',
    );
    assert.equal(violations.length, 0);
  });
});
