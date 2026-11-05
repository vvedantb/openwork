import { Bullets, ContentSlide, b, gap, sub } from "../components/slideKit";

export function Slide15BenefitsAtomic() {
  return (
    <ContentSlide title="Benefits of NH implementation vs DC">
      <Bullets
        lines={[
          b("Atomic updates"),
          sub("NH ensures all related state updates happen together"),
          gap,
          b("NH prevents invalid states by design"),
          sub("All required fields are updated together"),
          gap,
          b("State changes"),
          sub("Ensures calculations complete before new state changes"),
        ]}
      />
    </ContentSlide>
  );
}
