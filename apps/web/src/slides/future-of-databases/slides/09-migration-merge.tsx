import { Bullets, ContentSlide, Figure, b, gap } from "../components/slideKit";

export function Slide09MigrationMerge() {
  return (
    <ContentSlide
      title="Benefit 4 – Handle migration conflicts"
      tag="KRZYS’ PERSPECTIVE"
    >
      <div className="flex min-h-0 flex-1 gap-10">
        <div className="flex-1">
          <Bullets
            lines={[
              b("Merge changes to make one big change"),
              gap,
              b("Convex cuts this process in half"),
              gap,
              b("No conflict during review stage, only for production"),
              gap,
              b("Much simpler to handle and manage"),
            ]}
          />
        </div>
        <Figure
          src="/media/slides/future-of-databases/slide09-1.webp"
          alt="Flowchart: review each developer's database changes, merge them into one big change, then apply it through staging and production"
          caption="BEFORE"
          className="w-[520px]"
        />
      </div>
    </ContentSlide>
  );
}
