import { createFileRoute } from "@tanstack/react-router";
import { NotFoundState } from "@/catalog/NotFoundState";
import { getReport } from "@/reports/registry";

export const Route = createFileRoute("/reports/$reportId")({
  component: ReportPage,
});

function ReportPage() {
  const { reportId } = Route.useParams();
  const report = getReport(reportId);

  if (!report) {
    return <NotFoundState noun="report" id={reportId} backTo="/reports" />;
  }

  return (
    <section className="page">
      <report.Component />
    </section>
  );
}
