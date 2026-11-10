import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { checkTestSource, scanRepo } from "./no-source-text-in-tests.mjs";

const check = (code) => checkTestSource("a.test.ts", code);

test("flags reads of source, CSS, HTML and markdown", () => {
  for (const file of ["x.ts", "x.tsx", "x.css", "x.html", "x.md", "x.mjs"]) {
    const found = check(`const s = readFileSync("src/${file}", "utf8");`);
    assert.equal(found.length, 1, file);
    assert.equal(found[0].line, 1);
  }
});

test("flags other reader names and path helpers", () => {
  assert.equal(check(`fs.readFile(join(root, "a.css"))`).length, 1);
  assert.equal(check(`const t = readSource("a.tsx");`).length, 1);
  assert.equal(check(`sourceOf(new URL("./a.ts", import.meta.url))`).length, 1);
});

test("reports the line of the call", () => {
  const found = check(`import x from "y";\n\nreadFileSync("a.ts");`);
  assert.equal(found[0].line, 3);
});

test("allows plain path strings as test data", () => {
  assert.deepEqual(check(`const p = "src/app.tsx"; parse(p);`), []);
});

test("allows imports of real code", () => {
  assert.deepEqual(check(`import { run } from "../src/run.ts";`), []);
});

test("allows reading fixture.json", () => {
  assert.deepEqual(check(`readFileSync("fixtures/fixture.json", "utf8")`), []);
});

test("ignores matches inside strings and comments", () => {
  assert.deepEqual(check(`const s = 'readFileSync("a.ts")';`), []);
  assert.deepEqual(check(`// readFileSync("a.ts")`), []);
  assert.deepEqual(check(`/* readFileSync("a.ts") */`), []);
});

test("ignores non-test files", () => {
  assert.deepEqual(
    checkTestSource("helper.ts", `readFileSync("a.ts")`),
    [],
  );
});

test("scanRepo finds violations in test files and skips node_modules", () => {
  const root = mkdtempSync(join(tmpdir(), "no-source-text-"));
  try {
    mkdirSync(join(root, "pkg"));
    mkdirSync(join(root, "node_modules"));
    writeFileSync(join(root, "pkg", "bad.test.mjs"), `readFileSync("a.css");`);
    writeFileSync(join(root, "pkg", "ok.test.mjs"), `readFileSync("a.json");`);
    writeFileSync(join(root, "node_modules", "dep.test.js"), `read("a.ts");`);

    const found = scanRepo(root);
    assert.equal(found.length, 1);
    assert.equal(found[0].file, join("pkg", "bad.test.mjs"));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
