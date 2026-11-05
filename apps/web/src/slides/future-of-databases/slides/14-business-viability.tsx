import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide14BusinessViability() {
  return (
    <ContentSlide title="Con 1 – Business viability (it’s relatively new)">
      <Bullets
        size="sm"
        lines={[
          b("Longer term concerns as a business, it’s only 4 years old"),
          b(
            "However, it is open source, so even if the business shuts down in the future, we can self host",
          ),
          b(
            "But this would mean no new features from Convex, so eventually we would need to migrate away",
          ),
          b("Migration from Convex would take a long time"),
          b(
            "Convex has been growing rapidly so not expecting this to be an issue",
          ),
          b("Potential vendor lock in"),
          b(
            "Not unique to Convex, if we need to migrate away you need to pay the price",
          ),
        ]}
      />
    </ContentSlide>
  );
}
