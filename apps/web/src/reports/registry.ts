import type { PageWorkManifest } from "@/catalog/types";

export const REPORTS: Record<string, PageWorkManifest> = {};

export const REPORT_LIST = Object.values(REPORTS);

export function getReport(reportId: string): PageWorkManifest | undefined {
  return REPORTS[reportId];
}

export function reportPath(reportId: string): string {
  return `/reports/${reportId}`;
}
