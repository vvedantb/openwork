import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/catalog/CatalogPage";
import { REPORT_LIST, reportPath } from "@/reports/registry";

export const Route = createFileRoute("/reports/")({
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <CatalogPage
      noun="reports"
      lede="Registered reports in this deployment."
      items={REPORT_LIST.map((report) => ({
        ...report,
        href: reportPath(report.id),
      }))}
    />
  );
}
