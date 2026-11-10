#!/usr/bin/env node
// Lint rule: test files must not read source, CSS, HTML or markdown text.
// A test that greps a file proves the text exists, not that the code works.
// Call the real code instead (import it, or render it).
//
// CLI: `node scripts/no-source-text-in-tests.mjs` from the repo root.
// Exits 1 when any test file breaks the rule.

import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const TEST_FILE = /\.test\.(?:ts|tsx|js|jsx|mjs|cjs)$/;
const BANNED_PATH = /\.(?:ts|tsx|js|jsx|mjs|cjs|css|html|md)$/i;
const READERS = new Set([
  "readFileSync",
  "readFile",
  "read",
  "readSource",
  "source",
  "sourceOf",
]);
const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "coverage",
  ".next",
  ".turbo",
  ".vercel",
  ".agents",
]);

/**
 * Split source into identifier, punctuation and string tokens.
 * Comments are dropped. Strings stay whole, so text inside a string
 * or comment never looks like a call.
 */
function tokenize(text) {
  const tokens = [];
  let line = 1;
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    const next = text[i + 1];
    if (ch === "\n") {
      line++;
      i++;
    } else if (/\s/.test(ch)) {
      i++;
    } else if (ch === "/" && next === "/") {
      while (i < text.length && text[i] !== "\n") i++;
    } else if (ch === "/" && next === "*") {
      const end = text.indexOf("*/", i + 2);
      const stop = end === -1 ? text.length : end + 2;
      for (; i < stop; i++) if (text[i] === "\n") line++;
    } else if (ch === '"' || ch === "'" || ch === "`") {
      const start = line;
      let value = "";
      i++;
      while (i < text.length && text[i] !== ch) {
        if (text[i] === "\\") {
          value += text[i + 1] ?? "";
          i += 2;
          continue;
        }
        if (text[i] === "\n") line++;
        value += text[i++];
      }
      i++;
      tokens.push({ type: "str", value, line: start });
    } else if (/[A-Za-z_$]/.test(ch)) {
      let value = "";
      while (i < text.length && /[\w$]/.test(text[i])) value += text[i++];
      tokens.push({ type: "id", value, line });
    } else {
      tokens.push({ type: "punct", value: ch, line });
      i++;
    }
  }
  return tokens;
}

/** Return violations for one file. Non-test files return an empty list. */
export function checkTestSource(filename, text) {
  if (!TEST_FILE.test(filename)) return [];
  const tokens = tokenize(text);
  const violations = [];
  for (let i = 0; i < tokens.length - 1; i++) {
    const token = tokens[i];
    if (token.type !== "id" || !READERS.has(token.value)) continue;
    if (tokens[i + 1].value !== "(") continue;

    // Inspect the first argument only: stop at a top-level comma.
    let depth = 0;
    for (let j = i + 1; j < tokens.length; j++) {
      const t = tokens[j];
      if (t.type === "punct") {
        if ("([{".includes(t.value)) depth++;
        else if (")]}".includes(t.value)) depth--;
        else if (t.value === "," && depth === 1) break;
        if (depth === 0) break;
      } else if (t.type === "str" && BANNED_PATH.test(t.value)) {
        violations.push({
          file: filename,
          line: token.line,
          message: `${token.value}() reads "${t.value}". Call the real code instead of reading its text.`,
        });
        break;
      }
    }
  }
  return violations;
}

/** Scan every test file under root. */
export function scanRepo(root) {
  const violations = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) walk(path);
      } else if (TEST_FILE.test(entry.name)) {
        const name = relative(root, path);
        violations.push(...checkTestSource(name, readFileSync(path, "utf8")));
      }
    }
  };
  walk(root);
  return violations;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const violations = scanRepo(process.cwd());
  for (const v of violations) console.error(`${v.file}:${v.line}: ${v.message}`);
  if (violations.length > 0) {
    console.error(`\n${violations.length} violation(s). See "Tests:" in CLAUDE.md.`);
    process.exit(1);
  }
  console.log("no-source-text-in-tests: ok");
}
