import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide17Summary() {
  return (
    <ContentSlide title="Summary">
      <Bullets
        lines={[
          b(
            "In code, state machines are used to reduce complexity and make future management and maintenance easier (when new features are to be added)",
          ),
          b(
            "For end users, state machines are used to prevent race conditions and ensure valid state transitions only",
          ),
          b(
            "State machines can get complex, but this depends on the use case. For complex cases, draw the diagram before you implement",
          ),
        ]}
      />
    </ContentSlide>
  );
}
