import { Bullets, ContentSlide, Figure, b, sub } from "../components/slideKit";

export function Slide08MigrationConflicts() {
  return (
    <ContentSlide
      title="Benefit 4 – Handle migration conflicts"
      tag="KRZYS’ PERSPECTIVE"
    >
      <div className="flex min-h-0 flex-1 gap-10">
        <div className="flex-1">
          <Bullets
            size="sm"
            lines={[
              b(
                "Problem: 2 devs have changes ready for review. Both need a migration done for staging",
              ),
              b("Order of operations"),
              sub("Who needs their changes reviewed first?"),
              sub("Which launch has higher importance?"),
              sub(
                "What impact will these changes have on other preview environments and staging?",
              ),
            ]}
          />
        </div>
        <Figure
          src="/media/slides/future-of-databases/slide08-1.webp"
          alt="Flowchart: review each developer's database changes, set a priority queue, then apply, review and merge one developer at a time through staging and production"
          caption="BEFORE"
          className="w-[520px]"
        />
      </div>
    </ContentSlide>
  );
}
