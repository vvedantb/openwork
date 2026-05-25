import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { renderDeckToFile } from "./render-deck-lib";
import type { RenderDeckInput } from "./deck-props";

function readArg(name: string): string | undefined {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

async function main() {
  const propsPath = readArg("props");
  const outputPath = readArg("output") ?? path.resolve("out/deck.mp4");

  if (!propsPath) {
    console.error(
      "Usage: tsx scripts/render-deck.ts --props=./deck-props.json [--output=./out/deck.mp4]",
    );
    process.exit(1);
  }

  const inputProps = JSON.parse(
    readFileSync(path.resolve(propsPath), "utf8"),
  ) as RenderDeckInput;

  mkdirSync(path.dirname(outputPath), { recursive: true });
  await renderDeckToFile(inputProps, path.resolve(outputPath));
  console.log(`Rendered ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
