import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ChangelogCompositionProps } from "../src/remotion/changelog/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function loadChangelogProps(
  propsPath?: string,
): ChangelogCompositionProps {
  const resolved =
    propsPath ??
    path.resolve(__dirname, "../src/remotion/changelog/vmem-7d.json");

  return JSON.parse(
    readFileSync(resolved, "utf8"),
  ) as ChangelogCompositionProps;
}
