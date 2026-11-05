import { BeforeAfter } from "../components/BeforeAfter";
import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide06PreviewDatabases() {
  return (
    <ContentSlide
      title="Benefit 2 – Preview databases"
      tag="BUSINESS TEAM’S PERSPECTIVE"
    >
      <Bullets lines={[b("Changes are isolated, no impact on staging")]} />
      <div className="mt-6 flex min-h-0 flex-1">
        <BeforeAfter
          before={{
            src: "/media/slides/future-of-databases/slide06-1.webp",
            alt: "Diagram: four developers' preview links all point at one staging database, which feeds the production database",
          }}
          after={{
            src: "/media/slides/future-of-databases/slide06-2.webp",
            alt: "Diagram: each developer's preview link has its own preview database, which then feeds staging and production",
          }}
        />
      </div>
    </ContentSlide>
  );
}
