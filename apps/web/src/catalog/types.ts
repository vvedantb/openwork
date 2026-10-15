import type { ComponentType } from "react";

/** Fields every catalogued work (slides, reports, posters) shares. */
export interface WorkSummary {
  id: string;
  title: string;
  description: string;
}

/** A single-page work (report or poster) rendered by one component. */
export interface PageWorkManifest extends WorkSummary {
  Component: ComponentType;
}
