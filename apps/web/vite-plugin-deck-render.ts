import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import type { RenderDeckInput } from "./scripts/deck-props";

async function readJsonBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
}

export function deckRenderPlugin(): Plugin {
  return {
    name: "folio-deck-render",
    configureServer(server) {
      server.middlewares.use("/api/render-deck", (req, res, next) => {
        if (req.method !== "POST") {
          next();
          return;
        }

        void handleRenderRequest(req, res);
      });
    },
  };
}

async function handleRenderRequest(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const tempDir = mkdtempSync(join(tmpdir(), "folio-render-"));
  const outputLocation = join(tempDir, "deck.mp4");

  try {
    const body = await readJsonBody(req);
    const inputProps = JSON.parse(body) as RenderDeckInput;

    if (!inputProps.slides?.length) {
      res.statusCode = 400;
      res.end("Deck has no slides to render.");
      return;
    }

    const { renderDeckToFile } = await import("./scripts/render-deck-lib");
    await renderDeckToFile(inputProps, outputLocation);

    const video = readFileSync(outputLocation);
    res.statusCode = 200;
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", 'attachment; filename="deck.mp4"');
    res.end(video);
  } catch (error) {
    res.statusCode = 500;
    res.end(error instanceof Error ? error.message : String(error));
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}
