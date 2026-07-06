import { mkdirSync } from "node:fs";
import path from "node:path";
import { loadChangelogProps } from "./changelog-props";
import { renderChangelogToFile } from "./render-changelog-lib";

function readArg(name: string): string | undefined {
  const prefix = `--${name}=`;
  return process.argv
    .find((arg) => arg.startsWith(prefix))
    ?.slice(prefix.length);
}

async function main() {
  const propsPath = readArg("props");
  const outputPath =
    readArg("output") ?? path.resolve("out/vmem-changelog-7d.mp4");

  const inputProps = loadChangelogProps(propsPath);
  mkdirSync(path.dirname(outputPath), { recursive: true });
  await renderChangelogToFile(inputProps, path.resolve(outputPath));
  console.log(`Rendered ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
