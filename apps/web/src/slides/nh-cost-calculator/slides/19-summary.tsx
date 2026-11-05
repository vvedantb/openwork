import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide19Summary() {
  return (
    <ContentSlide title="Summary">
      <Bullets
        lines={[
          b(
            "In code, SM’s are used to reduce complexity and make future management and maintenance easier (when new features are to be added)",
          ),
          b(
            "For end users, SM’s are used to prevent race conditions and ensure valid state transitions only",
          ),
          b(
            "State machines can get quite complex, but this depends on the use case. Diagrams would need to be used in those cases before implementation",
          ),
        ]}
      />
    </ContentSlide>
  );
}
