import path from "node:path";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import type { ChangelogCompositionProps } from "../src/remotion/changelog/types";
import { changelogDurationInFrames } from "../src/remotion/changelog/constants";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entryPoint = path.resolve(__dirname, "../src/remotion/index.ts");

let cachedBundleLocation: string | null = null;

async function getBundleLocation() {
  if (cachedBundleLocation) {
    return cachedBundleLocation;
  }

  cachedBundleLocation = await bundle({
    entryPoint,
    webpackOverride: (config) => {
      config.resolve = config.resolve ?? {};
      config.resolve.alias = {
        ...(config.resolve.alias as Record<string, string>),
        "@": path.resolve(__dirname, "../src"),
      };
      return config;
    },
  });

  return cachedBundleLocation;
}

export async function renderChangelogToFile(
  inputProps: ChangelogCompositionProps,
  outputLocation: string,
) {
  const serveUrl = await getBundleLocation();
  const composition = await selectComposition({
    serveUrl,
    id: "VmemChangelog",
    inputProps,
  });

  await renderMedia({
    composition,
    serveUrl,
    codec: "h264",
    outputLocation,
    inputProps,
  });

  return outputLocation;
}

export function getChangelogDuration(inputProps: ChangelogCompositionProps) {
  return changelogDurationInFrames(inputProps.slides.length);
}
