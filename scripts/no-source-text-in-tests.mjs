/**
 * Ban tests that read repo source/CSS/markdown as text.
 *
 * Mirrors eva's `eva/no-source-text-in-tests` rule: a regex over source
 * breaks on every refactor and passes on real logic bugs. Import the code
 * and assert on what it returns or does. If the rule is about code shape,
 * write a lint rule instead.
 *
 * Usage:
 *   node scripts/no-source-text-in-tests.mjs
 *   import { checkTestSource, scanRepo } from "./no-source-text-in-tests.mjs"
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const MESSAGE =
  "BANNED: tests that read source files as text. A regex over source breaks " +
  "on every refactor and passes on real logic bugs. Import the code and assert " +
  "on what it returns or does. If the rule is about code shape, write a lint " +
  "rule instead. See CLAUDE.md (Tests).";

const TEST_FILE = /\.test\.(ts|tsx|js|jsx|mjs|cjs)$/;
/** Path or file name ending in a source/CSS/markdown extension. */
const SOURCE_PATH = /[^/.][^/]*\.(?:ts|tsx|js|jsx|mjs|cjs|css|html|md)$/;
/** File reads, plus helpers that wrap them (`read`, `readSource`, `sourceOf`). */
const READ_CALLEE = /^(?:readFile(?:Sync)?|readSource|sourceOf|read|source)$/;

/**
 * Return violation objects for a single test file's source text.
 * Plain path strings used as test data (not passed to a read call) are allowed.
 *
 * @param {string} filename
 * @param {string} source
 * @returns {{ message: string, index: number, snippet: string }[]}
 */
export function checkTestSource(filename, source) {
  const normalized = filename.replaceAll("\\", "/");
  if (!TEST_FILE.test(normalized)) return [];

  /** @type {{ message: string, index: number, snippet: string }[]} */
  const violations = [];

  for (const call of findReadCalls(source)) {
    const args = source.slice(call.openIndex + 1, call.closeIndex);
    for (const stringMatch of args.matchAll(
      /(["'])((?:\\.|(?!\1).)*)\1|`((?:\\`|[^`])*)`/g,
    )) {
      const value = stringMatch[2] ?? stringMatch[3] ?? "";
      if (!SOURCE_PATH.test(value)) continue;
      const index = call.openIndex + 1 + (stringMatch.index ?? 0);
      violations.push({
        message: MESSAGE,
        index,
        snippet: source.slice(index, index + Math.min(value.length + 2, 80)),
      });
    }
  }

  return violations;
}

/**
 * Find read-like call sites outside strings and comments.
 * @param {string} source
 * @returns {{ callee: string, openIndex: number, closeIndex: number }[]}
 */
function findReadCalls(source) {
  /** @type {{ callee: string, openIndex: number, closeIndex: number }[]} */
  const calls = [];
  let i = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let inLineComment = false;
  let inBlockComment = false;

  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];

    if (inLineComment) {
      if (ch === "\n") inLineComment = false;
      i++;
      continue;
    }
    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        i += 2;
        continue;
      }
      i++;
      continue;
    }
    if (inSingle) {
      if (ch === "\\") {
        i += 2;
        continue;
      }
      if (ch === "'") inSingle = false;
      i++;
      continue;
    }
    if (inDouble) {
      if (ch === "\\") {
        i += 2;
        continue;
      }
      if (ch === '"') inDouble = false;
      i++;
      continue;
    }
    if (inTemplate) {
      if (ch === "\\") {
        i += 2;
        continue;
      }
      if (ch === "`") inTemplate = false;
      i++;
      continue;
    }
    if (ch === "/" && next === "/") {
      inLineComment = true;
      i += 2;
      continue;
    }
    if (ch === "/" && next === "*") {
      inBlockComment = true;
      i += 2;
      continue;
    }
    if (ch === "'") {
      inSingle = true;
      i++;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      i++;
      continue;
    }
    if (ch === "`") {
      inTemplate = true;
      i++;
      continue;
    }

    const ident = matchIdent(source, i);
    if (ident && READ_CALLEE.test(ident.name)) {
      const prev = source[i - 1];
      // Skip property access like fs.readFileSync — still a read call; allow.
      // Skip identifiers that are part of a larger name (already handled by matchIdent).
      let j = ident.end;
      while (j < source.length && /\s/.test(source[j] ?? "")) j++;
      if (source[j] === "(") {
        const closeIndex = findMatchingParen(source, j);
        if (closeIndex >= 0) {
          // MemberExpression property (fs.readFileSync) still counts — Eva does too.
          void prev;
          calls.push({
            callee: ident.name,
            openIndex: j,
            closeIndex,
          });
          i = closeIndex + 1;
          continue;
        }
      }
    }

    i++;
  }

  return calls;
}

/**
 * @param {string} source
 * @param {number} start
 * @returns {{ name: string, end: number } | null}
 */
function matchIdent(source, start) {
  const ch = source[start];
  if (!ch || !/[A-Za-z_$]/.test(ch)) return null;
  if (start > 0 && /[\w$]/.test(source[start - 1] ?? "")) return null;
  let end = start + 1;
  while (end < source.length && /[\w$]/.test(source[end] ?? "")) end++;
  return { name: source.slice(start, end), end };
}

/**
 * @param {string} source
 * @param {number} openIndex index of "("
 */
function findMatchingParen(source, openIndex) {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let inLineComment = false;
  let inBlockComment = false;
  for (let i = openIndex; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
    if (inLineComment) {
      if (ch === "\n") inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        i++;
      }
      continue;
    }
    if (inSingle) {
      if (ch === "\\") {
        i++;
        continue;
      }
      if (ch === "'") inSingle = false;
      continue;
    }
    if (inDouble) {
      if (ch === "\\") {
        i++;
        continue;
      }
      if (ch === '"') inDouble = false;
      continue;
    }
    if (inTemplate) {
      if (ch === "\\") {
        i++;
        continue;
      }
      if (ch === "`") inTemplate = false;
      continue;
    }
    if (ch === "/" && next === "/") {
      inLineComment = true;
      i++;
      continue;
    }
    if (ch === "/" && next === "*") {
      inBlockComment = true;
      i++;
      continue;
    }
    if (ch === "'") {
      inSingle = true;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      continue;
    }
    if (ch === "`") {
      inTemplate = true;
      continue;
    }
    if (ch === "(") depth++;
    else if (ch === ")") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/**
 * Recursively collect test files under `root`.
 * @param {string} root
 * @returns {string[]}
 */
export function listTestFiles(root) {
  const skip = new Set([
    "node_modules",
    ".git",
    "dist",
    "build",
    ".vercel",
    "coverage",
  ]);
  /** @type {string[]} */
  const out = [];
  /** @param {string} dir */
  function walk(dir) {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const name of entries) {
      if (skip.has(name)) continue;
      const full = join(dir, name);
      let st;
      try {
        st = statSync(full);
      } catch {
        continue;
      }
      if (st.isDirectory()) walk(full);
      else if (TEST_FILE.test(name)) out.push(full);
    }
  }
  walk(root);
  return out;
}

/**
 * Scan a repo root for banned source-text tests.
 * @param {string} root
 * @returns {{ file: string, message: string, snippet: string }[]}
 */
export function scanRepo(root) {
  /** @type {{ file: string, message: string, snippet: string }[]} */
  const all = [];
  for (const file of listTestFiles(root)) {
    const source = readFileSync(file, "utf8");
    for (const v of checkTestSource(file, source)) {
      all.push({
        file: relative(root, file),
        message: v.message,
        snippet: v.snippet,
      });
    }
  }
  return all;
}

function runCli() {
  const root = process.cwd();
  const violations = scanRepo(root);
  if (violations.length === 0) {
    console.log("no-source-text-in-tests: ok");
    return;
  }
  for (const v of violations) {
    console.error(`${v.file}: ${v.message}`);
    console.error(`  ${v.snippet}`);
  }
  console.error(
    `\n${violations.length} source-text test violation(s). Import and call real code instead.`,
  );
  process.exitCode = 1;
}

if (
  process.argv[1] &&
  fileURLToPath(import.meta.url) === resolve(process.argv[1])
) {
  runCli();
}
