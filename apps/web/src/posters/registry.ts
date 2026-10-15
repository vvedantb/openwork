import type { PageWorkManifest } from "@/catalog/types";

export const POSTERS: Record<string, PageWorkManifest> = {};

export const POSTER_LIST = Object.values(POSTERS);

export function getPoster(posterId: string): PageWorkManifest | undefined {
  return POSTERS[posterId];
}

export function posterPath(posterId: string): string {
  return `/posters/${posterId}`;
}
