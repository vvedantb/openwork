import { ConvexError } from "convex/values";
import type { Value } from "convex/values";

function convexPayloadMessage(data: Value): string | undefined {
  if (typeof data === "string") {
    let value = data.trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      try {
        const parsed: Value = JSON.parse(value);
        if (typeof parsed === "string") value = parsed.trim();
      } catch {
        // keep the raw string
      }
    }
    return value.length > 0 ? value : undefined;
  }
  if (
    typeof data === "object" &&
    data !== null &&
    !Array.isArray(data) &&
    "message" in data &&
    typeof data.message === "string"
  ) {
    const message = data.message.trim();
    return message.length > 0 ? message : undefined;
  }
  return undefined;
}

function extractedUncaughtMessage(message: string): string | undefined {
  const match = message.match(/Uncaught Error:\s*([^\n]+)/);
  const extracted = match?.[1]?.trim();
  return extracted !== undefined && extracted.length > 0
    ? extracted
    : undefined;
}

/**
 * Convex production hides `throw new Error(...)` behind a request-id wrapper.
 * Prefer `ConvexError` data, then an uncaught-error suffix, then `fallback`.
 */
export function convexErrorMessage(err: Error, fallback: string): string {
  if (err instanceof ConvexError) {
    const fromData = convexPayloadMessage(err.data);
    if (fromData !== undefined) return fromData;
  }
  const uncaught = extractedUncaughtMessage(err.message);
  if (uncaught !== undefined) return uncaught;
  if (!err.message.startsWith("[CONVEX ")) {
    const message = err.message.trim();
    if (message.length > 0) return message;
  }
  return fallback;
}
