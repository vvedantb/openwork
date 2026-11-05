import { Bullets, ContentSlide, Figure, b } from "../components/slideKit";

export function Slide04LiveUpdatesEffort() {
  return (
    <ContentSlide title="Benefit 1 – Live updates" tag="USERS PERSPECTIVE">
      <div className="flex min-h-0 flex-1 gap-12">
        <div className="flex-1">
          <Bullets
            lines={[
              b(
                "Fixing data inconsistency would need to be handled manually without Convex",
              ),
              b(
                "Convex reduces developer effort by keeping things “live” – data can never be inconsistent (outdated)",
              ),
              b("E.g. dashboard stats on direct award"),
            ]}
          />
        </div>
        <Figure
          src="/media/slides/future-of-databases/slide04-1.webp"
          alt="Hand-drawn graph: data inconsistency falls as developer effort rises"
          caption="BEFORE"
          className="w-[420px]"
        />
      </div>
    </ContentSlide>
  );
}
