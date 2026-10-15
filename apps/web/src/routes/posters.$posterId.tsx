import { createFileRoute } from "@tanstack/react-router";
import { NotFoundState } from "@/catalog/NotFoundState";
import { getPoster } from "@/posters/registry";

export const Route = createFileRoute("/posters/$posterId")({
  component: PosterPage,
});

function PosterPage() {
  const { posterId } = Route.useParams();
  const poster = getPoster(posterId);

  if (!poster) {
    return <NotFoundState noun="poster" id={posterId} backTo="/posters" />;
  }

  return (
    <section className="page">
      <poster.Component />
    </section>
  );
}
