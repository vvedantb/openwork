import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/catalog/CatalogPage";
import { POSTER_LIST, posterPath } from "@/posters/registry";

export const Route = createFileRoute("/posters/")({
  component: PostersPage,
});

function PostersPage() {
  return (
    <CatalogPage
      noun="posters"
      lede="Registered posters in this deployment."
      items={POSTER_LIST.map((poster) => ({
        ...poster,
        href: posterPath(poster.id),
      }))}
    />
  );
}
